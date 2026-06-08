/**
 * 每日饮食记录管理 — API 优先 + LocalStorage 降级
 */

const MealLog = (() => {

  const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];
  const MEAL_LABELS = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '加餐',
  };

  const MEAL_ICONS = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🍪',
  };

  /**
   * 获取今天的日期字符串 YYYY-MM-DD
   */
  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  /**
   * 加载指定日期的饮食记录（异步，API 优先）
   */
  async function load(date) {
    const log = await Storage.loadDailyLog(date);
    if (!log.meals) log.meals = { breakfast: [], lunch: [], dinner: [], snack: [] };
    for (const meal of MEAL_TYPES) {
      if (!log.meals[meal]) log.meals[meal] = [];
    }
    return log;
  }

  /**
   * 保存指定日期的饮食记录（仅用于 LocalStorage 降级路径）
   */
  async function save(date, log) {
    await Storage.saveDailyLog(date, log);
  }

  /**
   * 添加食物到指定餐次
   */
  async function addFood(date, mealType, food, grams) {
    const nutrition = Calculator.calcFoodNutrition(food, grams);

    // 1. 尝试通过 API 添加
    try {
      const result = await ApiClient.addMeal(date, mealType, food.name, food.category, grams, nutrition);
      return result.entry;
    } catch (e) {
      // 2. API 不可用 → LocalStorage 降级
      const log = await load(date);
      const entry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        foodName: food.name,
        foodCategory: food.category,
        grams,
        nutrition,
        addedAt: new Date().toISOString(),
      };
      log.meals[mealType].push(entry);
      await save(date, log);
      return entry;
    }
  }

  /**
   * 删除指定餐次中的某条记录
   */
  async function removeFood(date, mealType, entryId) {
    // 1. 尝试通过 API 删除
    try {
      await ApiClient.deleteMeal(date, mealType, entryId);
      return;
    } catch (e) {
      // 2. API 不可用 → LocalStorage 降级
      const log = await load(date);
      log.meals[mealType] = log.meals[mealType].filter(e => e.id !== entryId);
      await save(date, log);
    }
  }

  /**
   * 计算指定日期已摄入的总营养（同步，操作内存数据）
   */
  function calcConsumedFromLog(log) {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    for (const meal of MEAL_TYPES) {
      for (const entry of log.meals[meal]) {
        totals.calories += entry.nutrition.calories;
        totals.protein += entry.nutrition.protein;
        totals.carbs += entry.nutrition.carbs;
        totals.fat += entry.nutrition.fat;
      }
    }
    totals.calories = Math.round(totals.calories);
    totals.protein = +totals.protein.toFixed(1);
    totals.carbs = +totals.carbs.toFixed(1);
    totals.fat = +totals.fat.toFixed(1);
    return totals;
  }

  /**
   * 计算指定日期已摄入的总营养（异步，从存储加载）
   */
  async function calcConsumed(date) {
    const log = await load(date);
    return calcConsumedFromLog(log);
  }

  /**
   * 计算指定餐次的营养合计
   */
  function calcMealTotalFromLog(log, mealType) {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    for (const entry of log.meals[mealType]) {
      totals.calories += entry.nutrition.calories;
      totals.protein += entry.nutrition.protein;
      totals.carbs += entry.nutrition.carbs;
      totals.fat += entry.nutrition.fat;
    }
    totals.calories = Math.round(totals.calories);
    totals.protein = +totals.protein.toFixed(1);
    totals.carbs = +totals.carbs.toFixed(1);
    totals.fat = +totals.fat.toFixed(1);
    return totals;
  }

  /**
   * 计算指定餐次的营养合计（异步）
   */
  async function calcMealTotal(date, mealType) {
    const log = await load(date);
    return calcMealTotalFromLog(log, mealType);
  }

  return {
    MEAL_TYPES,
    MEAL_LABELS,
    MEAL_ICONS,
    today,
    load,
    save,
    addFood,
    removeFood,
    calcConsumed,
    calcConsumedFromLog,
    calcMealTotal,
    calcMealTotalFromLog,
  };
})();
