/**
 * 减脂营养计划 — 应用入口
 * Tab 导航、数据联动、UI 渲染
 */

(function () {
  'use strict';

  // ==================== State ====================
  let currentTab = 'profile';
  let currentDate = MealLog.today();
  let selectedFood = null;       // 当前在饮食记录中选中的食物
  let profile = null;            // 用户信息
  let calcResult = null;         // 计算结果

  // ==================== Init ====================
  function init() {
    profile = Storage.loadProfile();
    if (profile) {
      // 回填表单
      document.querySelector('input[name="gender"][value="' + profile.gender + '"]').checked = true;
      document.getElementById('age').value = profile.age;
      document.getElementById('height').value = profile.height;
      document.getElementById('weight').value = profile.weight;
      document.getElementById('activity').value = profile.activityLevel;
      document.getElementById('deficit').value = profile.deficit;
      document.getElementById('deficit-val').textContent = profile.deficit;
      // 重新计算展示
      calcResult = Calculator.calcAll(profile);
      showCalcResults(calcResult);
    }

    // 设置今天日期
    document.getElementById('meal-date').value = currentDate;

    bindEvents();
    switchTab('profile'); // 默认 tab
    if (profile) {
      updateDashboard();
      renderMealLog();
    }
    renderFoodLibrary();
    renderCustomFoodsList();
  }

  // ==================== Events ====================
  function bindEvents() {
    // Tab 切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        switchTab(tab);
      });
    });

    // 热量缺口滑块
    document.getElementById('deficit').addEventListener('input', (e) => {
      document.getElementById('deficit-val').textContent = e.target.value;
    });

    // 用户信息表单提交
    document.getElementById('profile-form').addEventListener('submit', handleProfileSubmit);

    // 日期切换
    document.getElementById('btn-prev-day').addEventListener('click', () => changeDate(-1));
    document.getElementById('btn-next-day').addEventListener('click', () => changeDate(1));
    document.getElementById('btn-today').addEventListener('click', () => {
      currentDate = MealLog.today();
      document.getElementById('meal-date').value = currentDate;
      renderMealLog();
      if (profile) updateDashboard();
    });
    document.getElementById('meal-date').addEventListener('change', (e) => {
      currentDate = e.target.value;
      renderMealLog();
      if (profile) updateDashboard();
    });

    // 食物搜索 (饮食记录)
    document.getElementById('food-search').addEventListener('input', handleFoodSearch);
    document.getElementById('food-search').addEventListener('focus', handleFoodSearch);
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#tab-meals .form-group')) {
        document.getElementById('food-search-results').style.display = 'none';
      }
    });

    // 添加食物按钮
    document.getElementById('btn-add-food').addEventListener('click', handleAddFood);

    // 食物库搜索与筛选
    document.getElementById('food-lib-search').addEventListener('input', renderFoodLibrary);
    document.getElementById('food-category-filter').addEventListener('change', renderFoodLibrary);

    // 自定义食物表单
    document.getElementById('custom-food-form').addEventListener('submit', handleCustomFoodSubmit);
  }

  // ==================== Tab Switching ====================
  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.tab-content').forEach(s => s.classList.toggle('active', s.id === 'tab-' + tab));

    if (tab === 'dashboard' && profile) updateDashboard();
    if (tab === 'meals') renderMealLog();
    if (tab === 'foods') renderFoodLibrary();
  }

  // ==================== Profile ====================
  function handleProfileSubmit(e) {
    e.preventDefault();

    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activityLevel = document.getElementById('activity').value;
    const deficit = parseInt(document.getElementById('deficit').value);

    if (!age || !height || !weight) {
      showToast('请完整填写身体数据', 'error');
      return;
    }

    profile = { gender, age, height, weight, activityLevel, deficit };
    Storage.saveProfile(profile);
    calcResult = Calculator.calcAll(profile);

    showCalcResults(calcResult);
    updateDashboard();
    renderMealLog();
    showToast('✅ 减脂计划已生成！', 'success');

    // 切换到概览页
    setTimeout(() => switchTab('dashboard'), 600);
  }

  function showCalcResults(r) {
    document.getElementById('calc-results').style.display = 'block';
    document.getElementById('res-bmr').textContent = r.bmr;
    document.getElementById('res-tdee').textContent = r.tdee;
    document.getElementById('res-target').textContent = r.targetCalories;
    document.getElementById('res-protein').textContent = r.macros.protein;
    document.getElementById('res-carbs').textContent = r.macros.carbs;
    document.getElementById('res-fat').textContent = r.macros.fat;

    // 餐次分配
    const plan = Calculator.generateMealPlan(r.targetCalories, r.macros);
    const mealIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍪' };
    const mealNames = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snack: '加餐' };
    const grid = document.getElementById('meal-plan-grid');
    grid.innerHTML = Object.entries(plan).map(([key, m]) => `
      <div class="meal-plan-item">
        <div class="mp-icon">${mealIcons[key]}</div>
        <div class="mp-name">${mealNames[key]}</div>
        <div class="mp-cals">${m.calories} kcal</div>
        <div class="mp-detail">
          蛋白 ${m.protein}g · 碳水 ${m.carbs}g · 脂肪 ${m.fat}g
        </div>
      </div>
    `).join('');

    // 滚动到结果区
    document.getElementById('calc-results').scrollIntoView({ behavior: 'smooth' });
  }

  // ==================== Dashboard ====================
  function updateDashboard() {
    if (!profile || !calcResult) {
      document.getElementById('dash-no-profile').style.display = 'block';
      document.getElementById('dash-data').style.display = 'none';
      return;
    }

    document.getElementById('dash-no-profile').style.display = 'none';
    document.getElementById('dash-data').style.display = 'block';

    const consumed = MealLog.calcConsumed(currentDate);
    const remaining = Calculator.calcRemaining(calcResult.targetCalories, calcResult.macros, consumed);

    // Target values
    document.getElementById('dash-cal-target').textContent = calcResult.targetCalories;
    document.getElementById('dash-protein-target').textContent = calcResult.macros.protein;
    document.getElementById('dash-carbs-target').textContent = calcResult.macros.carbs;
    document.getElementById('dash-fat-target').textContent = calcResult.macros.fat;

    // Current values
    document.getElementById('dash-cal-current').textContent = consumed.calories;
    document.getElementById('dash-protein-current').textContent = consumed.protein;
    document.getElementById('dash-carbs-current').textContent = consumed.carbs;
    document.getElementById('dash-fat-current').textContent = consumed.fat;

    // Progress bars
    const calPct = Math.min(100, Math.round((consumed.calories / calcResult.targetCalories) * 100));
    const proteinPct = Math.min(100, Math.round((consumed.protein / calcResult.macros.protein) * 100));
    const carbsPct = Math.min(100, Math.round((consumed.carbs / calcResult.macros.carbs) * 100));
    const fatPct = Math.min(100, Math.round((consumed.fat / calcResult.macros.fat) * 100));

    document.getElementById('dash-cal-bar').style.width = calPct + '%';
    document.getElementById('dash-protein-bar').style.width = proteinPct + '%';
    document.getElementById('dash-carbs-bar').style.width = carbsPct + '%';
    document.getElementById('dash-fat-bar').style.width = fatPct + '%';

    // Change bar colors when exceeding
    ['cal', 'protein', 'carbs', 'fat'].forEach(type => {
      const bar = document.getElementById('dash-' + type + '-bar');
      const pct = { cal: calPct, protein: proteinPct, carbs: carbsPct, fat: fatPct }[type];
      if (pct >= 100) {
        bar.style.background = 'var(--red-500)';
      }
    });

    // Remaining text
    const remSign = (v) => v >= 0 ? v : 0;
    document.getElementById('dash-cal-remaining').textContent =
      remaining.calories >= 0 ? `剩余 ${remaining.calories} kcal` : '已超出目标热量';
    document.getElementById('dash-protein-remaining').textContent =
      remaining.protein > 0 ? `剩余 ${remaining.protein} g` : '已达标 ✓';
    document.getElementById('dash-carbs-remaining').textContent =
      remaining.carbs > 0 ? `剩余 ${remaining.carbs} g` : '已达标 ✓';
    document.getElementById('dash-fat-remaining').textContent =
      remaining.fat > 0 ? `剩余 ${remaining.fat} g` : '已达标 ✓';

    // Summary
    document.getElementById('summary-cal').textContent = remSign(remaining.calories);
    document.getElementById('summary-protein').textContent = remSign(remaining.protein);
    document.getElementById('summary-carbs').textContent = remSign(remaining.carbs);
    document.getElementById('summary-fat').textContent = remSign(remaining.fat);

    // Color the summary based on remaining
    const summaryCal = document.getElementById('summary-cal');
    if (remaining.calories <= 0) {
      summaryCal.style.color = 'var(--red-500)';
    } else {
      summaryCal.style.color = 'var(--green-700)';
    }
  }

  // ==================== Meal Log ====================
  function renderMealLog() {
    const log = MealLog.load(currentDate);

    const container = document.getElementById('meal-log-container');
    container.innerHTML = MealLog.MEAL_TYPES.map(mealType => {
      const entries = log.meals[mealType] || [];
      const mealTotal = MealLog.calcMealTotal(currentDate, mealType);
      const icon = MealLog.MEAL_ICONS[mealType];
      const label = MealLog.MEAL_LABELS[mealType];

      const entriesHtml = entries.length === 0
        ? `<div class="empty-meal">暂无记录</div>`
        : entries.map(e => `
          <li class="meal-entry">
            <div class="entry-info">
              <div class="entry-name">${e.foodName}</div>
              <div class="entry-detail">${e.grams}g</div>
            </div>
            <div class="entry-nutrition">
              ${e.nutrition.calories} kcal · 蛋白${e.nutrition.protein}g · 碳水${e.nutrition.carbs}g · 脂肪${e.nutrition.fat}g
            </div>
            <button class="entry-del" data-id="${e.id}" data-meal="${mealType}" title="删除">✕</button>
          </li>
        `).join('');

      return `
        <div class="card meal-section">
          <div class="meal-section-header">
            <span>${icon} ${label}</span>
            <span class="meal-section-total">
              🔥 ${mealTotal.calories} kcal · 🥚 ${mealTotal.protein}g · 🍚 ${mealTotal.carbs}g · 🧈 ${mealTotal.fat}g
            </span>
          </div>
          <ul class="meal-entries">${entriesHtml}</ul>
        </div>
      `;
    }).join('');

    // 绑定删除按钮
    container.querySelectorAll('.entry-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const mealType = btn.dataset.meal;
        MealLog.removeFood(currentDate, mealType, id);
        renderMealLog();
        if (profile) updateDashboard();
        showToast('已删除', 'success');
      });
    });
  }

  function handleFoodSearch() {
    const keyword = document.getElementById('food-search').value;
    const results = FoodDB.search(keyword);
    const resultsDiv = document.getElementById('food-search-results');

    if (results.length === 0 || keyword.length === 0) {
      resultsDiv.style.display = 'none';
      return;
    }

    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = results.slice(0, 15).map(f => `
      <div class="search-item" data-name="${f.name}">
        <span>${f.name} <small style="color:var(--gray-400)">${FoodDB.CATEGORIES[f.category] || '自定义'}</small></span>
        <span class="search-item-nutrition">
          🔥${f.calories} · 🥚${f.protein}g · 🍚${f.carbs}g · 🧈${f.fat}g
        </span>
      </div>
    `).join('');

    // 点击选中
    resultsDiv.querySelectorAll('.search-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.dataset.name;
        const foods = FoodDB.getAllFoods();
        selectedFood = foods.find(f => f.name === name);
        if (selectedFood) {
          document.getElementById('food-search').value = selectedFood.name;
          resultsDiv.style.display = 'none';
          showSelectedFoodPreview(selectedFood);
        }
      });
    });
  }

  function showSelectedFoodPreview(food) {
    const preview = document.getElementById('selected-food-preview');
    document.getElementById('selected-food-name').textContent = food.name + ' (每100g)';
    document.getElementById('selected-food-nutrition').textContent =
      `🔥${food.calories}kcal · 🥚${food.protein}g · 🍚${food.carbs}g · 🧈${food.fat}g`;
    preview.style.display = 'flex';
  }

  function handleAddFood() {
    if (!selectedFood) {
      showToast('请先搜索并选择一种食物', 'error');
      return;
    }

    const grams = parseInt(document.getElementById('food-grams').value);
    if (!grams || grams <= 0) {
      showToast('请输入有效份量', 'error');
      return;
    }

    const mealType = document.getElementById('food-meal-type').value;
    MealLog.addFood(currentDate, mealType, selectedFood, grams);

    // 清空
    document.getElementById('food-search').value = '';
    document.getElementById('food-grams').value = 100;
    document.getElementById('selected-food-preview').style.display = 'none';
    selectedFood = null;

    renderMealLog();
    if (profile) updateDashboard();
    showToast('✅ 已添加', 'success');
  }

  // ==================== Food Library ====================
  function renderFoodLibrary() {
    const keyword = document.getElementById('food-lib-search').value;
    const category = document.getElementById('food-category-filter').value;

    let foods;
    if (category === 'custom') {
      foods = Storage.loadCustomFoods();
    } else if (category === 'all') {
      foods = keyword ? FoodDB.search(keyword) : FoodDB.getAllFoods();
    } else {
      foods = FoodDB.getByCategory(category);
      if (keyword) {
        foods = foods.filter(f => f.name.toLowerCase().includes(keyword.toLowerCase()));
      }
    }

    document.getElementById('food-count').textContent = `(${foods.length} 种)`;

    const tbody = document.getElementById('food-table-body');
    tbody.innerHTML = foods.map(f => {
      const isCustom = !!f.id;
      const catLabel = isCustom ? '自定义' : (FoodDB.CATEGORIES[f.category] || f.category);
      return `
        <tr>
          <td>${f.name} ${isCustom ? '<small style="color:var(--purple-500)">[自定义]</small>' : ''}</td>
          <td><span class="cat-badge ${isCustom ? 'custom' : ''}">${catLabel}</span></td>
          <td>${f.calories}</td>
          <td>${f.protein}</td>
          <td>${f.carbs}</td>
          <td>${f.fat}</td>
          <td>
            ${isCustom ? `<button class="food-del-btn" data-id="${f.id}" title="删除">🗑️</button>` : '<span style="color:var(--gray-400)">内置</span>'}
          </td>
        </tr>
      `;
    }).join('');

    // 删除自定义食物
    tbody.querySelectorAll('.food-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        Storage.removeCustomFood(id);
        renderFoodLibrary();
        renderCustomFoodsList();
        showToast('自定义食物已删除', 'success');
      });
    });

    if (foods.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="padding:24px;color:var(--gray-400)">没有匹配的食物</td></tr>';
    }
  }

  function renderCustomFoodsList() {
    const customs = Storage.loadCustomFoods();
    const card = document.getElementById('custom-foods-card');
    const list = document.getElementById('custom-foods-list');

    if (customs.length === 0) {
      card.style.display = 'none';
      return;
    }

    card.style.display = 'block';
    list.innerHTML = customs.map(f => `
      <div class="custom-food-item">
        <div class="cf-info">
          <div class="cf-name">${f.name} <span class="cat-badge custom">${FoodDB.CATEGORIES[f.category] || ''}</span></div>
          <div class="cf-nutrition">
            🔥${f.calories}kcal · 🥚${f.protein}g · 🍚${f.carbs}g · 🧈${f.fat}g (每100g)
          </div>
        </div>
        <button class="btn btn-sm btn-danger cf-del-btn" data-id="${f.id}">删除</button>
      </div>
    `).join('');

    list.querySelectorAll('.cf-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Storage.removeCustomFood(btn.dataset.id);
        renderFoodLibrary();
        renderCustomFoodsList();
        showToast('自定义食物已删除', 'success');
      });
    });
  }

  function handleCustomFoodSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const category = document.getElementById('cf-category').value;
    const calories = parseFloat(document.getElementById('cf-calories').value);
    const protein = parseFloat(document.getElementById('cf-protein').value);
    const carbs = parseFloat(document.getElementById('cf-carbs').value);
    const fat = parseFloat(document.getElementById('cf-fat').value);

    if (!name) { showToast('请输入食物名称', 'error'); return; }
    if (isNaN(calories) || isNaN(protein) || isNaN(carbs) || isNaN(fat)) {
      showToast('请完整填写营养数据', 'error');
      return;
    }

    // 检查重复名称
    const existing = FoodDB.getAllFoods().find(f => f.name === name);
    if (existing) {
      showToast('食物名称已存在，请换一个名称', 'error');
      return;
    }

    Storage.addCustomFood({ name, category, calories, protein, carbs, fat });

    // 清空表单
    document.getElementById('custom-food-form').reset();
    document.getElementById('cf-category').value = 'meat';

    renderFoodLibrary();
    renderCustomFoodsList();
    showToast('✅ 自定义食物已保存！可在饮食记录中使用', 'success');
  }

  // ==================== Date ====================
  function changeDate(delta) {
    const d = new Date(currentDate + 'T00:00:00');
    d.setDate(d.getDate() + delta);
    currentDate = d.toISOString().slice(0, 10);
    document.getElementById('meal-date').value = currentDate;
    renderMealLog();
    if (profile) updateDashboard();
  }

  // ==================== Toast ====================
  function showToast(msg, type) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = 'toast ' + type + ' show';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // ==================== Boot ====================
  document.addEventListener('DOMContentLoaded', init);
})();
