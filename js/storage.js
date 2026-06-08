/**
 * 智能数据存储层 — API 优先 + LocalStorage 降级
 *
 * 策略:
 *   1. 优先调用后端 API (MySQL)
 *   2. API 不可用时静默降级到 LocalStorage
 *   3. 手机端 (GitHub Pages) 无后端，自动使用 LocalStorage
 *
 * Keys (LocalStorage 降级时使用):
 *   bmr_user_profile
 *   bmr_daily_log_YYYY-MM-DD
 *   bmr_custom_foods
 */

const Storage = (() => {
  const KEYS = {
    PROFILE: 'bmr_user_profile',
    CUSTOM_FOODS: 'bmr_custom_foods',
    dailyLog: (date) => `bmr_daily_log_${date}`,
  };

  // ========== LocalStorage 基础操作 (仅供降级使用) ==========
  function _save(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }

  function _load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  // ========== Profile ==========
  async function saveProfile(profile) {
    try {
      await ApiClient.saveProfile(profile);
      return;
    } catch (e) {
      // API 不可用 → LocalStorage 降级
      _save(KEYS.PROFILE, profile);
    }
  }

  async function loadProfile() {
    try {
      const data = await ApiClient.getProfile();
      if (data) {
        return {
          gender: data.gender,
          age: data.age,
          height: data.height,
          weight: data.weight,
          activityLevel: data.activity_level,
          deficit: data.deficit,
        };
      }
      return _load(KEYS.PROFILE, null);
    } catch (e) {
      return _load(KEYS.PROFILE, null);
    }
  }

  // ========== Daily Log ==========
  async function saveDailyLog(date, log) {
    // 每日记录是逐条增删的，不需要整体保存
    // 添加/删除通过 MealLog.addFood / removeFood 逐条调 API
    // 降级时使用 LocalStorage 整体保存
    _save(KEYS.dailyLog(date), log);
  }

  async function loadDailyLog(date) {
    try {
      const data = await ApiClient.getMeals(date);
      if (data && data.meals) {
        return data; // { meals: { breakfast:[], lunch:[], dinner:[], snack:[] } }
      }
    } catch (e) {
      // 降级
    }
    return _load(KEYS.dailyLog(date), { meals: { breakfast: [], lunch: [], dinner: [], snack: [] } });
  }

  // ========== Custom Foods ==========
  async function loadCustomFoods() {
    try {
      const foods = await ApiClient.getCustomFoods();
      return foods || [];
    } catch (e) {
      return _load(KEYS.CUSTOM_FOODS, []);
    }
  }

  async function addCustomFood(food) {
    try {
      const result = await ApiClient.addCustomFood(food);
      return result.food;
    } catch (e) {
      const foods = _load(KEYS.CUSTOM_FOODS, []);
      const newFood = { ...food, id: Date.now().toString(36) };
      foods.push(newFood);
      _save(KEYS.CUSTOM_FOODS, foods);
      return newFood;
    }
  }

  async function removeCustomFood(id) {
    try {
      await ApiClient.deleteCustomFood(id);
      return;
    } catch (e) {
      const foods = _load(KEYS.CUSTOM_FOODS, []).filter(f => f.id !== id);
      _save(KEYS.CUSTOM_FOODS, foods);
    }
  }

  // ========== 同步兼容方法 (LocalStorage 降级路径使用) ==========
  // 保留同步版本供 app.js 初始化时无需 await
  function loadProfileSync() {
    return _load(KEYS.PROFILE, null);
  }

  return {
    KEYS,
    saveProfile,
    loadProfile,
    loadProfileSync,
    saveDailyLog,
    loadDailyLog,
    loadCustomFoods,
    addCustomFood,
    removeCustomFood,
  };
})();
