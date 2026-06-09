/**
 * API 客户端 — 封装所有后端请求
 * 当后端不可用时抛出异常，由 storage.js 降级到 LocalStorage
 */
const ApiClient = (() => {
  const BASE_URL = 'http://localhost:3001';

  async function request(method, path, body = null) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3秒超时

    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }

    let res;
    try {
      res = await fetch(BASE_URL + path, opts);
    } finally {
      clearTimeout(timeout);
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return res.json();
  }

  // ---- Profile ----
  function getProfile() {
    return request('GET', '/api/profile');
  }

  function saveProfile(profile) {
    return request('POST', '/api/profile', {
      gender: profile.gender,
      age: profile.age,
      height: profile.height,
      weight: profile.weight,
      activityLevel: profile.activityLevel,
      deficit: profile.deficit,
    });
  }

  // ---- Meals ----
  function getMeals(date) {
    return request('GET', `/api/meals/${date}`);
  }

  function addMeal(date, mealType, foodName, foodCategory, grams, nutrition) {
    return request('POST', `/api/meals/${date}`, {
      mealType,
      foodName,
      foodCategory,
      grams,
      nutrition,
    });
  }

  function deleteMeal(date, mealType, id) {
    return request('DELETE', `/api/meals/${date}/${mealType}/${id}`);
  }

  // ---- Custom Foods ----
  function getCustomFoods() {
    return request('GET', '/api/foods/custom');
  }

  function addCustomFood(food) {
    return request('POST', '/api/foods/custom', {
      name: food.name,
      category: food.category,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    });
  }

  function deleteCustomFood(id) {
    return request('DELETE', `/api/foods/custom/${id}`);
  }

  return {
    getProfile,
    saveProfile,
    getMeals,
    addMeal,
    deleteMeal,
    getCustomFoods,
    addCustomFood,
    deleteCustomFood,
  };
})();
