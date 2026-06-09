/**
 * 内置食物知识库
 * 每 100g 营养成分: calories(kcal), protein(g), carbs(g), fat(g)
 * 分为 7 大类：主食、肉类、蔬菜、水果、乳制品、零食、饮品
 */

const FoodDB = (() => {

  const CATEGORIES = {
    staple: '主食',
    meat: '肉类/蛋/豆',
    vegetable: '蔬菜',
    fruit: '水果',
    dairy: '乳制品',
    snack: '零食/糕点',
    drink: '饮品',
  };

  const BUILTIN_FOODS = [
    // ===== 主食 =====
    { name: '白米饭', category: 'staple', calories: 116, protein: 2.6, carbs: 25.9, fat: 0.3 },
    { name: '馒头', category: 'staple', calories: 223, protein: 7.0, carbs: 44.2, fat: 1.1 },
    { name: '面条(煮)', category: 'staple', calories: 110, protein: 3.6, carbs: 22.0, fat: 0.6 },
    { name: '全麦面包', category: 'staple', calories: 246, protein: 10.4, carbs: 41.3, fat: 3.4 },
    { name: '白面包', category: 'staple', calories: 265, protein: 8.8, carbs: 49.0, fat: 3.3 },
    { name: '燕麦片', category: 'staple', calories: 367, protein: 13.5, carbs: 61.6, fat: 6.7 },
    { name: '红薯', category: 'staple', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
    { name: '玉米', category: 'staple', calories: 112, protein: 4.0, carbs: 22.8, fat: 1.2 },
    { name: '小米粥', category: 'staple', calories: 46, protein: 1.4, carbs: 8.4, fat: 0.7 },
    { name: '糙米饭', category: 'staple', calories: 123, protein: 2.7, carbs: 25.6, fat: 0.9 },
    { name: '饺子(猪肉)', category: 'staple', calories: 240, protein: 8.5, carbs: 30.0, fat: 10.8 },
    { name: '包子(肉馅)', category: 'staple', calories: 226, protein: 7.5, carbs: 28.0, fat: 10.0 },

    // ===== 肉类/蛋/豆 =====
    { name: '鸡胸肉', category: 'meat', calories: 133, protein: 31.0, carbs: 0.5, fat: 1.2 },
    { name: '鸡腿肉', category: 'meat', calories: 181, protein: 20.0, carbs: 0.0, fat: 11.0 },
    { name: '猪瘦肉', category: 'meat', calories: 143, protein: 20.3, carbs: 1.5, fat: 6.2 },
    { name: '猪五花肉', category: 'meat', calories: 395, protein: 13.2, carbs: 2.4, fat: 37.0 },
    { name: '牛肉(瘦)', category: 'meat', calories: 106, protein: 20.2, carbs: 1.2, fat: 2.3 },
    { name: '牛腩', category: 'meat', calories: 200, protein: 17.0, carbs: 2.5, fat: 14.0 },
    { name: '羊肉', category: 'meat', calories: 203, protein: 19.0, carbs: 0.0, fat: 14.1 },
    { name: '鸡蛋(煮)', category: 'meat', calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6 },
    { name: '鸡蛋清', category: 'meat', calories: 52, protein: 11.0, carbs: 0.7, fat: 0.2 },
    { name: '豆腐', category: 'meat', calories: 76, protein: 8.1, carbs: 2.8, fat: 3.7 },
    { name: '豆浆', category: 'meat', calories: 31, protein: 3.0, carbs: 1.2, fat: 1.6 },
    { name: '三文鱼', category: 'meat', calories: 208, protein: 20.4, carbs: 0.0, fat: 13.4 },
    { name: '虾仁', category: 'meat', calories: 99, protein: 20.3, carbs: 0.2, fat: 1.1 },
    { name: '带鱼', category: 'meat', calories: 127, protein: 18.0, carbs: 0.5, fat: 5.4 },
    { name: '火腿肠', category: 'meat', calories: 212, protein: 13.0, carbs: 12.0, fat: 15.0 },

    // ===== 蔬菜 =====
    { name: '西兰花', category: 'vegetable', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
    { name: '菠菜', category: 'vegetable', calories: 24, protein: 2.6, carbs: 3.6, fat: 0.4 },
    { name: '番茄', category: 'vegetable', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
    { name: '黄瓜', category: 'vegetable', calories: 15, protein: 0.7, carbs: 2.9, fat: 0.1 },
    { name: '胡萝卜', category: 'vegetable', calories: 41, protein: 1.0, carbs: 9.6, fat: 0.2 },
    { name: '芹菜', category: 'vegetable', calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1 },
    { name: '生菜', category: 'vegetable', calories: 15, protein: 1.4, carbs: 2.0, fat: 0.2 },
    { name: '白菜', category: 'vegetable', calories: 13, protein: 1.5, carbs: 2.2, fat: 0.1 },
    { name: '土豆', category: 'vegetable', calories: 77, protein: 2.0, carbs: 17.2, fat: 0.2 },
    { name: '青椒', category: 'vegetable', calories: 20, protein: 0.9, carbs: 4.6, fat: 0.2 },
    { name: '茄子', category: 'vegetable', calories: 21, protein: 0.9, carbs: 4.9, fat: 0.1 },
    { name: '豆芽', category: 'vegetable', calories: 18, protein: 2.1, carbs: 2.2, fat: 0.2 },

    // ===== 水果 =====
    { name: '苹果', category: 'fruit', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
    { name: '香蕉', category: 'fruit', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
    { name: '橙子', category: 'fruit', calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1 },
    { name: '葡萄', category: 'fruit', calories: 69, protein: 0.7, carbs: 17.2, fat: 0.2 },
    { name: '西瓜', category: 'fruit', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.1 },
    { name: '草莓', category: 'fruit', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
    { name: '蓝莓', category: 'fruit', calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3 },
    { name: '芒果', category: 'fruit', calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4 },
    { name: '猕猴桃', category: 'fruit', calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5 },
    { name: '柚子', category: 'fruit', calories: 42, protein: 0.8, carbs: 9.6, fat: 0.2 },
    { name: '火龙果', category: 'fruit', calories: 55, protein: 1.1, carbs: 13.0, fat: 0.2 },
    { name: '梨', category: 'fruit', calories: 57, protein: 0.4, carbs: 15.0, fat: 0.1 },

    // ===== 乳制品 =====
    { name: '全脂牛奶', category: 'dairy', calories: 61, protein: 3.0, carbs: 4.8, fat: 3.2 },
    { name: '脱脂牛奶', category: 'dairy', calories: 35, protein: 3.4, carbs: 5.0, fat: 0.1 },
    { name: '酸奶(原味)', category: 'dairy', calories: 61, protein: 3.5, carbs: 7.0, fat: 3.1 },
    { name: '希腊酸奶', category: 'dairy', calories: 97, protein: 9.0, carbs: 3.6, fat: 5.0 },
    { name: '奶酪(切达)', category: 'dairy', calories: 403, protein: 24.9, carbs: 1.3, fat: 33.0 },
    { name: '黄油', category: 'dairy', calories: 717, protein: 0.8, carbs: 0.1, fat: 81.0 },

    // ===== 零食/糕点 =====
    { name: '苏打饼干', category: 'snack', calories: 408, protein: 8.0, carbs: 72.0, fat: 7.7 },
    { name: '薯片', category: 'snack', calories: 532, protein: 5.0, carbs: 53.0, fat: 33.0 },
    { name: '黑巧克力(70%)', category: 'snack', calories: 598, protein: 7.8, carbs: 46.0, fat: 42.6 },
    { name: '坚果(杏仁)', category: 'snack', calories: 579, protein: 21.0, carbs: 20.0, fat: 50.0 },
    { name: '核桃', category: 'snack', calories: 654, protein: 15.0, carbs: 14.0, fat: 65.0 },
    { name: '蛋糕(奶油)', category: 'snack', calories: 347, protein: 7.0, carbs: 40.0, fat: 18.0 },
    { name: '饼干(曲奇)', category: 'snack', calories: 488, protein: 6.0, carbs: 65.0, fat: 22.0 },
    { name: '冰淇淋', category: 'snack', calories: 207, protein: 3.5, carbs: 24.0, fat: 11.0 },
    { name: '果冻', category: 'snack', calories: 68, protein: 0.1, carbs: 17.0, fat: 0.0 },

    // ===== 饮品 =====
    { name: '可乐', category: 'drink', calories: 42, protein: 0.0, carbs: 10.6, fat: 0.0 },
    { name: '橙汁', category: 'drink', calories: 45, protein: 0.7, carbs: 10.4, fat: 0.1 },
    { name: '啤酒', category: 'drink', calories: 43, protein: 0.4, carbs: 3.6, fat: 0.0 },
    { name: '白酒', category: 'drink', calories: 298, protein: 0.0, carbs: 1.0, fat: 0.0 },
    { name: '拿铁咖啡', category: 'drink', calories: 45, protein: 2.5, carbs: 4.5, fat: 2.0 },
    { name: '奶茶(珍珠)', category: 'drink', calories: 80, protein: 1.0, carbs: 14.0, fat: 2.0 },
    { name: '运动饮料', category: 'drink', calories: 26, protein: 0.0, carbs: 6.4, fat: 0.0 },
    { name: '豆浆(无糖)', category: 'drink', calories: 31, protein: 3.0, carbs: 1.2, fat: 1.6 },
  ];

  /**
   * 获取全部食物（内置 + 自定义）
   */
  async function getAllFoods() {
    const customs = await Storage.loadCustomFoods();
    return [...BUILTIN_FOODS, ...customs];
  }

  /**
   * 按分类筛选
   */
  async function getByCategory(cat) {
    const foods = await getAllFoods();
    return foods.filter(f => f.category === cat);
  }

  /**
   * 按关键词搜索
   */
  async function search(keyword) {
    if (!keyword || !keyword.trim()) return getAllFoods();
    const kw = keyword.trim().toLowerCase();
    const foods = await getAllFoods();
    return foods.filter(f => f.name.toLowerCase().includes(kw));
  }

  /**
   * 获取分类列表
   */
  function getCategories() {
    return Object.entries(CATEGORIES).map(([key, label]) => ({ key, label }));
  }

  return {
    CATEGORIES,
    BUILTIN_FOODS,
    getAllFoods,
    getByCategory,
    search,
    getCategories,
  };
})();
