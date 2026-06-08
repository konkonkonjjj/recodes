/**
 * 减脂营养计算引擎
 * BMR (Mifflin-St Jeor) → TDEE → 减脂目标 → 宏量分配
 */

const Calculator = (() => {

  // 活动系数映射
  const ACTIVITY_FACTORS = {
    sedentary: 1.2,       // 久坐
    light: 1.375,          // 轻度活动 (1-3天/周)
    moderate: 1.55,        // 中度活动 (3-5天/周)
    active: 1.725,         // 高度活动 (6-7天/周)
  };

  const ACTIVITY_LABELS = {
    sedentary: '久坐 (几乎不运动)',
    light: '轻度活动 (1-3天/周)',
    moderate: '中度活动 (3-5天/周)',
    active: '高度活动 (6-7天/周)',
  };

  // 宏量营养素热量密度 (kcal/g)
  const CAL_PER_GRAM = {
    protein: 4,
    carbs: 4,
    fat: 9,
  };

  /**
   * 计算 BMR (Mifflin-St Jeor 公式)
   * @param {string} gender - 'male' | 'female'
   * @param {number} weight - 体重 (kg)
   * @param {number} height - 身高 (cm)
   * @param {number} age - 年龄
   * @returns {number} BMR (kcal/day)
   */
  function calcBMR(gender, weight, height, age) {
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += (gender === 'male') ? 5 : -161;
    return Math.round(bmr);
  }

  /**
   * 计算 TDEE
   * @param {number} bmr
   * @param {string} activityLevel
   * @returns {number} TDEE (kcal/day)
   */
  function calcTDEE(bmr, activityLevel) {
    const factor = ACTIVITY_FACTORS[activityLevel] || 1.2;
    return Math.round(bmr * factor);
  }

  /**
   * 计算减脂目标热量（TDEE - 缺口，含下限保护）
   * @param {number} tdee
   * @param {number} deficit - 热量缺口 (kcal)
   * @param {string} gender
   * @returns {number} 目标热量 (kcal/day)
   */
  function calcTarget(tdee, deficit, gender) {
    const target = tdee - deficit;
    const floor = (gender === 'male') ? 1500 : 1200;
    return Math.max(target, floor);
  }

  /**
   * 计算宏量营养素分配
   * 蛋白质 30% / 碳水 45% / 脂肪 25%
   * @param {number} targetCalories - 目标热量
   * @returns {{ protein: number, carbs: number, fat: number }} 各营养素克数
   */
  function calcMacros(targetCalories) {
    const proteinCals = targetCalories * 0.30;
    const carbsCals = targetCalories * 0.45;
    const fatCals = targetCalories * 0.25;

    return {
      protein: Math.round(proteinCals / CAL_PER_GRAM.protein),
      carbs: Math.round(carbsCals / CAL_PER_GRAM.carbs),
      fat: Math.round(fatCals / CAL_PER_GRAM.fat),
    };
  }

  /**
   * 全量计算：BMR + TDEE + 目标 + 宏量
   * @returns {object} 完整计算结果
   */
  function calcAll(profile) {
    const { gender, weight, height, age, activityLevel, deficit } = profile;
    const bmr = calcBMR(gender, weight, height, age);
    const tdee = calcTDEE(bmr, activityLevel);
    const targetCalories = calcTarget(tdee, deficit, gender);
    const macros = calcMacros(targetCalories);

    return {
      bmr,
      tdee,
      deficit,
      targetCalories,
      macros,
    };
  }

  /**
   * 计算食物实际摄入营养（按克数换算）
   * @param {object} food - 食物对象 (per100g 数据)
   * @param {number} grams - 食用克数
   */
  function calcFoodNutrition(food, grams) {
    const ratio = grams / 100;
    return {
      calories: Math.round(food.calories * ratio),
      protein: +(food.protein * ratio).toFixed(1),
      carbs: +(food.carbs * ratio).toFixed(1),
      fat: +(food.fat * ratio).toFixed(1),
    };
  }

  /**
   * 计算当日剩余
   * @param {number} target - 目标热量
   * @param {object} targetMacros - 目标宏量 {protein, carbs, fat}
   * @param {object} consumed - 已摄入 {calories, protein, carbs, fat}
   */
  function calcRemaining(target, targetMacros, consumed) {
    return {
      calories: target - consumed.calories,
      protein: Math.max(0, +(targetMacros.protein - consumed.protein).toFixed(1)),
      carbs: Math.max(0, +(targetMacros.carbs - consumed.carbs).toFixed(1)),
      fat: Math.max(0, +(targetMacros.fat - consumed.fat).toFixed(1)),
    };
  }

  /**
   * 根据目标热量推荐每日饮食计划
   */
  function generateMealPlan(targetCalories, macros) {
    // 三餐 + 加餐分配比例
    const distribution = {
      breakfast: 0.30,
      lunch: 0.35,
      dinner: 0.25,
      snack: 0.10,
    };

    const plan = {};
    for (const [meal, ratio] of Object.entries(distribution)) {
      const mealCal = Math.round(targetCalories * ratio);
      plan[meal] = {
        calories: mealCal,
        protein: Math.round(macros.protein * ratio),
        carbs: Math.round(macros.carbs * ratio),
        fat: Math.round(macros.fat * ratio),
      };
    }
    return plan;
  }

  return {
    ACTIVITY_FACTORS,
    ACTIVITY_LABELS,
    CAL_PER_GRAM,
    calcBMR,
    calcTDEE,
    calcTarget,
    calcMacros,
    calcAll,
    calcFoodNutrition,
    calcRemaining,
    generateMealPlan,
  };
})();
