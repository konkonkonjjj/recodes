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
    condiment: '调味料',
  };

  const BUILTIN_FOODS = [
    // ═══════════════════ 主食类 ═══════════════════
    // 米饭/粥
    { name: '白米饭', category: 'staple', calories: 116, protein: 2.6, carbs: 25.9, fat: 0.3 },
    { name: '糙米饭', category: 'staple', calories: 123, protein: 2.7, carbs: 25.6, fat: 0.9 },
    { name: '小米粥', category: 'staple', calories: 46, protein: 1.4, carbs: 8.4, fat: 0.7 },
    { name: '白米粥', category: 'staple', calories: 46, protein: 1.1, carbs: 9.7, fat: 0.3 },
    { name: '八宝粥', category: 'staple', calories: 85, protein: 2.2, carbs: 17.0, fat: 0.6 },
    { name: '紫米饭', category: 'staple', calories: 120, protein: 3.0, carbs: 23.5, fat: 0.8 },
    { name: '糯米饭', category: 'staple', calories: 135, protein: 2.8, carbs: 30.0, fat: 0.4 },

    // 面条/粉
    { name: '面条(煮)', category: 'staple', calories: 110, protein: 3.6, carbs: 22.0, fat: 0.6 },
    { name: '挂面(干)', category: 'staple', calories: 350, protein: 11.0, carbs: 72.0, fat: 1.0 },
    { name: '方便面', category: 'staple', calories: 472, protein: 9.5, carbs: 60.0, fat: 21.0 },
    { name: '乌冬面(熟)', category: 'staple', calories: 105, protein: 3.2, carbs: 21.0, fat: 0.4 },
    { name: '荞麦面(熟)', category: 'staple', calories: 115, protein: 4.5, carbs: 22.0, fat: 0.7 },
    { name: '意大利面(熟)', category: 'staple', calories: 131, protein: 5.0, carbs: 25.0, fat: 1.0 },
    { name: '河粉(熟)', category: 'staple', calories: 110, protein: 2.0, carbs: 24.0, fat: 0.4 },
    { name: '米粉(干)', category: 'staple', calories: 355, protein: 7.5, carbs: 80.0, fat: 0.5 },
    { name: '红薯粉条(干)', category: 'staple', calories: 340, protein: 0.5, carbs: 83.0, fat: 0.1 },
    { name: '土豆粉(熟)', category: 'staple', calories: 95, protein: 1.5, carbs: 22.0, fat: 0.1 },
    { name: '凉皮', category: 'staple', calories: 117, protein: 4.0, carbs: 22.0, fat: 1.0 },

    // 馒头/饼
    { name: '馒头', category: 'staple', calories: 223, protein: 7.0, carbs: 44.2, fat: 1.1 },
    { name: '花卷', category: 'staple', calories: 211, protein: 6.5, carbs: 42.0, fat: 1.2 },
    { name: '油条', category: 'staple', calories: 388, protein: 7.0, carbs: 51.0, fat: 17.0 },
    { name: '烧饼', category: 'staple', calories: 326, protein: 9.0, carbs: 55.0, fat: 8.0 },
    { name: '葱油饼', category: 'staple', calories: 330, protein: 7.5, carbs: 45.0, fat: 14.0 },
    { name: '手抓饼(饼坯)', category: 'staple', calories: 310, protein: 7.0, carbs: 42.0, fat: 13.0 },
    { name: '包子(猪肉大葱)', category: 'staple', calories: 227, protein: 7.5, carbs: 28.0, fat: 10.0 },
    { name: '小笼包', category: 'staple', calories: 210, protein: 8.0, carbs: 25.0, fat: 9.0 },
    { name: '饺子(猪肉白菜)', category: 'staple', calories: 200, protein: 7.5, carbs: 25.0, fat: 8.5 },
    { name: '馄饨', category: 'staple', calories: 180, protein: 7.0, carbs: 22.0, fat: 7.5 },
    { name: '粽子(肉粽)', category: 'staple', calories: 220, protein: 6.0, carbs: 30.0, fat: 9.0 },
    { name: '窝窝头', category: 'staple', calories: 233, protein: 7.0, carbs: 47.0, fat: 1.5 },

    // 面包/糕点
    { name: '白切片面包', category: 'staple', calories: 266, protein: 8.8, carbs: 49.0, fat: 3.3 },
    { name: '全麦面包', category: 'staple', calories: 246, protein: 10.4, carbs: 41.3, fat: 3.4 },
    { name: '法棍面包', category: 'staple', calories: 275, protein: 9.0, carbs: 55.0, fat: 1.5 },
    { name: '可颂/牛角包', category: 'staple', calories: 406, protein: 7.0, carbs: 46.0, fat: 22.0 },
    { name: '吐司', category: 'staple', calories: 280, protein: 8.5, carbs: 50.0, fat: 5.0 },
    { name: '海绵蛋糕', category: 'staple', calories: 315, protein: 6.5, carbs: 50.0, fat: 10.0 },
    { name: '奶油蛋糕', category: 'staple', calories: 378, protein: 5.5, carbs: 40.0, fat: 22.0 },
    { name: '鸡蛋糕', category: 'staple', calories: 345, protein: 8.0, carbs: 45.0, fat: 15.0 },
    { name: '煎饼(杂粮)', category: 'staple', calories: 250, protein: 8.0, carbs: 42.0, fat: 6.0 },
    { name: '鸡蛋灌饼', category: 'staple', calories: 278, protein: 8.5, carbs: 35.0, fat: 12.0 },
    { name: '手抓饼(含蛋)', category: 'staple', calories: 295, protein: 8.0, carbs: 38.0, fat: 13.5 },
    { name: '肉夹馍', category: 'staple', calories: 240, protein: 9.0, carbs: 30.0, fat: 10.0 },

    // 薯类及淀粉制品
    { name: '红薯', category: 'staple', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
    { name: '烤红薯', category: 'staple', calories: 110, protein: 1.8, carbs: 25.0, fat: 0.2 },
    { name: '紫薯', category: 'staple', calories: 82, protein: 2.0, carbs: 17.6, fat: 0.2 },
    { name: '土豆', category: 'staple', calories: 81, protein: 2.0, carbs: 17.2, fat: 0.2 },
    { name: '蒸土豆', category: 'staple', calories: 76, protein: 2.0, carbs: 17.0, fat: 0.1 },
    { name: '炸薯条', category: 'staple', calories: 312, protein: 3.8, carbs: 38.0, fat: 16.0 },
    { name: '山药', category: 'staple', calories: 57, protein: 1.9, carbs: 11.6, fat: 0.2 },
    { name: '芋头', category: 'staple', calories: 56, protein: 2.2, carbs: 10.5, fat: 0.2 },
    { name: '木薯', category: 'staple', calories: 160, protein: 1.4, carbs: 38.0, fat: 0.3 },
    { name: '莲藕', category: 'staple', calories: 74, protein: 2.6, carbs: 15.2, fat: 0.2 },
    { name: '玉米(鲜)', category: 'staple', calories: 112, protein: 4.0, carbs: 22.8, fat: 1.2 },
    { name: '糯玉米', category: 'staple', calories: 140, protein: 4.5, carbs: 28.0, fat: 1.5 },
    { name: '玉米面', category: 'staple', calories: 358, protein: 8.4, carbs: 75.6, fat: 3.3 },

    // ═══════════════════ 肉类/蛋/豆 ═══════════════════
    // 猪肉
    { name: '猪瘦肉', category: 'meat', calories: 143, protein: 20.3, carbs: 1.5, fat: 6.2 },
    { name: '猪里脊', category: 'meat', calories: 104, protein: 21.0, carbs: 1.0, fat: 2.0 },
    { name: '猪五花肉', category: 'meat', calories: 349, protein: 13.2, carbs: 2.4, fat: 37.0 },
    { name: '猪排骨', category: 'meat', calories: 264, protein: 17.5, carbs: 2.0, fat: 20.0 },
    { name: '猪脚', category: 'meat', calories: 260, protein: 22.6, carbs: 0.5, fat: 18.8 },
    { name: '猪肝', category: 'meat', calories: 129, protein: 19.3, carbs: 5.0, fat: 3.5 },
    { name: '猪肚', category: 'meat', calories: 110, protein: 15.6, carbs: 0.7, fat: 5.1 },
    { name: '猪大肠', category: 'meat', calories: 191, protein: 7.0, carbs: 1.5, fat: 17.5 },
    { name: '猪血', category: 'meat', calories: 55, protein: 12.2, carbs: 0.9, fat: 0.3 },
    { name: '培根', category: 'meat', calories: 550, protein: 12.0, carbs: 1.0, fat: 53.0 },
    { name: '腊肉', category: 'meat', calories: 498, protein: 13.0, carbs: 4.0, fat: 48.0 },
    { name: '香肠', category: 'meat', calories: 508, protein: 14.0, carbs: 10.0, fat: 46.0 },
    { name: '火腿肠', category: 'meat', calories: 212, protein: 13.0, carbs: 12.0, fat: 15.0 },
    { name: '午餐肉', category: 'meat', calories: 310, protein: 10.0, carbs: 14.0, fat: 24.0 },

    // 牛羊肉
    { name: '牛肉(瘦)', category: 'meat', calories: 106, protein: 20.2, carbs: 1.2, fat: 2.3 },
    { name: '牛腩', category: 'meat', calories: 200, protein: 17.0, carbs: 2.5, fat: 14.0 },
    { name: '牛腱子', category: 'meat', calories: 120, protein: 20.0, carbs: 2.0, fat: 3.5 },
    { name: '牛排(西冷)', category: 'meat', calories: 243, protein: 17.0, carbs: 0.0, fat: 19.0 },
    { name: '肥牛卷', category: 'meat', calories: 330, protein: 15.0, carbs: 2.0, fat: 29.0 },
    { name: '牛百叶', category: 'meat', calories: 70, protein: 13.5, carbs: 0.5, fat: 1.5 },
    { name: '牛舌', category: 'meat', calories: 196, protein: 17.0, carbs: 1.0, fat: 14.0 },
    { name: '羊肉(瘦)', category: 'meat', calories: 118, protein: 20.5, carbs: 0.2, fat: 3.9 },
    { name: '羊排', category: 'meat', calories: 250, protein: 16.0, carbs: 1.0, fat: 20.0 },
    { name: '羊蝎子', category: 'meat', calories: 170, protein: 18.0, carbs: 1.0, fat: 10.0 },
    { name: '羊肉卷', category: 'meat', calories: 280, protein: 16.0, carbs: 2.0, fat: 23.0 },

    // 禽肉
    { name: '鸡胸肉', category: 'meat', calories: 118, protein: 31.0, carbs: 0.5, fat: 1.2 },
    { name: '鸡腿肉(去皮)', category: 'meat', calories: 119, protein: 20.0, carbs: 0.0, fat: 3.5 },
    { name: '鸡腿肉(带皮)', category: 'meat', calories: 181, protein: 18.0, carbs: 0.0, fat: 11.0 },
    { name: '鸡翅', category: 'meat', calories: 194, protein: 17.0, carbs: 0.5, fat: 13.0 },
    { name: '整鸡(带皮)', category: 'meat', calories: 167, protein: 18.0, carbs: 1.0, fat: 10.0 },
    { name: '鸡胗', category: 'meat', calories: 118, protein: 19.2, carbs: 0.6, fat: 4.0 },
    { name: '鸡心', category: 'meat', calories: 148, protein: 15.0, carbs: 2.0, fat: 9.0 },
    { name: '鸡肝', category: 'meat', calories: 121, protein: 16.6, carbs: 3.0, fat: 4.8 },
    { name: '鸭肉', category: 'meat', calories: 149, protein: 15.5, carbs: 4.0, fat: 7.0 },
    { name: '鸭腿', category: 'meat', calories: 205, protein: 18.0, carbs: 2.0, fat: 14.0 },
    { name: '鹅肉', category: 'meat', calories: 161, protein: 17.0, carbs: 1.0, fat: 10.0 },
    { name: '火鸡肉', category: 'meat', calories: 119, protein: 24.0, carbs: 0.0, fat: 2.0 },
    { name: '鸽子肉', category: 'meat', calories: 201, protein: 16.5, carbs: 1.0, fat: 14.5 },

    // 蛋类
    { name: '鸡蛋(煮)', category: 'meat', calories: 144, protein: 12.6, carbs: 1.1, fat: 10.6 },
    { name: '鸡蛋白', category: 'meat', calories: 48, protein: 11.0, carbs: 0.7, fat: 0.2 },
    { name: '鸡蛋黄', category: 'meat', calories: 328, protein: 15.2, carbs: 3.6, fat: 28.2 },
    { name: '鸭蛋', category: 'meat', calories: 180, protein: 12.6, carbs: 3.1, fat: 13.0 },
    { name: '咸鸭蛋', category: 'meat', calories: 190, protein: 12.7, carbs: 3.0, fat: 14.5 },
    { name: '鹌鹑蛋', category: 'meat', calories: 160, protein: 12.8, carbs: 1.0, fat: 11.1 },
    { name: '皮蛋/松花蛋', category: 'meat', calories: 171, protein: 14.2, carbs: 4.5, fat: 10.7 },

    // ═══════════════════ 水产类 ═══════════════════
    { name: '三文鱼', category: 'meat', calories: 208, protein: 20.4, carbs: 0.0, fat: 13.4 },
    { name: '鳕鱼', category: 'meat', calories: 82, protein: 17.8, carbs: 0.0, fat: 0.7 },
    { name: '鲈鱼', category: 'meat', calories: 100, protein: 18.6, carbs: 0.5, fat: 2.4 },
    { name: '草鱼', category: 'meat', calories: 112, protein: 17.7, carbs: 2.0, fat: 3.1 },
    { name: '鲫鱼', category: 'meat', calories: 108, protein: 17.1, carbs: 3.8, fat: 2.7 },
    { name: '鲤鱼', category: 'meat', calories: 109, protein: 17.6, carbs: 0.5, fat: 4.1 },
    { name: '带鱼', category: 'meat', calories: 127, protein: 18.0, carbs: 0.5, fat: 5.4 },
    { name: '黄花鱼', category: 'meat', calories: 97, protein: 18.0, carbs: 0.3, fat: 2.0 },
    { name: '金枪鱼', category: 'meat', calories: 144, protein: 23.3, carbs: 0.0, fat: 4.9 },
    { name: '龙利鱼', category: 'meat', calories: 84, protein: 17.0, carbs: 0.5, fat: 1.5 },
    { name: '沙丁鱼', category: 'meat', calories: 208, protein: 24.6, carbs: 0.0, fat: 11.4 },
    { name: '秋刀鱼', category: 'meat', calories: 310, protein: 18.0, carbs: 0.2, fat: 26.0 },
    { name: '鳗鱼', category: 'meat', calories: 230, protein: 16.4, carbs: 2.0, fat: 17.5 },
    { name: '罗非鱼', category: 'meat', calories: 96, protein: 19.0, carbs: 0.5, fat: 1.5 },
    { name: '鳊鱼/武昌鱼', category: 'meat', calories: 135, protein: 18.3, carbs: 0.5, fat: 6.3 },
    { name: '鳙鱼/胖头鱼', category: 'meat', calories: 100, protein: 15.3, carbs: 4.7, fat: 2.2 },
    { name: '鲶鱼', category: 'meat', calories: 101, protein: 17.3, carbs: 0.0, fat: 3.4 },
    { name: '鲳鱼', category: 'meat', calories: 140, protein: 18.5, carbs: 0.3, fat: 7.0 },
    { name: '马鲛鱼', category: 'meat', calories: 205, protein: 19.0, carbs: 0.5, fat: 14.0 },
    { name: '多春鱼', category: 'meat', calories: 280, protein: 17.0, carbs: 1.0, fat: 23.0 },

    // 虾蟹贝类
    { name: '基围虾', category: 'meat', calories: 87, protein: 18.6, carbs: 0.0, fat: 1.0 },
    { name: '虾仁', category: 'meat', calories: 48, protein: 20.3, carbs: 0.2, fat: 1.1 },
    { name: '小龙虾', category: 'meat', calories: 93, protein: 14.8, carbs: 0.5, fat: 3.6 },
    { name: '皮皮虾', category: 'meat', calories: 80, protein: 16.0, carbs: 1.0, fat: 1.0 },
    { name: '大闸蟹', category: 'meat', calories: 103, protein: 11.6, carbs: 1.1, fat: 5.8 },
    { name: '梭子蟹', category: 'meat', calories: 95, protein: 13.8, carbs: 4.7, fat: 2.3 },
    { name: '蟹肉(熟)', category: 'meat', calories: 62, protein: 18.0, carbs: 0.0, fat: 0.5 },
    { name: '蛤蜊', category: 'meat', calories: 45, protein: 5.0, carbs: 3.5, fat: 0.5 },
    { name: '花甲', category: 'meat', calories: 56, protein: 7.6, carbs: 2.2, fat: 0.6 },
    { name: '蛏子', category: 'meat', calories: 68, protein: 10.1, carbs: 2.0, fat: 1.0 },
    { name: '生蚝', category: 'meat', calories: 57, protein: 5.0, carbs: 8.2, fat: 1.2 },
    { name: '扇贝', category: 'meat', calories: 74, protein: 11.1, carbs: 2.6, fat: 1.5 },
    { name: '鲍鱼', category: 'meat', calories: 84, protein: 14.0, carbs: 5.0, fat: 0.8 },
    { name: '海螺', category: 'meat', calories: 107, protein: 15.0, carbs: 7.0, fat: 1.5 },
    { name: '海参(水发)', category: 'meat', calories: 28, protein: 6.0, carbs: 0.2, fat: 0.1 },
    { name: '鱿鱼', category: 'meat', calories: 75, protein: 15.6, carbs: 1.6, fat: 0.8 },
    { name: '墨鱼', category: 'meat', calories: 86, protein: 15.2, carbs: 3.2, fat: 1.0 },
    { name: '章鱼/八爪鱼', category: 'meat', calories: 82, protein: 15.0, carbs: 2.0, fat: 1.0 },

    // 豆类及豆制品
    { name: '黄豆', category: 'meat', calories: 390, protein: 35.0, carbs: 34.2, fat: 16.0 },
    { name: '绿豆', category: 'meat', calories: 329, protein: 21.6, carbs: 62.0, fat: 0.8 },
    { name: '红豆', category: 'meat', calories: 324, protein: 21.4, carbs: 60.7, fat: 0.6 },
    { name: '黑豆', category: 'meat', calories: 381, protein: 36.0, carbs: 33.6, fat: 15.9 },
    { name: '鹰嘴豆', category: 'meat', calories: 364, protein: 19.3, carbs: 60.6, fat: 6.0 },
    { name: '豌豆(干)', category: 'meat', calories: 330, protein: 23.0, carbs: 60.0, fat: 1.0 },
    { name: '芸豆', category: 'meat', calories: 333, protein: 23.4, carbs: 57.2, fat: 1.4 },
    { name: '蚕豆(干)', category: 'meat', calories: 335, protein: 25.4, carbs: 59.4, fat: 1.6 },
    { name: '毛豆(鲜)', category: 'meat', calories: 131, protein: 13.1, carbs: 10.5, fat: 5.0 },
    { name: '扁豆', category: 'meat', calories: 326, protein: 25.3, carbs: 55.4, fat: 1.6 },

    // 豆制品
    { name: '豆浆(无糖)', category: 'meat', calories: 31, protein: 3.0, carbs: 1.2, fat: 1.6 },
    { name: '豆浆(加糖)', category: 'meat', calories: 50, protein: 2.8, carbs: 7.0, fat: 1.5 },
    { name: '豆腐(北/老)', category: 'meat', calories: 116, protein: 12.2, carbs: 2.0, fat: 6.2 },
    { name: '豆腐(南/嫩)', category: 'meat', calories: 57, protein: 5.7, carbs: 2.8, fat: 2.8 },
    { name: '内酯豆腐', category: 'meat', calories: 49, protein: 5.0, carbs: 2.4, fat: 2.3 },
    { name: '豆腐干', category: 'meat', calories: 151, protein: 16.2, carbs: 5.0, fat: 7.5 },
    { name: '豆腐皮/千张', category: 'meat', calories: 409, protein: 44.6, carbs: 22.3, fat: 17.4 },
    { name: '腐竹(干)', category: 'meat', calories: 461, protein: 44.6, carbs: 22.3, fat: 21.7 },
    { name: '油豆腐', category: 'meat', calories: 245, protein: 17.0, carbs: 5.0, fat: 17.5 },
    { name: '臭豆腐(油炸)', category: 'meat', calories: 180, protein: 9.0, carbs: 10.0, fat: 12.0 },
    { name: '豆腐乳', category: 'meat', calories: 133, protein: 8.2, carbs: 7.0, fat: 8.5 },
    { name: '豆豉', category: 'meat', calories: 280, protein: 24.1, carbs: 39.7, fat: 5.0 },
    { name: '纳豆', category: 'meat', calories: 200, protein: 16.5, carbs: 13.0, fat: 9.0 },

    // ═══════════════════ 蔬菜类 ═══════════════════
    // 叶菜
    { name: '大白菜', category: 'vegetable', calories: 13, protein: 1.5, carbs: 2.2, fat: 0.1 },
    { name: '小白菜/青菜', category: 'vegetable', calories: 15, protein: 1.5, carbs: 2.7, fat: 0.2 },
    { name: '菠菜', category: 'vegetable', calories: 24, protein: 2.6, carbs: 3.6, fat: 0.4 },
    { name: '生菜', category: 'vegetable', calories: 13, protein: 1.4, carbs: 2.0, fat: 0.2 },
    { name: '油麦菜', category: 'vegetable', calories: 15, protein: 1.5, carbs: 2.3, fat: 0.2 },
    { name: '茼蒿', category: 'vegetable', calories: 24, protein: 1.9, carbs: 3.9, fat: 0.3 },
    { name: '韭菜', category: 'vegetable', calories: 26, protein: 2.4, carbs: 4.6, fat: 0.4 },
    { name: '芹菜(茎)', category: 'vegetable', calories: 14, protein: 0.7, carbs: 3.4, fat: 0.1 },
    { name: '芹菜叶', category: 'vegetable', calories: 31, protein: 2.6, carbs: 6.0, fat: 0.4 },
    { name: '空心菜', category: 'vegetable', calories: 19, protein: 2.2, carbs: 3.6, fat: 0.2 },
    { name: '苋菜', category: 'vegetable', calories: 25, protein: 2.8, carbs: 4.0, fat: 0.3 },
    { name: '卷心菜/包菜', category: 'vegetable', calories: 22, protein: 1.5, carbs: 4.6, fat: 0.2 },
    { name: '紫甘蓝', category: 'vegetable', calories: 24, protein: 1.4, carbs: 5.2, fat: 0.1 },
    { name: '娃娃菜', category: 'vegetable', calories: 13, protein: 1.4, carbs: 2.1, fat: 0.1 },
    { name: '芥蓝', category: 'vegetable', calories: 19, protein: 2.3, carbs: 3.3, fat: 0.2 },
    { name: '西洋菜/豆瓣菜', category: 'vegetable', calories: 18, protein: 2.5, carbs: 2.2, fat: 0.3 },
    { name: '荠菜', category: 'vegetable', calories: 27, protein: 2.9, carbs: 4.7, fat: 0.4 },
    { name: '香菜', category: 'vegetable', calories: 23, protein: 2.2, carbs: 4.0, fat: 0.3 },

    // 花/果菜
    { name: '西兰花', category: 'vegetable', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
    { name: '花菜/菜花', category: 'vegetable', calories: 20, protein: 2.1, carbs: 3.5, fat: 0.3 },
    { name: '番茄', category: 'vegetable', calories: 19, protein: 0.9, carbs: 3.9, fat: 0.2 },
    { name: '圣女果', category: 'vegetable', calories: 22, protein: 1.0, carbs: 5.0, fat: 0.2 },
    { name: '黄瓜', category: 'vegetable', calories: 16, protein: 0.7, carbs: 2.9, fat: 0.1 },
    { name: '茄子', category: 'vegetable', calories: 23, protein: 0.9, carbs: 4.9, fat: 0.1 },
    { name: '辣椒(青)', category: 'vegetable', calories: 23, protein: 1.3, carbs: 5.0, fat: 0.2 },
    { name: '彩椒', category: 'vegetable', calories: 20, protein: 1.0, carbs: 4.6, fat: 0.2 },
    { name: '秋葵', category: 'vegetable', calories: 33, protein: 2.0, carbs: 7.5, fat: 0.2 },
    { name: '苦瓜', category: 'vegetable', calories: 19, protein: 1.0, carbs: 3.5, fat: 0.1 },
    { name: '丝瓜', category: 'vegetable', calories: 20, protein: 1.0, carbs: 4.2, fat: 0.2 },
    { name: '冬瓜', category: 'vegetable', calories: 12, protein: 0.4, carbs: 2.6, fat: 0.0 },
    { name: '南瓜', category: 'vegetable', calories: 23, protein: 0.7, carbs: 5.3, fat: 0.1 },
    { name: '西葫芦', category: 'vegetable', calories: 18, protein: 1.0, carbs: 3.8, fat: 0.2 },

    // 根茎
    { name: '白萝卜', category: 'vegetable', calories: 16, protein: 0.9, carbs: 3.1, fat: 0.1 },
    { name: '胡萝卜', category: 'vegetable', calories: 37, protein: 1.0, carbs: 8.8, fat: 0.2 },
    { name: '洋葱', category: 'vegetable', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
    { name: '大蒜', category: 'vegetable', calories: 128, protein: 6.4, carbs: 26.5, fat: 0.2 },
    { name: '生姜', category: 'vegetable', calories: 46, protein: 1.8, carbs: 10.3, fat: 0.7 },
    { name: '竹笋(鲜)', category: 'vegetable', calories: 23, protein: 2.6, carbs: 3.6, fat: 0.2 },
    { name: '芦笋', category: 'vegetable', calories: 22, protein: 2.2, carbs: 3.9, fat: 0.1 },
    { name: '莴笋', category: 'vegetable', calories: 15, protein: 1.0, carbs: 3.2, fat: 0.1 },
    { name: '茭白', category: 'vegetable', calories: 26, protein: 1.2, carbs: 5.9, fat: 0.2 },
    { name: '甜菜根', category: 'vegetable', calories: 43, protein: 1.6, carbs: 9.6, fat: 0.2 },
    { name: '芥菜头/大头菜', category: 'vegetable', calories: 33, protein: 1.9, carbs: 7.0, fat: 0.2 },

    // 菌菇藻
    { name: '香菇(鲜)', category: 'vegetable', calories: 26, protein: 2.2, carbs: 5.2, fat: 0.3 },
    { name: '金针菇', category: 'vegetable', calories: 32, protein: 2.4, carbs: 6.0, fat: 0.4 },
    { name: '杏鲍菇', category: 'vegetable', calories: 35, protein: 1.3, carbs: 8.3, fat: 0.1 },
    { name: '平菇', category: 'vegetable', calories: 24, protein: 1.9, carbs: 4.6, fat: 0.3 },
    { name: '口蘑', category: 'vegetable', calories: 30, protein: 3.5, carbs: 3.0, fat: 0.5 },
    { name: '木耳(干)', category: 'vegetable', calories: 265, protein: 12.1, carbs: 65.6, fat: 1.0 },
    { name: '银耳(干)', category: 'vegetable', calories: 261, protein: 10.0, carbs: 67.3, fat: 1.4 },
    { name: '海带(鲜)', category: 'vegetable', calories: 15, protein: 1.2, carbs: 2.3, fat: 0.1 },
    { name: '紫菜(干)', category: 'vegetable', calories: 320, protein: 26.7, carbs: 44.1, fat: 1.1 },

    // ═══════════════════ 水果类 ═══════════════════
    { name: '苹果', category: 'fruit', calories: 53, protein: 0.3, carbs: 13.8, fat: 0.2 },
    { name: '梨', category: 'fruit', calories: 51, protein: 0.4, carbs: 13.3, fat: 0.1 },
    { name: '香蕉', category: 'fruit', calories: 93, protein: 1.1, carbs: 22.8, fat: 0.3 },
    { name: '橙子', category: 'fruit', calories: 48, protein: 0.9, carbs: 11.8, fat: 0.1 },
    { name: '橘子', category: 'fruit', calories: 44, protein: 0.8, carbs: 10.5, fat: 0.2 },
    { name: '柚子', category: 'fruit', calories: 42, protein: 0.8, carbs: 9.6, fat: 0.2 },
    { name: '柠檬', category: 'fruit', calories: 37, protein: 1.1, carbs: 7.8, fat: 0.3 },
    { name: '葡萄', category: 'fruit', calories: 45, protein: 0.7, carbs: 10.8, fat: 0.2 },
    { name: '西瓜', category: 'fruit', calories: 31, protein: 0.6, carbs: 7.6, fat: 0.1 },
    { name: '哈密瓜', category: 'fruit', calories: 34, protein: 0.5, carbs: 8.3, fat: 0.1 },
    { name: '草莓', category: 'fruit', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
    { name: '蓝莓', category: 'fruit', calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3 },
    { name: '樱桃', category: 'fruit', calories: 46, protein: 1.1, carbs: 10.2, fat: 0.3 },
    { name: '猕猴桃', category: 'fruit', calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5 },
    { name: '菠萝', category: 'fruit', calories: 44, protein: 0.5, carbs: 10.8, fat: 0.1 },
    { name: '芒果', category: 'fruit', calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4 },
    { name: '木瓜', category: 'fruit', calories: 30, protein: 0.5, carbs: 7.2, fat: 0.1 },
    { name: '火龙果(白)', category: 'fruit', calories: 55, protein: 1.1, carbs: 13.0, fat: 0.2 },
    { name: '火龙果(红)', category: 'fruit', calories: 50, protein: 1.2, carbs: 11.5, fat: 0.3 },
    { name: '柿子', category: 'fruit', calories: 74, protein: 0.7, carbs: 18.5, fat: 0.1 },
    { name: '石榴', category: 'fruit', calories: 73, protein: 1.3, carbs: 17.5, fat: 0.4 },
    { name: '山楂', category: 'fruit', calories: 102, protein: 0.7, carbs: 25.1, fat: 0.6 },
    { name: '冬枣', category: 'fruit', calories: 105, protein: 1.2, carbs: 25.0, fat: 0.2 },
    { name: '杨梅', category: 'fruit', calories: 30, protein: 0.8, carbs: 6.7, fat: 0.2 },
    { name: '枇杷', category: 'fruit', calories: 41, protein: 0.4, carbs: 10.2, fat: 0.2 },
    { name: '李子', category: 'fruit', calories: 38, protein: 0.7, carbs: 8.7, fat: 0.2 },
    { name: '杏', category: 'fruit', calories: 38, protein: 0.9, carbs: 8.4, fat: 0.1 },
    { name: '桃子', category: 'fruit', calories: 42, protein: 0.9, carbs: 10.0, fat: 0.1 },
    { name: '水蜜桃', category: 'fruit', calories: 41, protein: 1.0, carbs: 9.5, fat: 0.2 },
    { name: '油桃', category: 'fruit', calories: 39, protein: 0.8, carbs: 9.0, fat: 0.2 },
    { name: '无花果', category: 'fruit', calories: 65, protein: 0.8, carbs: 16.0, fat: 0.2 },
    { name: '百香果', category: 'fruit', calories: 97, protein: 2.2, carbs: 21.0, fat: 0.7 },
    { name: '番石榴/芭乐', category: 'fruit', calories: 53, protein: 1.4, carbs: 12.2, fat: 0.4 },
    { name: '杨桃', category: 'fruit', calories: 31, protein: 0.7, carbs: 7.0, fat: 0.2 },
    { name: '榴莲', category: 'fruit', calories: 147, protein: 1.5, carbs: 27.0, fat: 5.3 },
    { name: '菠萝蜜', category: 'fruit', calories: 95, protein: 1.5, carbs: 24.0, fat: 0.3 },
    { name: '荔枝', category: 'fruit', calories: 66, protein: 0.8, carbs: 16.5, fat: 0.2 },
    { name: '龙眼', category: 'fruit', calories: 60, protein: 1.2, carbs: 14.0, fat: 0.1 },
    { name: '山竹', category: 'fruit', calories: 73, protein: 0.4, carbs: 18.0, fat: 0.6 },
    { name: '椰子肉', category: 'fruit', calories: 354, protein: 3.3, carbs: 15.2, fat: 33.0 },

    // 果干
    { name: '葡萄干', category: 'fruit', calories: 341, protein: 3.1, carbs: 79.0, fat: 0.5 },
    { name: '红枣(干)', category: 'fruit', calories: 276, protein: 3.4, carbs: 64.0, fat: 0.5 },
    { name: '枸杞(干)', category: 'fruit', calories: 349, protein: 13.9, carbs: 64.1, fat: 1.5 },
    { name: '桂圆干', category: 'fruit', calories: 283, protein: 5.0, carbs: 65.0, fat: 0.4 },
    { name: '香蕉片(烘)', category: 'fruit', calories: 520, protein: 2.3, carbs: 65.0, fat: 30.0 },
    { name: '山楂片', category: 'fruit', calories: 375, protein: 0.5, carbs: 92.0, fat: 0.5 },
    { name: '无花果干', category: 'fruit', calories: 253, protein: 3.3, carbs: 53.0, fat: 0.9 },
    { name: '杏干', category: 'fruit', calories: 250, protein: 3.0, carbs: 55.0, fat: 0.5 },
    { name: '西梅干', category: 'fruit', calories: 240, protein: 2.2, carbs: 57.0, fat: 0.4 },

    // ═══════════════════ 坚果及种子 ═══════════════════
    { name: '核桃', category: 'snack', calories: 646, protein: 15.0, carbs: 14.0, fat: 65.0 },
    { name: '杏仁/巴旦木', category: 'snack', calories: 578, protein: 21.0, carbs: 20.0, fat: 50.0 },
    { name: '腰果', category: 'snack', calories: 553, protein: 18.2, carbs: 30.0, fat: 43.8 },
    { name: '开心果', category: 'snack', calories: 560, protein: 20.0, carbs: 28.0, fat: 45.0 },
    { name: '花生(生)', category: 'snack', calories: 574, protein: 25.8, carbs: 16.1, fat: 49.2 },
    { name: '花生(炒)', category: 'snack', calories: 601, protein: 22.0, carbs: 18.0, fat: 48.0 },
    { name: '花生米(油炸)', category: 'snack', calories: 618, protein: 20.0, carbs: 15.0, fat: 55.0 },
    { name: '葵花籽(炒)', category: 'snack', calories: 615, protein: 19.0, carbs: 17.0, fat: 53.0 },
    { name: '南瓜子', category: 'snack', calories: 574, protein: 24.5, carbs: 13.5, fat: 49.0 },
    { name: '西瓜子', category: 'snack', calories: 573, protein: 28.0, carbs: 16.0, fat: 46.0 },
    { name: '松子', category: 'snack', calories: 698, protein: 14.0, carbs: 12.0, fat: 68.0 },
    { name: '夏威夷果', category: 'snack', calories: 718, protein: 8.0, carbs: 14.0, fat: 75.8 },
    { name: '榛子', category: 'snack', calories: 628, protein: 15.0, carbs: 17.0, fat: 60.0 },
    { name: '板栗(鲜)', category: 'snack', calories: 185, protein: 4.2, carbs: 40.0, fat: 0.7 },
    { name: '糖炒栗子', category: 'snack', calories: 210, protein: 4.0, carbs: 45.0, fat: 1.0 },
    { name: '芝麻(黑白)', category: 'snack', calories: 560, protein: 18.0, carbs: 23.0, fat: 46.0 },
    { name: '奇亚籽', category: 'snack', calories: 486, protein: 17.0, carbs: 42.0, fat: 31.0 },
    { name: '亚麻籽', category: 'snack', calories: 534, protein: 18.3, carbs: 28.9, fat: 42.2 },
    { name: '藜麦(干)', category: 'snack', calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1 },
    { name: '椰子脆片', category: 'snack', calories: 600, protein: 3.0, carbs: 28.0, fat: 55.0 },

    // ═══════════════════ 乳制品 ═══════════════════
    { name: '全脂牛奶', category: 'dairy', calories: 65, protein: 3.0, carbs: 4.8, fat: 3.6 },
    { name: '低脂牛奶', category: 'dairy', calories: 46, protein: 3.2, carbs: 5.0, fat: 1.5 },
    { name: '脱脂牛奶', category: 'dairy', calories: 34, protein: 3.4, carbs: 5.0, fat: 0.1 },
    { name: '酸奶(原味)', category: 'dairy', calories: 72, protein: 3.5, carbs: 8.0, fat: 3.0 },
    { name: '酸奶(果味)', category: 'dairy', calories: 95, protein: 2.8, carbs: 14.0, fat: 2.8 },
    { name: '希腊酸奶', category: 'dairy', calories: 97, protein: 9.0, carbs: 3.6, fat: 5.0 },
    { name: '奶酪(切达)', category: 'dairy', calories: 403, protein: 24.9, carbs: 1.3, fat: 33.0 },
    { name: '马苏里拉奶酪', category: 'dairy', calories: 280, protein: 22.0, carbs: 3.0, fat: 20.0 },
    { name: '奶油奶酪', category: 'dairy', calories: 342, protein: 6.0, carbs: 4.0, fat: 34.0 },
    { name: '淡奶油', category: 'dairy', calories: 337, protein: 2.8, carbs: 3.3, fat: 35.0 },
    { name: '炼乳', category: 'dairy', calories: 331, protein: 8.0, carbs: 55.0, fat: 9.0 },
    { name: '冰淇淋', category: 'dairy', calories: 200, protein: 3.5, carbs: 24.0, fat: 11.0 },
    { name: '甜筒冰淇淋', category: 'dairy', calories: 240, protein: 4.0, carbs: 30.0, fat: 13.0 },
    { name: '奶片', category: 'dairy', calories: 530, protein: 12.0, carbs: 40.0, fat: 35.0 },

    // ═══════════════════ 零食/糕点 ═══════════════════
    { name: '苏打饼干', category: 'snack', calories: 408, protein: 8.0, carbs: 72.0, fat: 7.7 },
    { name: '奥利奥饼干', category: 'snack', calories: 488, protein: 5.0, carbs: 68.0, fat: 22.0 },
    { name: '夹心饼干', category: 'snack', calories: 500, protein: 5.5, carbs: 65.0, fat: 24.0 },
    { name: '曲奇饼干', category: 'snack', calories: 546, protein: 6.0, carbs: 65.0, fat: 29.0 },
    { name: '薯片', category: 'snack', calories: 536, protein: 5.0, carbs: 53.0, fat: 33.0 },
    { name: '锅巴', category: 'snack', calories: 480, protein: 7.0, carbs: 68.0, fat: 20.0 },
    { name: '巧克力(牛奶)', category: 'snack', calories: 546, protein: 7.0, carbs: 55.0, fat: 34.0 },
    { name: '黑巧克力(70%)', category: 'snack', calories: 598, protein: 7.8, carbs: 46.0, fat: 42.6 },
    { name: '白巧克力', category: 'snack', calories: 539, protein: 6.0, carbs: 58.0, fat: 32.0 },
    { name: '糖果(硬糖)', category: 'snack', calories: 395, protein: 0.0, carbs: 98.0, fat: 0.0 },
    { name: '奶糖', category: 'snack', calories: 438, protein: 3.0, carbs: 70.0, fat: 15.0 },
    { name: '果冻', category: 'snack', calories: 80, protein: 0.1, carbs: 20.0, fat: 0.0 },
    { name: '牛肉干', category: 'snack', calories: 550, protein: 45.0, carbs: 5.0, fat: 40.0 },
    { name: '猪肉脯', category: 'snack', calories: 378, protein: 28.0, carbs: 20.0, fat: 20.0 },
    { name: '鱿鱼丝', category: 'snack', calories: 320, protein: 60.0, carbs: 5.0, fat: 5.0 },
    { name: '鱼片干', category: 'snack', calories: 310, protein: 55.0, carbs: 8.0, fat: 5.0 },
    { name: '海苔', category: 'snack', calories: 300, protein: 30.0, carbs: 30.0, fat: 8.0 },
    { name: '爆米花(无油)', category: 'snack', calories: 387, protein: 12.0, carbs: 78.0, fat: 4.0 },
    { name: '爆米花(焦糖)', category: 'snack', calories: 480, protein: 5.0, carbs: 80.0, fat: 15.0 },
    { name: '雪饼', category: 'snack', calories: 480, protein: 5.5, carbs: 75.0, fat: 17.0 },
    { name: '仙贝', category: 'snack', calories: 450, protein: 6.0, carbs: 72.0, fat: 16.0 },
    { name: '能量棒/蛋白棒', category: 'snack', calories: 420, protein: 25.0, carbs: 45.0, fat: 15.0 },
    { name: '沙琪玛', category: 'snack', calories: 500, protein: 6.0, carbs: 58.0, fat: 27.0 },

    // ═══════════════════ 快餐/外卖 ═══════════════════
    { name: '汉堡包(牛肉)', category: 'snack', calories: 260, protein: 12.0, carbs: 28.0, fat: 11.0 },
    { name: '芝士汉堡', category: 'snack', calories: 300, protein: 14.0, carbs: 28.0, fat: 15.0 },
    { name: '巨无霸', category: 'snack', calories: 260, protein: 12.0, carbs: 27.0, fat: 12.0 },
    { name: '炸鸡腿', category: 'snack', calories: 280, protein: 18.0, carbs: 10.0, fat: 18.0 },
    { name: '炸鸡块', category: 'snack', calories: 280, protein: 15.0, carbs: 14.0, fat: 18.0 },
    { name: '鸡排(炸)', category: 'snack', calories: 320, protein: 18.0, carbs: 15.0, fat: 22.0 },
    { name: '披萨(美式)', category: 'snack', calories: 260, protein: 11.0, carbs: 30.0, fat: 11.0 },
    { name: '披萨(薄底)', category: 'snack', calories: 210, protein: 10.0, carbs: 26.0, fat: 8.0 },
    { name: '三明治(鸡肉)', category: 'snack', calories: 230, protein: 15.0, carbs: 25.0, fat: 8.0 },
    { name: '热狗', category: 'snack', calories: 300, protein: 10.0, carbs: 28.0, fat: 17.0 },
    { name: '寿司(三文鱼)', category: 'snack', calories: 150, protein: 7.0, carbs: 24.0, fat: 2.5 },
    { name: '寿司(黄瓜卷)', category: 'snack', calories: 95, protein: 2.5, carbs: 20.0, fat: 0.5 },
    { name: '蛋炒饭', category: 'staple', calories: 188, protein: 5.5, carbs: 28.0, fat: 6.5 },
    { name: '炒面', category: 'staple', calories: 210, protein: 6.0, carbs: 32.0, fat: 7.0 },
    { name: '宫保鸡丁', category: 'meat', calories: 230, protein: 15.0, carbs: 12.0, fat: 14.0 },
    { name: '鱼香肉丝', category: 'meat', calories: 215, protein: 12.0, carbs: 15.0, fat: 13.0 },
    { name: '麻婆豆腐', category: 'meat', calories: 180, protein: 8.0, carbs: 10.0, fat: 12.0 },
    { name: '咕噜肉', category: 'meat', calories: 290, protein: 10.0, carbs: 22.0, fat: 18.0 },
    { name: '红烧肉', category: 'meat', calories: 350, protein: 12.0, carbs: 12.0, fat: 28.0 },
    { name: '水煮鱼', category: 'meat', calories: 160, protein: 15.0, carbs: 5.0, fat: 10.0 },
    { name: '麻辣香锅', category: 'meat', calories: 300, protein: 14.0, carbs: 12.0, fat: 22.0 },
    { name: '麻辣烫(不喝汤)', category: 'meat', calories: 80, protein: 6.0, carbs: 6.0, fat: 3.0 },
    { name: '麻辣烫(加麻酱)', category: 'meat', calories: 180, protein: 8.0, carbs: 10.0, fat: 12.0 },

    // ═══════════════════ 早餐类 ═══════════════════
    { name: '茶叶蛋', category: 'meat', calories: 78, protein: 7.0, carbs: 0.8, fat: 5.3 },
    { name: '水煮蛋', category: 'meat', calories: 72, protein: 6.3, carbs: 0.6, fat: 5.3 },
    { name: '煎鸡蛋', category: 'meat', calories: 196, protein: 11.0, carbs: 0.8, fat: 16.0 },
    { name: '鸡蛋羹', category: 'meat', calories: 55, protein: 5.0, carbs: 1.5, fat: 3.5 },
    { name: '菜包子', category: 'staple', calories: 160, protein: 5.0, carbs: 28.0, fat: 3.5 },
    { name: '煎饼果子', category: 'staple', calories: 350, protein: 10.0, carbs: 40.0, fat: 17.0 },
    { name: '饭团/粢饭', category: 'staple', calories: 280, protein: 6.0, carbs: 45.0, fat: 8.0 },
    { name: '肠粉', category: 'staple', calories: 110, protein: 3.5, carbs: 20.0, fat: 2.0 },
    { name: '豆腐脑(甜)', category: 'meat', calories: 35, protein: 2.0, carbs: 6.0, fat: 0.5 },
    { name: '豆腐脑(咸)', category: 'meat', calories: 50, protein: 3.0, carbs: 7.0, fat: 1.0 },
    { name: '牛奶麦片', category: 'dairy', calories: 180, protein: 6.0, carbs: 28.0, fat: 5.0 },
    { name: '欧包/全麦包', category: 'staple', calories: 220, protein: 8.0, carbs: 38.0, fat: 4.0 },

    // ═══════════════════ 饮品 ═══════════════════
    { name: '可乐', category: 'drink', calories: 42, protein: 0.0, carbs: 10.6, fat: 0.0 },
    { name: '雪碧', category: 'drink', calories: 41, protein: 0.0, carbs: 10.0, fat: 0.0 },
    { name: '橙汁', category: 'drink', calories: 45, protein: 0.7, carbs: 10.4, fat: 0.1 },
    { name: '苹果汁', category: 'drink', calories: 46, protein: 0.2, carbs: 11.0, fat: 0.1 },
    { name: '椰汁', category: 'drink', calories: 35, protein: 0.3, carbs: 8.0, fat: 0.1 },
    { name: '冰红茶', category: 'drink', calories: 37, protein: 0.0, carbs: 9.0, fat: 0.0 },
    { name: '珍珠奶茶', category: 'drink', calories: 80, protein: 1.0, carbs: 14.0, fat: 2.0 },
    { name: '王老吉/凉茶', category: 'drink', calories: 35, protein: 0.0, carbs: 8.5, fat: 0.0 },
    { name: '运动饮料', category: 'drink', calories: 26, protein: 0.0, carbs: 6.4, fat: 0.0 },
    { name: '红牛', category: 'drink', calories: 45, protein: 0.3, carbs: 11.0, fat: 0.0 },
    { name: '黑咖啡', category: 'drink', calories: 2, protein: 0.1, carbs: 0.3, fat: 0.0 },
    { name: '拿铁(全脂奶)', category: 'drink', calories: 56, protein: 2.5, carbs: 4.5, fat: 3.0 },
    { name: '卡布奇诺', category: 'drink', calories: 45, protein: 2.0, carbs: 4.0, fat: 2.5 },
    { name: '摩卡(加奶油)', category: 'drink', calories: 85, protein: 2.0, carbs: 8.0, fat: 5.0 },
    { name: '速溶咖啡(3合1)', category: 'drink', calories: 430, protein: 3.0, carbs: 75.0, fat: 12.0 },
    { name: '果粒橙', category: 'drink', calories: 43, protein: 0.3, carbs: 10.0, fat: 0.1 },
    { name: '养乐多', category: 'drink', calories: 280, protein: 1.2, carbs: 67.0, fat: 0.1 },

    // 酒类
    { name: '啤酒', category: 'drink', calories: 43, protein: 0.4, carbs: 3.6, fat: 0.0 },
    { name: '红酒/葡萄酒', category: 'drink', calories: 85, protein: 0.1, carbs: 2.6, fat: 0.0 },
    { name: '白酒(高度)', category: 'drink', calories: 300, protein: 0.0, carbs: 1.0, fat: 0.0 },
    { name: '黄酒', category: 'drink', calories: 85, protein: 0.5, carbs: 3.0, fat: 0.0 },
    { name: '清酒', category: 'drink', calories: 108, protein: 0.3, carbs: 5.0, fat: 0.0 },
    { name: '鸡尾酒', category: 'drink', calories: 180, protein: 0.2, carbs: 20.0, fat: 0.0 },

    // ═══════════════════ 食用油及调味品 ═══════════════════
    // 食用油
    { name: '菜籽油', category: 'condiment', calories: 899, protein: 0.0, carbs: 0.0, fat: 99.9 },
    { name: '花生油', category: 'condiment', calories: 899, protein: 0.0, carbs: 0.0, fat: 99.9 },
    { name: '橄榄油', category: 'condiment', calories: 899, protein: 0.0, carbs: 0.0, fat: 99.9 },
    { name: '芝麻油', category: 'condiment', calories: 899, protein: 0.0, carbs: 0.0, fat: 99.9 },
    { name: '猪油', category: 'condiment', calories: 897, protein: 0.0, carbs: 0.2, fat: 99.6 },
    { name: '黄油', category: 'condiment', calories: 717, protein: 0.8, carbs: 0.1, fat: 81.0 },

    // 调味酱料
    { name: '生抽/酱油', category: 'condiment', calories: 63, protein: 5.6, carbs: 10.0, fat: 0.1 },
    { name: '陈醋/米醋', category: 'condiment', calories: 30, protein: 0.5, carbs: 6.0, fat: 0.1 },
    { name: '蚝油', category: 'condiment', calories: 120, protein: 2.5, carbs: 24.0, fat: 1.0 },
    { name: '番茄酱/沙司', category: 'condiment', calories: 85, protein: 1.5, carbs: 18.0, fat: 0.2 },
    { name: '豆瓣酱', category: 'condiment', calories: 160, protein: 10.0, carbs: 20.0, fat: 6.0 },
    { name: '甜面酱', category: 'condiment', calories: 136, protein: 3.0, carbs: 27.0, fat: 1.5 },
    { name: '辣椒酱/老干妈', category: 'condiment', calories: 530, protein: 5.0, carbs: 15.0, fat: 50.0 },
    { name: '黄豆酱', category: 'condiment', calories: 140, protein: 8.0, carbs: 18.0, fat: 5.0 },
    { name: '芝麻酱', category: 'condiment', calories: 630, protein: 19.0, carbs: 22.0, fat: 53.0 },
    { name: '花生酱', category: 'condiment', calories: 600, protein: 22.0, carbs: 20.0, fat: 50.0 },
    { name: '沙拉酱(原味)', category: 'condiment', calories: 680, protein: 1.0, carbs: 3.0, fat: 73.0 },
    { name: '千岛酱', category: 'condiment', calories: 480, protein: 1.0, carbs: 12.0, fat: 47.0 },
    { name: '蜂蜜', category: 'condiment', calories: 321, protein: 0.4, carbs: 80.0, fat: 0.0 },
    { name: '白糖', category: 'condiment', calories: 400, protein: 0.0, carbs: 100.0, fat: 0.0 },
    { name: '红糖', category: 'condiment', calories: 389, protein: 0.7, carbs: 97.0, fat: 0.0 },
    { name: '冰糖', category: 'condiment', calories: 397, protein: 0.0, carbs: 99.0, fat: 0.0 },
    { name: '果酱(草莓)', category: 'condiment', calories: 260, protein: 0.4, carbs: 65.0, fat: 0.2 },
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
