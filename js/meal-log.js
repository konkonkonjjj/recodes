/**
 * 每日饮食记录管理
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
   * 获取指定日期的空日志模板
   */
  function emptyLog() {
    return {
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      },
    };
  }

  /**
   * 获取今天的日期字符串 YYYY-MM-DD
   */
  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  /**
   * 加载指定日期的饮食记录
   */
  function load(date) {
    const log = Storage.loadDailyLog(date);
    // 确保结构完整
    if (!log.meals) log.meals = { breakfast: [], lunch: [], dinner: [], snack: [] };
    for (const meal of MEAL_TYPES) {
      if (!log.meals[meal]) log.meals[meal] = [];
    }
    return log;
  }

  /**
   * 保存指定日期的饮食记录
   */
  function save(date, log) {
    Storage.saveDailyLog(date, log);
  }

  /**
   * 添加食物到指定餐次
   * @param {string} date - YYYY-MM-DD
   * @param {string} mealType - breakfast/lunch/dinner/snack
   * @param {object} food - 食物对象
   * @param {number} grams - 食用克数
   */
  function addFood(date, mealType, food, grams) {
    const log = load(date);
    const nutrition = Calculator.calcFoodNutrition(food, grams);
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      foodName: food.name,
      foodCategory: food.category,
      grams,
      nutrition,
      addedAt: new Date().toISOString(),
    };
    log.meals[mealType].push(entry);
    save(date, log);
    return entry;
  }

  /**
   * 删除指定餐次中的某条记录
   * @param {string} date
   * @param {string} mealType
   * @param {string} entryId
   */
  function removeFood(date, mealType, entryId) {
    const log = load(date);
    log.meals[mealType] = log.meals[mealType].filter(e => e.id !== entryId);
    save(date, log);
  }

  /**
   * 计算指定日期已摄入的总营养
   * @returns {{ calories: number, protein: number, carbs: number, fat: number }}
   */
  function calcConsumed(date) {
    const log = load(date);
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    for (const meal of MEAL_TYPES) {
      for (const entry of log.meals[meal]) {
        totals.calories += entry.nutrition.calories;
        totals.protein += entry.nutrition.protein;
        totals.carbs += entry.nutrition.carbs;
        totals.fat += entry.nutrition.fat;
      }
    }
    // 四舍五入
    totals.calories = Math.round(totals.calories);
    totals.protein = +totals.protein.toFixed(1);
    totals.carbs = +totals.carbs.toFixed(1);
    totals.fat = +totals.fat.toFixed(1);
    return totals;
  }

  /**
   * 计算指定餐次的营养合计
   */
  function calcMealTotal(date, mealType) {
    const log = load(date);
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
    calcMealTotal,
  };
})();
