// ================================================================
// ABBAYA NUTRITION CALCULATOR - INGREDIENTS DATABASE
// All values per 100g serving (cooked where applicable)
// Sources: USDA FoodData Central, nutritionvalue.org
// ================================================================

const ingredientNamesPt = {
  'tahini': 'Tahini',
  'chickpeas': 'Grão-de-bico',
  'lentils': 'Lentilhas',
  'black-beans': 'Feijão Preto',
  'kidney-beans': 'Feijão Vermelho',
  'edamame': 'Edamame',
  'peanuts': 'Amendoim',
  'green-peas': 'Ervilhas',
  'quinoa': 'Quinoa',
  'brown-rice': 'Arroz Integral',
  'oats': 'Aveia',
  'whole-wheat-bread': 'Pão Integral',
  'buckwheat': 'Trigo Sarraceno',
  'millet': 'Painço',
  'amaranth': 'Amaranto',
  'tofu': 'Tofu',
  'tempeh': 'Tempeh',
  'almonds': 'Amêndoas',
  'walnuts': 'Nozes',
  'cashews': 'Cajus',
  'sunflower-seeds': 'Sementes de Girassol',
  'pumpkin-seeds': 'Sementes de Abóbora',
  'chia-seeds': 'Sementes de Chia',
  'flaxseeds': 'Sementes de Linhaça',
  'hemp-seeds': 'Sementes de Cânhamo',
  'sesame-seeds': 'Sementes de Sésamo',
  'pistachios': 'Pistácios',
  'brazil-nuts': 'Castanha do Pará',
  'spinach': 'Espinafre',
  'kale': 'Couve',
  'broccoli': 'Brócolos',
  'bell-pepper-red': 'Pimento Vermelho',
  'sweet-potato': 'Batata-doce',
  'mushrooms': 'Cogumelos',
  'tomatoes': 'Tomates',
  'avocado': 'Abacate',
  'brussels-sprouts': 'Couves de Bruxelas',
  'cauliflower': 'Couve-flor',
  'asparagus': 'Espargos',
  'banana': 'Banana',
  'blueberries': 'Mirtilos',
  'orange': 'Laranja',
  'strawberries': 'Morangos',
  'kiwi': 'Kiwi',
  'mango': 'Manga',
  'dates': 'Tâmaras',
  'figs-dried': 'Figos Secos',
  'miso': 'Miso',
  'sauerkraut': 'Chucrute',
  'kimchi': 'Kimchi',
  'nutritional-yeast': 'Levedura Nutricional',
  'fortified-plant-milk': 'Leite Vegetal Fortificado',
  'olive-oil': 'Azeite',
  'coconut-oil': 'Óleo de Coco',
  'dark-chocolate': 'Chocolate Negro',
  'spirulina': 'Espirulina',
  'seaweed-nori': 'Alga Nori',
  'soy-milk': 'Leite de Soja',
  'peanut-butter': 'Manteiga de Amendoim',
  'hummus': 'Hummus'
};

const ingredients = [
  // ──────── LEGUMES ────────
  {
    id: 'chickpeas', name: 'Chickpeas (cooked)', category: 'legumes', emoji: '🫘',
    serving: '100g',
    nutrients: {
      calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6,
      histidine: 0.263, isoleucine: 0.393, leucine: 0.631, lysine: 0.594,
      methionine: 0.116, phenylalanine: 0.483, threonine: 0.334, tryptophan: 0.085, valine: 0.393,
      vitaminA: 1, vitaminC: 1.3, vitaminK: 4, vitaminB6: 0.139, folate: 172,
      vitaminE: 0.35, thiamin: 0.116, riboflavin: 0.063, niacin: 0.526,
      calcium: 49, iron: 2.89, magnesium: 48, zinc: 1.53,
      potassium: 291, phosphorus: 168, selenium: 3.7, copper: 0.352, manganese: 1.03,
      omega3: 0.04, omega6: 1.11, fiber: 7.6
    }
  },
  {
    id: 'lentils', name: 'Lentils (cooked)', category: 'legumes', emoji: '🟤',
    serving: '100g',
    nutrients: {
      calories: 116, protein: 9.0, carbs: 20.1, fat: 0.4,
      histidine: 0.254, isoleucine: 0.392, leucine: 0.654, lysine: 0.630,
      methionine: 0.077, phenylalanine: 0.445, threonine: 0.323, tryptophan: 0.081, valine: 0.448,
      vitaminA: 2, vitaminC: 1.5, vitaminK: 1.7, vitaminB6: 0.178, folate: 181,
      vitaminE: 0.11, thiamin: 0.169, riboflavin: 0.073, niacin: 1.06,
      calcium: 19, iron: 3.33, magnesium: 36, zinc: 1.27,
      potassium: 369, phosphorus: 180, selenium: 2.8, copper: 0.251, manganese: 0.494,
      omega3: 0.04, omega6: 0.17, fiber: 7.9
    }
  },
  {
    id: 'black-beans', name: 'Black Beans (cooked)', category: 'legumes', emoji: '⚫',
    serving: '100g',
    nutrients: {
      calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5,
      histidine: 0.244, isoleucine: 0.383, leucine: 0.698, lysine: 0.601,
      methionine: 0.130, phenylalanine: 0.471, threonine: 0.366, tryptophan: 0.103, valine: 0.457,
      vitaminA: 0, vitaminC: 0, vitaminK: 3.3, vitaminB6: 0.069, folate: 149,
      vitaminE: 0.08, thiamin: 0.244, riboflavin: 0.059, niacin: 0.505,
      calcium: 27, iron: 2.10, magnesium: 70, zinc: 1.12,
      potassium: 355, phosphorus: 140, selenium: 1.2, copper: 0.209, manganese: 0.444,
      omega3: 0.06, omega6: 0.18, fiber: 8.7
    }
  },
  {
    id: 'kidney-beans', name: 'Kidney Beans (cooked)', category: 'legumes', emoji: '🫘',
    serving: '100g',
    nutrients: {
      calories: 127, protein: 8.7, carbs: 22.8, fat: 0.5,
      histidine: 0.234, isoleucine: 0.370, leucine: 0.672, lysine: 0.578,
      methionine: 0.125, phenylalanine: 0.454, threonine: 0.353, tryptophan: 0.099, valine: 0.441,
      vitaminA: 0, vitaminC: 1.2, vitaminK: 8.4, vitaminB6: 0.12, folate: 130,
      vitaminE: 0.03, thiamin: 0.16, riboflavin: 0.058, niacin: 0.578,
      calcium: 28, iron: 2.94, magnesium: 45, zinc: 1.07,
      potassium: 403, phosphorus: 142, selenium: 1.2, copper: 0.242, manganese: 0.477,
      omega3: 0.08, omega6: 0.18, fiber: 6.4
    }
  },
  {
    id: 'edamame', name: 'Edamame', category: 'legumes', emoji: '🌿',
    serving: '100g',
    nutrients: {
      calories: 121, protein: 11.9, carbs: 8.9, fat: 5.2,
      histidine: 0.305, isoleucine: 0.552, leucine: 0.926, lysine: 0.762,
      methionine: 0.153, phenylalanine: 0.591, threonine: 0.493, tryptophan: 0.155, valine: 0.568,
      vitaminA: 9, vitaminC: 6.1, vitaminK: 26.7, vitaminB6: 0.065, folate: 311,
      vitaminE: 0.68, thiamin: 0.2, riboflavin: 0.155, niacin: 1.28,
      calcium: 63, iron: 2.27, magnesium: 64, zinc: 1.37,
      potassium: 436, phosphorus: 169, selenium: 0.8, copper: 0.345, manganese: 1.024,
      omega3: 0.36, omega6: 2.15, fiber: 5.2
    }
  },
  {
    id: 'peanuts', name: 'Peanuts (roasted)', category: 'legumes', emoji: '🥜',
    serving: '100g',
    nutrients: {
      calories: 599, protein: 28.0, carbs: 15.3, fat: 52.5,
      histidine: 0.651, isoleucine: 0.907, leucine: 1.672, lysine: 0.926,
      methionine: 0.317, phenylalanine: 1.337, threonine: 0.859, tryptophan: 0.250, valine: 1.082,
      vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 0.256, folate: 145,
      vitaminE: 6.93, thiamin: 0.438, riboflavin: 0.098, niacin: 13.525,
      calcium: 54, iron: 2.26, magnesium: 176, zinc: 3.31,
      potassium: 658, phosphorus: 358, selenium: 7.5, copper: 0.671, manganese: 2.083,
      omega3: 0.003, omega6: 15.69, fiber: 8.0
    }
  },
  {
    id: 'green-peas', name: 'Green Peas (cooked)', category: 'legumes', emoji: '🟢',
    serving: '100g',
    nutrients: {
      calories: 84, protein: 5.4, carbs: 15.6, fat: 0.2,
      histidine: 0.107, isoleucine: 0.195, leucine: 0.323, lysine: 0.317,
      methionine: 0.082, phenylalanine: 0.200, threonine: 0.203, tryptophan: 0.037, valine: 0.235,
      vitaminA: 38, vitaminC: 14.2, vitaminK: 25.9, vitaminB6: 0.216, folate: 63,
      vitaminE: 0.39, thiamin: 0.259, riboflavin: 0.149, niacin: 2.021,
      calcium: 27, iron: 1.54, magnesium: 39, zinc: 1.19,
      potassium: 271, phosphorus: 117, selenium: 1.9, copper: 0.173, manganese: 0.525,
      omega3: 0.03, omega6: 0.09, fiber: 5.5
    }
  },

  // ──────── GRAINS ────────
  {
    id: 'quinoa', name: 'Quinoa (cooked)', category: 'grains', emoji: '🌾',
    serving: '100g',
    nutrients: {
      calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9,
      histidine: 0.141, isoleucine: 0.181, leucine: 0.298, lysine: 0.267,
      methionine: 0.104, phenylalanine: 0.186, threonine: 0.150, tryptophan: 0.049, valine: 0.207,
      vitaminA: 1, vitaminC: 0, vitaminK: 0, vitaminB6: 0.123, folate: 42,
      vitaminE: 0.63, thiamin: 0.107, riboflavin: 0.110, niacin: 0.412,
      calcium: 17, iron: 1.49, magnesium: 64, zinc: 1.09,
      potassium: 172, phosphorus: 152, selenium: 2.8, copper: 0.192, manganese: 0.631,
      omega3: 0.09, omega6: 0.83, fiber: 2.8
    }
  },
  {
    id: 'brown-rice', name: 'Brown Rice (cooked)', category: 'grains', emoji: '🍚',
    serving: '100g',
    nutrients: {
      calories: 123, protein: 2.7, carbs: 25.6, fat: 1.0,
      histidine: 0.066, isoleucine: 0.105, leucine: 0.209, lysine: 0.097,
      methionine: 0.058, phenylalanine: 0.132, threonine: 0.092, tryptophan: 0.031, valine: 0.149,
      vitaminA: 0, vitaminC: 0, vitaminK: 0.3, vitaminB6: 0.145, folate: 4,
      vitaminE: 0.17, thiamin: 0.102, riboflavin: 0.012, niacin: 1.528,
      calcium: 10, iron: 0.56, magnesium: 39, zinc: 0.63,
      potassium: 86, phosphorus: 103, selenium: 5.8, copper: 0.081, manganese: 0.905,
      omega3: 0.01, omega6: 0.34, fiber: 1.6
    }
  },
  {
    id: 'oats', name: 'Oats (dry)', category: 'grains', emoji: '🥣',
    serving: '100g',
    nutrients: {
      calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9,
      histidine: 0.405, isoleucine: 0.694, leucine: 1.284, lysine: 0.701,
      methionine: 0.312, phenylalanine: 0.895, threonine: 0.575, tryptophan: 0.234, valine: 0.937,
      vitaminA: 0, vitaminC: 0, vitaminK: 2, vitaminB6: 0.119, folate: 56,
      vitaminE: 0.42, thiamin: 0.763, riboflavin: 0.139, niacin: 0.961,
      calcium: 54, iron: 4.72, magnesium: 177, zinc: 3.97,
      potassium: 429, phosphorus: 523, selenium: 28.9, copper: 0.391, manganese: 4.916,
      omega3: 0.11, omega6: 2.42, fiber: 10.6
    }
  },
  {
    id: 'whole-wheat-bread', name: 'Whole Wheat Bread', category: 'grains', emoji: '🍞',
    serving: '100g',
    nutrients: {
      calories: 252, protein: 12.5, carbs: 43.1, fat: 3.5,
      histidine: 0.285, isoleucine: 0.435, leucine: 0.834, lysine: 0.302,
      methionine: 0.199, phenylalanine: 0.587, threonine: 0.334, tryptophan: 0.148, valine: 0.518,
      vitaminA: 0, vitaminC: 0, vitaminK: 7.8, vitaminB6: 0.215, folate: 42,
      vitaminE: 0.38, thiamin: 0.397, riboflavin: 0.165, niacin: 4.438,
      calcium: 107, iron: 2.56, magnesium: 75, zinc: 1.77,
      potassium: 254, phosphorus: 212, selenium: 40.3, copper: 0.237, manganese: 2.181,
      omega3: 0.05, omega6: 1.20, fiber: 6.8
    }
  },
  {
    id: 'buckwheat', name: 'Buckwheat (cooked)', category: 'grains', emoji: '🔺',
    serving: '100g',
    nutrients: {
      calories: 92, protein: 3.4, carbs: 19.9, fat: 0.6,
      histidine: 0.087, isoleucine: 0.130, leucine: 0.221, lysine: 0.182,
      methionine: 0.056, phenylalanine: 0.142, threonine: 0.130, tryptophan: 0.051, valine: 0.168,
      vitaminA: 0, vitaminC: 0, vitaminK: 1.1, vitaminB6: 0.077, folate: 14,
      vitaminE: 0.1, thiamin: 0.04, riboflavin: 0.039, niacin: 0.94,
      calcium: 7, iron: 0.8, magnesium: 51, zinc: 0.61,
      potassium: 88, phosphorus: 70, selenium: 2.2, copper: 0.147, manganese: 0.40,
      omega3: 0.03, omega6: 0.22, fiber: 2.7
    }
  },
  {
    id: 'millet', name: 'Millet (cooked)', category: 'grains', emoji: '🌾',
    serving: '100g',
    nutrients: {
      calories: 119, protein: 3.5, carbs: 23.7, fat: 1.0,
      histidine: 0.079, isoleucine: 0.148, leucine: 0.436, lysine: 0.063,
      methionine: 0.082, phenylalanine: 0.189, threonine: 0.119, tryptophan: 0.046, valine: 0.186,
      vitaminA: 0, vitaminC: 0, vitaminK: 0.3, vitaminB6: 0.108, folate: 19,
      vitaminE: 0.02, thiamin: 0.106, riboflavin: 0.082, niacin: 1.33,
      calcium: 3, iron: 0.63, magnesium: 44, zinc: 0.91,
      potassium: 62, phosphorus: 100, selenium: 0.8, copper: 0.161, manganese: 0.272,
      omega3: 0.02, omega6: 0.48, fiber: 1.3
    }
  },
  {
    id: 'amaranth', name: 'Amaranth (cooked)', category: 'grains', emoji: '🌿',
    serving: '100g',
    nutrients: {
      calories: 102, protein: 3.8, carbs: 18.7, fat: 1.6,
      histidine: 0.115, isoleucine: 0.139, leucine: 0.224, lysine: 0.207,
      methionine: 0.070, phenylalanine: 0.154, threonine: 0.127, tryptophan: 0.041, valine: 0.155,
      vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 0.113, folate: 22,
      vitaminE: 0.19, thiamin: 0.015, riboflavin: 0.022, niacin: 0.235,
      calcium: 47, iron: 2.1, magnesium: 65, zinc: 0.86,
      potassium: 135, phosphorus: 148, selenium: 6.0, copper: 0.149, manganese: 0.854,
      omega3: 0.04, omega6: 0.70, fiber: 2.1
    }
  },

  // ──────── NUTS & SEEDS ────────
  {
    id: 'tahini', name: 'Tahini (Sesame Paste)', category: 'nuts-seeds', emoji: '⭐',
    serving: '100g',
    nutrients: {
      calories: 595, protein: 17.0, carbs: 21.2, fat: 53.8,
      histidine: 0.447, isoleucine: 0.638, leucine: 1.150, lysine: 0.468,
      methionine: 0.507, phenylalanine: 0.780, threonine: 0.617, tryptophan: 0.282, valine: 0.816,
      vitaminA: 3, vitaminC: 0, vitaminK: 0, vitaminB6: 0.149, folate: 98,
      vitaminE: 0.25, thiamin: 1.220, riboflavin: 0.247, niacin: 5.450,
      calcium: 426, iron: 8.95, magnesium: 95, zinc: 4.62,
      potassium: 414, phosphorus: 732, selenium: 34.4, copper: 1.614, manganese: 1.456,
      omega3: 0.41, omega6: 21.37, fiber: 9.3
    }
  },
  {
    id: 'almonds', name: 'Almonds', category: 'nuts-seeds', emoji: '🌰',
    serving: '100g',
    nutrients: {
      calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9,
      histidine: 0.539, isoleucine: 0.702, leucine: 1.461, lysine: 0.568,
      methionine: 0.151, phenylalanine: 1.120, threonine: 0.598, tryptophan: 0.214, valine: 0.855,
      vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 0.143, folate: 44,
      vitaminE: 25.63, thiamin: 0.205, riboflavin: 1.138, niacin: 3.618,
      calcium: 269, iron: 3.71, magnesium: 270, zinc: 3.12,
      potassium: 733, phosphorus: 481, selenium: 4.1, copper: 1.031, manganese: 2.179,
      omega3: 0.003, omega6: 12.32, fiber: 12.5
    }
  },
  {
    id: 'walnuts', name: 'Walnuts', category: 'nuts-seeds', emoji: '🧠',
    serving: '100g',
    nutrients: {
      calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2,
      histidine: 0.391, isoleucine: 0.625, leucine: 1.170, lysine: 0.424,
      methionine: 0.236, phenylalanine: 0.711, threonine: 0.596, tryptophan: 0.170, valine: 0.753,
      vitaminA: 1, vitaminC: 1.3, vitaminK: 2.7, vitaminB6: 0.537, folate: 98,
      vitaminE: 0.7, thiamin: 0.341, riboflavin: 0.150, niacin: 1.125,
      calcium: 98, iron: 2.91, magnesium: 158, zinc: 3.09,
      potassium: 441, phosphorus: 346, selenium: 4.9, copper: 1.586, manganese: 3.414,
      omega3: 9.08, omega6: 38.09, fiber: 6.7
    }
  },
  {
    id: 'cashews', name: 'Cashews', category: 'nuts-seeds', emoji: '🥜',
    serving: '100g',
    nutrients: {
      calories: 553, protein: 18.2, carbs: 30.2, fat: 43.9,
      histidine: 0.456, isoleucine: 0.789, leucine: 1.472, lysine: 0.928,
      methionine: 0.362, phenylalanine: 0.932, threonine: 0.688, tryptophan: 0.287, valine: 1.094,
      vitaminA: 0, vitaminC: 0.5, vitaminK: 34.1, vitaminB6: 0.417, folate: 25,
      vitaminE: 0.90, thiamin: 0.423, riboflavin: 0.058, niacin: 1.062,
      calcium: 37, iron: 6.68, magnesium: 292, zinc: 5.78,
      potassium: 660, phosphorus: 593, selenium: 19.9, copper: 2.195, manganese: 1.655,
      omega3: 0.06, omega6: 7.78, fiber: 3.3
    }
  },
  {
    id: 'sunflower-seeds', name: 'Sunflower Seeds', category: 'nuts-seeds', emoji: '🌻',
    serving: '100g',
    nutrients: {
      calories: 584, protein: 20.8, carbs: 20.0, fat: 51.5,
      histidine: 0.632, isoleucine: 0.938, leucine: 1.659, lysine: 0.937,
      methionine: 0.494, phenylalanine: 1.169, threonine: 0.926, tryptophan: 0.348, valine: 1.315,
      vitaminA: 3, vitaminC: 1.4, vitaminK: 2.7, vitaminB6: 1.345, folate: 227,
      vitaminE: 35.17, thiamin: 1.480, riboflavin: 0.355, niacin: 8.335,
      calcium: 78, iron: 5.25, magnesium: 325, zinc: 5.00,
      potassium: 645, phosphorus: 660, selenium: 53.0, copper: 1.800, manganese: 1.950,
      omega3: 0.07, omega6: 23.05, fiber: 8.6
    }
  },
  {
    id: 'pumpkin-seeds', name: 'Pumpkin Seeds', category: 'nuts-seeds', emoji: '🎃',
    serving: '100g',
    nutrients: {
      calories: 559, protein: 30.2, carbs: 10.7, fat: 49.1,
      histidine: 0.780, isoleucine: 1.281, leucine: 2.419, lysine: 1.236,
      methionine: 0.603, phenylalanine: 1.733, threonine: 0.998, tryptophan: 0.576, valine: 1.579,
      vitaminA: 1, vitaminC: 1.9, vitaminK: 7.3, vitaminB6: 0.143, folate: 58,
      vitaminE: 2.18, thiamin: 0.273, riboflavin: 0.153, niacin: 4.987,
      calcium: 46, iron: 8.82, magnesium: 592, zinc: 7.81,
      potassium: 809, phosphorus: 1233, selenium: 9.4, copper: 1.343, manganese: 4.543,
      omega3: 0.12, omega6: 20.71, fiber: 6.0
    }
  },
  {
    id: 'chia-seeds', name: 'Chia Seeds', category: 'nuts-seeds', emoji: '⚫',
    serving: '100g',
    nutrients: {
      calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7,
      histidine: 0.531, isoleucine: 0.801, leucine: 1.371, lysine: 0.970,
      methionine: 0.588, phenylalanine: 1.016, threonine: 0.709, tryptophan: 0.436, valine: 0.950,
      vitaminA: 0, vitaminC: 1.6, vitaminK: 0, vitaminB6: 0.0, folate: 49,
      vitaminE: 0.50, thiamin: 0.620, riboflavin: 0.170, niacin: 8.830,
      calcium: 631, iron: 7.72, magnesium: 335, zinc: 4.58,
      potassium: 407, phosphorus: 860, selenium: 55.2, copper: 0.924, manganese: 2.723,
      omega3: 17.83, omega6: 5.84, fiber: 34.4
    }
  },
  {
    id: 'flaxseeds', name: 'Flaxseeds', category: 'nuts-seeds', emoji: '🟫',
    serving: '100g',
    nutrients: {
      calories: 534, protein: 18.3, carbs: 28.9, fat: 42.2,
      histidine: 0.471, isoleucine: 0.896, leucine: 1.235, lysine: 0.862,
      methionine: 0.370, phenylalanine: 0.957, threonine: 0.766, tryptophan: 0.297, valine: 1.072,
      vitaminA: 0, vitaminC: 0.6, vitaminK: 4.3, vitaminB6: 0.473, folate: 87,
      vitaminE: 0.31, thiamin: 1.644, riboflavin: 0.161, niacin: 3.08,
      calcium: 255, iron: 5.73, magnesium: 392, zinc: 4.34,
      potassium: 813, phosphorus: 642, selenium: 25.4, copper: 1.220, manganese: 2.482,
      omega3: 22.81, omega6: 5.91, fiber: 27.3
    }
  },
  {
    id: 'hemp-seeds', name: 'Hemp Seeds', category: 'nuts-seeds', emoji: '💚',
    serving: '100g',
    nutrients: {
      calories: 553, protein: 31.6, carbs: 8.7, fat: 48.8,
      histidine: 0.920, isoleucine: 1.286, leucine: 2.163, lysine: 1.276,
      methionine: 0.933, phenylalanine: 1.447, threonine: 1.265, tryptophan: 0.399, valine: 1.607,
      vitaminA: 3, vitaminC: 0.5, vitaminK: 0, vitaminB6: 0.6, folate: 110,
      vitaminE: 0.80, thiamin: 1.275, riboflavin: 0.285, niacin: 9.200,
      calcium: 70, iron: 7.95, magnesium: 700, zinc: 9.90,
      potassium: 1200, phosphorus: 1650, selenium: 0.6, copper: 1.600, manganese: 7.600,
      omega3: 8.68, omega6: 28.70, fiber: 4.0
    }
  },
  {
    id: 'sesame-seeds', name: 'Sesame Seeds', category: 'nuts-seeds', emoji: '🔸',
    serving: '100g',
    nutrients: {
      calories: 573, protein: 17.7, carbs: 23.4, fat: 49.7,
      histidine: 0.522, isoleucine: 0.764, leucine: 1.358, lysine: 0.569,
      methionine: 0.586, phenylalanine: 0.940, threonine: 0.736, tryptophan: 0.388, valine: 0.990,
      vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 0.790, folate: 97,
      vitaminE: 0.25, thiamin: 0.791, riboflavin: 0.247, niacin: 4.515,
      calcium: 975, iron: 14.55, magnesium: 351, zinc: 7.75,
      potassium: 468, phosphorus: 629, selenium: 34.4, copper: 4.082, manganese: 2.460,
      omega3: 0.38, omega6: 21.37, fiber: 11.8
    }
  },
  {
    id: 'pistachios', name: 'Pistachios', category: 'nuts-seeds', emoji: '💚',
    serving: '100g',
    nutrients: {
      calories: 560, protein: 20.2, carbs: 27.2, fat: 45.3,
      histidine: 0.512, isoleucine: 0.891, leucine: 1.600, lysine: 1.142,
      methionine: 0.334, phenylalanine: 1.091, threonine: 0.684, tryptophan: 0.251, valine: 1.230,
      vitaminA: 26, vitaminC: 5.6, vitaminK: 13.2, vitaminB6: 1.700, folate: 51,
      vitaminE: 2.86, thiamin: 0.870, riboflavin: 0.160, niacin: 1.300,
      calcium: 105, iron: 3.92, magnesium: 121, zinc: 2.20,
      potassium: 1025, phosphorus: 490, selenium: 7.0, copper: 1.300, manganese: 1.200,
      omega3: 0.25, omega6: 13.20, fiber: 10.6
    }
  },
  {
    id: 'brazil-nuts', name: 'Brazil Nuts', category: 'nuts-seeds', emoji: '🌰',
    serving: '100g',
    nutrients: {
      calories: 659, protein: 14.3, carbs: 11.7, fat: 67.1,
      histidine: 0.410, isoleucine: 0.516, leucine: 1.155, lysine: 0.492,
      methionine: 1.008, phenylalanine: 0.630, threonine: 0.362, tryptophan: 0.141, valine: 0.756,
      vitaminA: 0, vitaminC: 0.7, vitaminK: 0, vitaminB6: 0.101, folate: 22,
      vitaminE: 5.65, thiamin: 0.617, riboflavin: 0.035, niacin: 0.295,
      calcium: 160, iron: 2.43, magnesium: 376, zinc: 4.06,
      potassium: 659, phosphorus: 725, selenium: 1917.0, copper: 1.743, manganese: 1.223,
      omega3: 0.02, omega6: 20.58, fiber: 7.5
    }
  },

  // ──────── SOY PRODUCTS ────────
  {
    id: 'tofu', name: 'Tofu (firm)', category: 'legumes', emoji: '🧊',
    serving: '100g',
    nutrients: {
      calories: 144, protein: 17.3, carbs: 2.8, fat: 8.7,
      histidine: 0.433, isoleucine: 0.833, leucine: 1.291, lysine: 1.024,
      methionine: 0.214, phenylalanine: 0.826, threonine: 0.692, tryptophan: 0.237, valine: 0.839,
      vitaminA: 0, vitaminC: 0.2, vitaminK: 2.4, vitaminB6: 0.092, folate: 29,
      vitaminE: 0.01, thiamin: 0.155, riboflavin: 0.103, niacin: 0.381,
      calcium: 350, iron: 5.36, magnesium: 58, zinc: 1.57,
      potassium: 237, phosphorus: 190, selenium: 17.4, copper: 0.378, manganese: 1.176,
      omega3: 0.46, omega6: 4.47, fiber: 2.3
    }
  },
  {
    id: 'tempeh', name: 'Tempeh', category: 'fermented', emoji: '🟫',
    serving: '100g',
    nutrients: {
      calories: 192, protein: 20.3, carbs: 7.6, fat: 10.8,
      histidine: 0.515, isoleucine: 0.928, leucine: 1.553, lysine: 1.025,
      methionine: 0.243, phenylalanine: 0.992, threonine: 0.781, tryptophan: 0.282, valine: 0.949,
      vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 0.215, folate: 24,
      vitaminE: 0.0, thiamin: 0.078, riboflavin: 0.358, niacin: 2.640,
      calcium: 111, iron: 2.73, magnesium: 81, zinc: 1.14,
      potassium: 412, phosphorus: 266, selenium: 0.0, copper: 0.564, manganese: 1.305,
      omega3: 0.14, omega6: 4.65, fiber: 0.0
    }
  },

  // ──────── VEGETABLES ────────
  {
    id: 'spinach', name: 'Spinach (cooked)', category: 'vegetables', emoji: '🥬',
    serving: '100g',
    nutrients: {
      calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4,
      histidine: 0.064, isoleucine: 0.147, leucine: 0.223, lysine: 0.174, methionine: 0.053,
      phenylalanine: 0.129, threonine: 0.122, tryptophan: 0.039, valine: 0.161,
      vitaminA: 524, vitaminC: 9.8, vitaminK: 493.5, vitaminB6: 0.242, folate: 146,
      vitaminE: 2.08, thiamin: 0.095, riboflavin: 0.236, niacin: 0.490,
      calcium: 136, iron: 3.57, magnesium: 87, zinc: 0.76,
      potassium: 466, phosphorus: 56, selenium: 1.5, copper: 0.174, manganese: 0.935,
      omega3: 0.10, omega6: 0.03, fiber: 2.4
    }
  },
  {
    id: 'kale', name: 'Kale (cooked)', category: 'vegetables', emoji: '🥬',
    serving: '100g',
    nutrients: {
      calories: 28, protein: 1.9, carbs: 5.6, fat: 0.4,
      histidine: 0.032, isoleucine: 0.088, leucine: 0.104, lysine: 0.080, methionine: 0.017,
      phenylalanine: 0.072, threonine: 0.065, tryptophan: 0.019, valine: 0.074,
      vitaminA: 681, vitaminC: 41.0, vitaminK: 817.0, vitaminB6: 0.138, folate: 13,
      vitaminE: 0.85, thiamin: 0.053, riboflavin: 0.070, niacin: 0.500,
      calcium: 72, iron: 1.0, magnesium: 18, zinc: 0.24,
      potassium: 228, phosphorus: 28, selenium: 0.9, copper: 0.156, manganese: 0.416,
      omega3: 0.10, omega6: 0.06, fiber: 2.0
    }
  },
  {
    id: 'broccoli', name: 'Broccoli (cooked)', category: 'vegetables', emoji: '🥦',
    serving: '100g',
    nutrients: {
      calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4,
      histidine: 0.048, isoleucine: 0.079, leucine: 0.108, lysine: 0.107, methionine: 0.031,
      phenylalanine: 0.077, threonine: 0.076, tryptophan: 0.029, valine: 0.105,
      vitaminA: 77, vitaminC: 64.9, vitaminK: 141.1, vitaminB6: 0.200, folate: 108,
      vitaminE: 1.45, thiamin: 0.063, riboflavin: 0.123, niacin: 0.553,
      calcium: 40, iron: 0.67, magnesium: 21, zinc: 0.45,
      potassium: 293, phosphorus: 67, selenium: 1.6, copper: 0.061, manganese: 0.194,
      omega3: 0.05, omega6: 0.02, fiber: 3.3
    }
  },
  {
    id: 'bell-pepper-red', name: 'Red Bell Pepper', category: 'vegetables', emoji: '🌶️',
    serving: '100g',
    nutrients: {
      calories: 31, protein: 1.0, carbs: 6.0, fat: 0.3,
      histidine: 0.014, isoleucine: 0.024, leucine: 0.042, lysine: 0.036, methionine: 0.009,
      phenylalanine: 0.025, threonine: 0.029, tryptophan: 0.012, valine: 0.035,
      vitaminA: 157, vitaminC: 127.7, vitaminK: 4.9, vitaminB6: 0.291, folate: 46,
      vitaminE: 1.58, thiamin: 0.054, riboflavin: 0.085, niacin: 0.979,
      calcium: 7, iron: 0.43, magnesium: 12, zinc: 0.25,
      potassium: 211, phosphorus: 26, selenium: 0.1, copper: 0.017, manganese: 0.112,
      omega3: 0.03, omega6: 0.05, fiber: 2.1
    }
  },
    // ──── SWEET POTATO (continuing) ────
  {
    id: 'sweet-potato', name: 'Sweet Potato (baked)', category: 'vegetables', emoji: '🍠',
    serving: '100g',
    nutrients: {
      calories: 90, protein: 2.0, carbs: 20.7, fat: 0.2,
      histidine: 0.030, isoleucine: 0.055, leucine: 0.083, lysine: 0.056, methionine: 0.024,
      phenylalanine: 0.073, threonine: 0.055, tryptophan: 0.031, valine: 0.072,
      vitaminA: 961, vitaminC: 19.6, vitaminK: 2.3, vitaminB6: 0.286, folate: 6,
      vitaminE: 0.71, thiamin: 0.107, riboflavin: 0.106, niacin: 1.487,
      calcium: 38, iron: 0.69, magnesium: 27, zinc: 0.32,
      potassium: 475, phosphorus: 54, selenium: 0.2, copper: 0.161, manganese: 0.497,
      omega3: 0.01, omega6: 0.06, fiber: 3.3
    }
  },
  {
    id: 'mushrooms', name: 'Mushrooms (cooked)', category: 'vegetables', emoji: '🍄',
    serving: '100g',
    nutrients: {
      calories: 28, protein: 3.6, carbs: 4.4, fat: 0.5,
      histidine: 0.084, isoleucine: 0.076, leucine: 0.120, lysine: 0.095, methionine: 0.031,
      phenylalanine: 0.085, threonine: 0.092, tryptophan: 0.035, valine: 0.110,
      vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 0.097, folate: 18,
      vitaminE: 0.05, thiamin: 0.082, riboflavin: 0.402, niacin: 4.460,
      calcium: 6, iron: 1.74, magnesium: 12, zinc: 0.87,
      potassium: 356, phosphorus: 105, selenium: 11.9, copper: 0.504, manganese: 0.082,
      omega3: 0.0, omega6: 0.16, fiber: 2.2
    }
  },
  {
    id: 'tomatoes', name: 'Tomatoes (raw)', category: 'vegetables', emoji: '🍅',
    serving: '100g',
    nutrients: {
      calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2,
      histidine: 0.014, isoleucine: 0.018, leucine: 0.025, lysine: 0.027, methionine: 0.006,
      phenylalanine: 0.027, threonine: 0.027, tryptophan: 0.006, valine: 0.018,
      vitaminA: 42, vitaminC: 13.7, vitaminK: 7.9, vitaminB6: 0.080, folate: 15,
      vitaminE: 0.54, thiamin: 0.037, riboflavin: 0.019, niacin: 0.594,
      calcium: 10, iron: 0.27, magnesium: 11, zinc: 0.17,
      potassium: 237, phosphorus: 24, selenium: 0.0, copper: 0.059, manganese: 0.114,
      omega3: 0.003, omega6: 0.08, fiber: 1.2
    }
  },
  {
    id: 'avocado', name: 'Avocado', category: 'vegetables', emoji: '🥑',
    serving: '100g',
    nutrients: {
      calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7,
      histidine: 0.049, isoleucine: 0.084, leucine: 0.143, lysine: 0.132, methionine: 0.038,
      phenylalanine: 0.097, threonine: 0.073, tryptophan: 0.025, valine: 0.107,
      vitaminA: 7, vitaminC: 10.0, vitaminK: 21.0, vitaminB6: 0.257, folate: 81,
      vitaminE: 2.07, thiamin: 0.067, riboflavin: 0.130, niacin: 1.738,
      calcium: 12, iron: 0.55, magnesium: 29, zinc: 0.64,
      potassium: 485, phosphorus: 52, selenium: 0.4, copper: 0.190, manganese: 0.142,
      omega3: 0.11, omega6: 1.69, fiber: 6.7
    }
  },
  {
    id: 'brussels-sprouts', name: 'Brussels Sprouts (cooked)', category: 'vegetables', emoji: '🟢',
    serving: '100g',
    nutrients: {
      calories: 36, protein: 2.6, carbs: 7.1, fat: 0.5,
      histidine: 0.054, isoleucine: 0.098, leucine: 0.129, lysine: 0.106, methionine: 0.024,
      phenylalanine: 0.072, threonine: 0.078, tryptophan: 0.028, valine: 0.104,
      vitaminA: 50, vitaminC: 62.0, vitaminK: 140.3, vitaminB6: 0.180, folate: 60,
      vitaminE: 0.43, thiamin: 0.078, riboflavin: 0.069, niacin: 0.557,
      calcium: 36, iron: 1.20, magnesium: 20, zinc: 0.33,
      potassium: 317, phosphorus: 56, selenium: 1.5, copper: 0.070, manganese: 0.247,
      omega3: 0.10, omega6: 0.07, fiber: 2.6
    }
  },
  {
    id: 'cauliflower', name: 'Cauliflower (cooked)', category: 'vegetables', emoji: '⚪',
    serving: '100g',
    nutrients: {
      calories: 23, protein: 1.8, carbs: 4.1, fat: 0.5,
      histidine: 0.037, isoleucine: 0.064, leucine: 0.094, lysine: 0.099, methionine: 0.023,
      phenylalanine: 0.060, threonine: 0.060, tryptophan: 0.023, valine: 0.082,
      vitaminA: 1, vitaminC: 44.3, vitaminK: 13.8, vitaminB6: 0.173, folate: 44,
      vitaminE: 0.07, thiamin: 0.042, riboflavin: 0.052, niacin: 0.410,
      calcium: 16, iron: 0.32, magnesium: 9, zinc: 0.17,
      potassium: 142, phosphorus: 32, selenium: 0.6, copper: 0.027, manganese: 0.132,
      omega3: 0.02, omega6: 0.01, fiber: 2.3
    }
  },
  {
    id: 'asparagus', name: 'Asparagus (cooked)', category: 'vegetables', emoji: '🌿',
    serving: '100g',
    nutrients: {
      calories: 22, protein: 2.4, carbs: 4.1, fat: 0.2,
      histidine: 0.049, isoleucine: 0.075, leucine: 0.105, lysine: 0.104, methionine: 0.026,
      phenylalanine: 0.071, threonine: 0.067, tryptophan: 0.024, valine: 0.097,
      vitaminA: 50, vitaminC: 7.7, vitaminK: 50.6, vitaminB6: 0.079, folate: 149,
      vitaminE: 1.5, thiamin: 0.162, riboflavin: 0.139, niacin: 1.084,
      calcium: 23, iron: 0.91, magnesium: 14, zinc: 0.60,
      potassium: 224, phosphorus: 54, selenium: 6.1, copper: 0.165, manganese: 0.210,
      omega3: 0.02, omega6: 0.03, fiber: 2.0
    }
  },

  // ──────── FRUITS ────────
  {
    id: 'banana', name: 'Banana', category: 'fruits', emoji: '🍌',
    serving: '100g',
    nutrients: {
      calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3,
      histidine: 0.077, isoleucine: 0.028, leucine: 0.068, lysine: 0.050, methionine: 0.008,
      phenylalanine: 0.049, threonine: 0.028, tryptophan: 0.009, valine: 0.047,
      vitaminA: 3, vitaminC: 8.7, vitaminK: 0.5, vitaminB6: 0.367, folate: 20,
      vitaminE: 0.10, thiamin: 0.031, riboflavin: 0.073, niacin: 0.665,
      calcium: 5, iron: 0.26, magnesium: 27, zinc: 0.15,
      potassium: 358, phosphorus: 22, selenium: 1.0, copper: 0.078, manganese: 0.270,
      omega3: 0.03, omega6: 0.05, fiber: 2.6
    }
  },
  {
    id: 'blueberries', name: 'Blueberries', category: 'fruits', emoji: '🫐',
    serving: '100g',
    nutrients: {
      calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3,
      histidine: 0.012, isoleucine: 0.023, leucine: 0.044, lysine: 0.013, methionine: 0.012,
      phenylalanine: 0.026, threonine: 0.020, tryptophan: 0.003, valine: 0.031,
      vitaminA: 3, vitaminC: 9.7, vitaminK: 19.3, vitaminB6: 0.052, folate: 6,
      vitaminE: 0.57, thiamin: 0.037, riboflavin: 0.041, niacin: 0.418,
      calcium: 6, iron: 0.28, magnesium: 6, zinc: 0.16,
      potassium: 77, phosphorus: 12, selenium: 0.1, copper: 0.057, manganese: 0.336,
      omega3: 0.06, omega6: 0.09, fiber: 2.4
    }
  },
  {
    id: 'orange', name: 'Orange', category: 'fruits', emoji: '🍊',
    serving: '100g',
    nutrients: {
      calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1,
      histidine: 0.018, isoleucine: 0.025, leucine: 0.023, lysine: 0.047, methionine: 0.020,
      phenylalanine: 0.031, threonine: 0.015, tryptophan: 0.009, valine: 0.040,
      vitaminA: 11, vitaminC: 53.2, vitaminK: 0, vitaminB6: 0.060, folate: 30,
      vitaminE: 0.18, thiamin: 0.087, riboflavin: 0.040, niacin: 0.282,
      calcium: 40, iron: 0.10, magnesium: 10, zinc: 0.07,
      potassium: 181, phosphorus: 14, selenium: 0.5, copper: 0.045, manganese: 0.025,
      omega3: 0.01, omega6: 0.02, fiber: 2.4
    }
  },
  {
    id: 'strawberries', name: 'Strawberries', category: 'fruits', emoji: '🍓',
    serving: '100g',
    nutrients: {
      calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3,
      histidine: 0.008, isoleucine: 0.016, leucine: 0.034, lysine: 0.026, methionine: 0.002,
      phenylalanine: 0.019, threonine: 0.020, tryptophan: 0.008, valine: 0.019,
      vitaminA: 1, vitaminC: 58.8, vitaminK: 2.2, vitaminB6: 0.047, folate: 24,
      vitaminE: 0.29, thiamin: 0.024, riboflavin: 0.022, niacin: 0.386,
      calcium: 16, iron: 0.41, magnesium: 13, zinc: 0.14,
      potassium: 153, phosphorus: 24, selenium: 0.4, copper: 0.048, manganese: 0.386,
      omega3: 0.07, omega6: 0.09, fiber: 2.0
    }
  },
  {
    id: 'kiwi', name: 'Kiwi', category: 'fruits', emoji: '🥝',
    serving: '100g',
    nutrients: {
      calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5,
      histidine: 0.027, isoleucine: 0.051, leucine: 0.066, lysine: 0.054, methionine: 0.024,
      phenylalanine: 0.044, threonine: 0.047, tryptophan: 0.015, valine: 0.057,
      vitaminA: 4, vitaminC: 92.7, vitaminK: 40.3, vitaminB6: 0.063, folate: 25,
      vitaminE: 1.46, thiamin: 0.027, riboflavin: 0.025, niacin: 0.341,
      calcium: 34, iron: 0.31, magnesium: 17, zinc: 0.14,
      potassium: 312, phosphorus: 34, selenium: 0.2, copper: 0.130, manganese: 0.098,
      omega3: 0.04, omega6: 0.25, fiber: 3.0
    }
  },
  {
    id: 'mango', name: 'Mango', category: 'fruits', emoji: '🥭',
    serving: '100g',
    nutrients: {
      calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4,
      histidine: 0.019, isoleucine: 0.029, leucine: 0.050, lysine: 0.066, methionine: 0.008,
      phenylalanine: 0.027, threonine: 0.031, tryptophan: 0.013, valine: 0.042,
      vitaminA: 54, vitaminC: 36.4, vitaminK: 4.2, vitaminB6: 0.119, folate: 43,
      vitaminE: 0.90, thiamin: 0.028, riboflavin: 0.038, niacin: 0.669,
      calcium: 11, iron: 0.16, magnesium: 10, zinc: 0.09,
      potassium: 168, phosphorus: 14, selenium: 0.6, copper: 0.111, manganese: 0.063,
      omega3: 0.05, omega6: 0.02, fiber: 1.6
    }
  },
  {
    id: 'dates', name: 'Dates (Medjool)', category: 'fruits', emoji: '🌴',
    serving: '100g',
    nutrients: {
      calories: 277, protein: 1.8, carbs: 75.0, fat: 0.2,
      histidine: 0.029, isoleucine: 0.045, leucine: 0.077, lysine: 0.054, methionine: 0.018,
      phenylalanine: 0.048, threonine: 0.042, tryptophan: 0.007, valine: 0.066,
      vitaminA: 0, vitaminC: 0.4, vitaminK: 2.7, vitaminB6: 0.249, folate: 15,
      vitaminE: 0.05, thiamin: 0.052, riboflavin: 0.066, niacin: 1.274,
      calcium: 64, iron: 0.90, magnesium: 54, zinc: 0.44,
      potassium: 696, phosphorus: 62, selenium: 3.0, copper: 0.362, manganese: 0.296,
      omega3: 0.0, omega6: 0.03, fiber: 6.7
    }
  },
  {
    id: 'figs-dried', name: 'Dried Figs', category: 'fruits', emoji: '🫐',
    serving: '100g',
    nutrients: {
      calories: 249, protein: 3.3, carbs: 63.9, fat: 0.9,
      histidine: 0.035, isoleucine: 0.060, leucine: 0.082, lysine: 0.055, methionine: 0.019,
      phenylalanine: 0.048, threonine: 0.054, tryptophan: 0.017, valine: 0.070,
      vitaminA: 0, vitaminC: 1.2, vitaminK: 15.6, vitaminB6: 0.106, folate: 9,
      vitaminE: 0.35, thiamin: 0.085, riboflavin: 0.082, niacin: 0.619,
      calcium: 162, iron: 2.03, magnesium: 68, zinc: 0.55,
      potassium: 680, phosphorus: 67, selenium: 0.6, copper: 0.287, manganese: 0.510,
      omega3: 0.0, omega6: 0.35, fiber: 9.8
    }
  },

  // ──────── FERMENTED ────────
  {
    id: 'miso', name: 'Miso', category: 'fermented', emoji: '🍶',
    serving: '100g',
    nutrients: {
      calories: 199, protein: 11.7, carbs: 26.5, fat: 6.0,
      histidine: 0.274, isoleucine: 0.499, leucine: 0.779, lysine: 0.413, methionine: 0.125,
      phenylalanine: 0.497, threonine: 0.399, tryptophan: 0.126, valine: 0.514,
      vitaminA: 3, vitaminC: 0, vitaminK: 29.3, vitaminB6: 0.199, folate: 19,
      vitaminE: 0.01, thiamin: 0.098, riboflavin: 0.233, niacin: 0.906,
      calcium: 57, iron: 2.49, magnesium: 48, zinc: 2.56,
      potassium: 210, phosphorus: 159, selenium: 7.0, copper: 0.420, manganese: 0.859,
      omega3: 0.34, omega6: 2.87, fiber: 5.4
    }
  },
  {
    id: 'sauerkraut', name: 'Sauerkraut', category: 'fermented', emoji: '🥬',
    serving: '100g',
    nutrients: {
      calories: 19, protein: 0.9, carbs: 4.3, fat: 0.1,
      histidine: 0.015, isoleucine: 0.029, leucine: 0.029, lysine: 0.029, methionine: 0.008,
      phenylalanine: 0.020, threonine: 0.020, tryptophan: 0.005, valine: 0.029,
      vitaminA: 1, vitaminC: 14.7, vitaminK: 13.0, vitaminB6: 0.130, folate: 24,
      vitaminE: 0.14, thiamin: 0.021, riboflavin: 0.022, niacin: 0.143,
      calcium: 30, iron: 1.47, magnesium: 13, zinc: 0.19,
      potassium: 170, phosphorus: 20, selenium: 0.6, copper: 0.096, manganese: 0.151,
      omega3: 0.0, omega6: 0.03, fiber: 2.9
    }
  },
  {
    id: 'kimchi', name: 'Kimchi', category: 'fermented', emoji: '🌶️',
    serving: '100g',
    nutrients: {
      calories: 15, protein: 1.1, carbs: 2.4, fat: 0.5,
      histidine: 0.019, isoleucine: 0.035, leucine: 0.044, lysine: 0.038, methionine: 0.009,
      phenylalanine: 0.027, threonine: 0.028, tryptophan: 0.007, valine: 0.038,
      vitaminA: 5, vitaminC: 0, vitaminK: 43.6, vitaminB6: 0.213, folate: 52,
      vitaminE: 0.11, thiamin: 0.010, riboflavin: 0.021, niacin: 1.100,
      calcium: 33, iron: 2.50, magnesium: 14, zinc: 0.22,
      potassium: 151, phosphorus: 24, selenium: 0.5, copper: 0.024, manganese: 0.103,
      omega3: 0.0, omega6: 0.12, fiber: 1.6
    }
  },

  // ──────── OTHER ────────
  {
    id: 'nutritional-yeast', name: 'Nutritional Yeast', category: 'other', emoji: '✨',
    serving: '100g',
    nutrients: {
      calories: 325, protein: 50.0, carbs: 36.0, fat: 4.0,
      histidine: 1.145, isoleucine: 2.310, leucine: 3.510, lysine: 3.510, methionine: 0.710,
      phenylalanine: 2.030, threonine: 2.340, tryptophan: 0.670, valine: 2.700,
      vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 4.800, folate: 3170,
      vitaminE: 0.0, thiamin: 9.700, riboflavin: 9.700, niacin: 56.000,
      calcium: 30, iron: 5.00, magnesium: 100, zinc: 8.00,
      potassium: 1740, phosphorus: 890, selenium: 14.0, copper: 0.500, manganese: 0.400,
      omega3: 0.0, omega6: 0.0, fiber: 22.0
    }
  },
  {
    id: 'fortified-plant-milk', name: 'Fortified Plant Milk', category: 'other', emoji: '🥛',
    serving: '100g',
    nutrients: {
      calories: 33, protein: 1.0, carbs: 5.3, fat: 0.9,
      histidine: 0.008, isoleucine: 0.015, leucine: 0.025, lysine: 0.014, methionine: 0.005,
      phenylalanine: 0.016, threonine: 0.013, tryptophan: 0.004, valine: 0.016,
      vitaminA: 54, vitaminC: 0, vitaminK: 0, vitaminB6: 0.041, folate: 4,
      vitaminE: 3.25, thiamin: 0.025, riboflavin: 0.170, niacin: 0.400,
      calcium: 120, iron: 0.29, magnesium: 7, zinc: 0.26,
      potassium: 67, phosphorus: 26, selenium: 1.2, copper: 0.067, manganese: 0.178,
      omega3: 0.0, omega6: 0.37, fiber: 0.3
    }
  },
  {
    id: 'olive-oil', name: 'Olive Oil', category: 'other', emoji: '🫒',
    serving: '100g',
    nutrients: {
      calories: 884, protein: 0, carbs: 0, fat: 100,
      histidine: 0, isoleucine: 0, leucine: 0, lysine: 0, methionine: 0,
      phenylalanine: 0, threonine: 0, tryptophan: 0, valine: 0,
      vitaminA: 0, vitaminC: 0, vitaminK: 60.2, vitaminB6: 0, folate: 0,
      vitaminE: 14.35, thiamin: 0, riboflavin: 0, niacin: 0,
      calcium: 1, iron: 0.56, magnesium: 0, zinc: 0,
      potassium: 1, phosphorus: 0, selenium: 0, copper: 0, manganese: 0,
      omega3: 0.76, omega6: 9.76, fiber: 0
    }
  },
  {
    id: 'coconut-oil', name: 'Coconut Oil', category: 'other', emoji: '🥥',
    serving: '100g',
    nutrients: {
      calories: 862, protein: 0, carbs: 0, fat: 100,
      histidine: 0, isoleucine: 0, leucine: 0, lysine: 0, methionine: 0,
      phenylalanine: 0, threonine: 0, tryptophan: 0, valine: 0,
      vitaminA: 0, vitaminC: 0, vitaminK: 0.5, vitaminB6: 0, folate: 0,
      vitaminE: 0.09, thiamin: 0, riboflavin: 0, niacin: 0,
      calcium: 0, iron: 0.04, magnesium: 0, zinc: 0,
      potassium: 0, phosphorus: 0, selenium: 0, copper: 0, manganese: 0,
      omega3: 0.0, omega6: 1.68, fiber: 0
    }
  },
  {
    id: 'dark-chocolate', name: 'Dark Chocolate (70%+)', category: 'other', emoji: '🍫',
    serving: '100g',
    nutrients: {
      calories: 598, protein: 7.8, carbs: 45.9, fat: 42.6,
      histidine: 0.071, isoleucine: 0.186, leucine: 0.281, lysine: 0.170, methionine: 0.045,
      phenylalanine: 0.227, threonine: 0.141, tryptophan: 0.066, valine: 0.233,
      vitaminA: 2, vitaminC: 0, vitaminK: 7.3, vitaminB6: 0.038, folate: 12,
      vitaminE: 0.59, thiamin: 0.034, riboflavin: 0.078, niacin: 1.054,
      calcium: 73, iron: 11.90, magnesium: 228, zinc: 3.31,
      potassium: 715, phosphorus: 308, selenium: 6.8, copper: 1.766, manganese: 1.948,
      omega3: 0.12, omega6: 1.09, fiber: 10.9
    }
  },
  {
    id: 'spirulina', name: 'Spirulina (dried)', category: 'other', emoji: '🌿',
    serving: '100g',
    nutrients: {
      calories: 290, protein: 57.5, carbs: 24.0, fat: 7.7,
      histidine: 1.085, isoleucine: 3.209, leucine: 4.947, lysine: 3.025, methionine: 1.149,
      phenylalanine: 2.777, threonine: 2.970, tryptophan: 0.929, valine: 3.512,
      vitaminA: 29, vitaminC: 10.1, vitaminK: 25.5, vitaminB6: 0.364, folate: 94,
      vitaminE: 5.0, thiamin: 2.380, riboflavin: 3.670, niacin: 12.820,
      calcium: 120, iron: 28.50, magnesium: 195, zinc: 2.00,
      potassium: 1363, phosphorus: 118, selenium: 7.2, copper: 6.100, manganese: 1.900,
      omega3: 0.82, omega6: 1.25, fiber: 3.6
    }
  },
  {
    id: 'seaweed-nori', name: 'Seaweed (Nori)', category: 'other', emoji: '🌊',
    serving: '100g',
    nutrients: {
      calories: 35, protein: 5.8, carbs: 5.1, fat: 0.3,
      histidine: 0.093, isoleucine: 0.260, leucine: 0.472, lysine: 0.309, methionine: 0.133,
      phenylalanine: 0.269, threonine: 0.284, tryptophan: 0.063, valine: 0.361,
      vitaminA: 260, vitaminC: 39.0, vitaminK: 4.0, vitaminB6: 0.159, folate: 146,
      vitaminE: 1.0, thiamin: 0.098, riboflavin: 0.446, niacin: 1.470,
      calcium: 70, iron: 1.80, magnesium: 2, zinc: 1.05,
      potassium: 356, phosphorus: 58, selenium: 0.7, copper: 0.100, manganese: 0.990,
      omega3: 0.0, omega6: 0.02, fiber: 0.3
    }
  },
  {
    id: 'soy-milk', name: 'Soy Milk', category: 'other', emoji: '🥛',
    serving: '100g',
    nutrients: {
      calories: 54, protein: 3.3, carbs: 6.3, fat: 1.8,
      histidine: 0.049, isoleucine: 0.089, leucine: 0.148, lysine: 0.118, methionine: 0.025,
      phenylalanine: 0.094, threonine: 0.075, tryptophan: 0.028, valine: 0.093,
      vitaminA: 54, vitaminC: 0, vitaminK: 3, vitaminB6: 0.041, folate: 18,
      vitaminE: 0.11, thiamin: 0.060, riboflavin: 0.069, niacin: 0.425,
      calcium: 25, iron: 0.64, magnesium: 25, zinc: 0.32,
      potassium: 118, phosphorus: 52, selenium: 1.5, copper: 0.128, manganese: 0.233,
      omega3: 0.21, omega6: 0.95, fiber: 0.6
    }
  },
  {
    id: 'peanut-butter', name: 'Peanut Butter', category: 'nuts-seeds', emoji: '🥜',
    serving: '100g',
    nutrients: {
      calories: 588, protein: 25.1, carbs: 19.6, fat: 50.4,
      histidine: 0.607, isoleucine: 0.834, leucine: 1.535, lysine: 0.851, methionine: 0.292,
      phenylalanine: 1.230, threonine: 0.790, tryptophan: 0.230, valine: 0.995,
      vitaminA: 0, vitaminC: 0, vitaminK: 0.3, vitaminB6: 0.441, folate: 87,
      vitaminE: 9.10, thiamin: 0.110, riboflavin: 0.192, niacin: 13.112,
      calcium: 43, iron: 1.74, magnesium: 154, zinc: 2.51,
      potassium: 649, phosphorus: 319, selenium: 4.1, copper: 0.473, manganese: 1.466,
      omega3: 0.0, omega6: 14.25, fiber: 6.0
    }
  },
  {
    id: 'hummus', name: 'Hummus', category: 'other', emoji: '🫘',
    serving: '100g',
    nutrients: {
      calories: 166, protein: 7.9, carbs: 14.3, fat: 9.6,
      histidine: 0.195, isoleucine: 0.342, leucine: 0.524, lysine: 0.473, methionine: 0.117,
      phenylalanine: 0.387, threonine: 0.257, tryptophan: 0.068, valine: 0.349,
      vitaminA: 1, vitaminC: 6.5, vitaminK: 3.7, vitaminB6: 0.200, folate: 83,
      vitaminE: 0.80, thiamin: 0.180, riboflavin: 0.064, niacin: 0.582,
      calcium: 38, iron: 2.44, magnesium: 71, zinc: 1.83,
      potassium: 228, phosphorus: 176, selenium: 2.6, copper: 0.527, manganese: 0.773,
      omega3: 0.08, omega6: 3.86, fiber: 6.0
    }
  }
];
