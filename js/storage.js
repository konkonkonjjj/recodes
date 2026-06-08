/**
 * LocalStorage 读写封装
 * Keys:
 *   bmr_user_profile     — 用户身体数据
 *   bmr_daily_log_YYYY-MM-DD — 每日饮食记录
 *   bmr_custom_foods     — 自定义食物列表
 */

const Storage = (() => {
  const KEYS = {
    PROFILE: 'bmr_user_profile',
    CUSTOM_FOODS: 'bmr_custom_foods',
    dailyLog: (date) => `bmr_daily_log_${date}`,
  };

  function save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  }

  function load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.error('Storage load error:', e);
      return fallback;
    }
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  // ---- Profile ----
  function saveProfile(profile) {
    save(KEYS.PROFILE, profile);
  }

  function loadProfile() {
    return load(KEYS.PROFILE, null);
  }

  // ---- Daily Log ----
  function saveDailyLog(date, log) {
    save(KEYS.dailyLog(date), log);
  }

  function loadDailyLog(date) {
    return load(KEYS.dailyLog(date), { meals: { breakfast: [], lunch: [], dinner: [], snack: [] } });
  }

  // ---- Custom Foods ----
  function saveCustomFoods(foods) {
    save(KEYS.CUSTOM_FOODS, foods);
  }

  function loadCustomFoods() {
    return load(KEYS.CUSTOM_FOODS, []);
  }

  function addCustomFood(food) {
    const foods = loadCustomFoods();
    foods.push({ ...food, id: Date.now().toString(36) });
    saveCustomFoods(foods);
    return foods;
  }

  function removeCustomFood(id) {
    const foods = loadCustomFoods().filter(f => f.id !== id);
    saveCustomFoods(foods);
    return foods;
  }

  return {
    KEYS,
    saveProfile,
    loadProfile,
    saveDailyLog,
    loadDailyLog,
    saveCustomFoods,
    loadCustomFoods,
    addCustomFood,
    removeCustomFood,
  };
})();
