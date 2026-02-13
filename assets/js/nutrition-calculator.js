// ================================================================
// ABBAYA NUTRITION CALCULATOR v2.0 - ENGINE (FIXED)
// ================================================================
// Works with inline data from calculator/index.html
// All declarations use var to avoid conflicts
// ================================================================

// ============================================
// SECTION 1: CONFIG & CONSTANTS (safe declarations)
// ============================================
// ================================================================
// ABBAYA NUTRITION CALCULATOR v2.0 - ENGINE
// ================================================================

var API_CONFIG = {
  USDA_API_KEY: 'DEMO_KEY',
  USDA_BASE: 'https://api.nal.usda.gov/fdc/v1',
  OFF_BASE: 'https://world.openfoodfacts.org/api/v2'
};

var dailyValues = {};
var _k;
for (_k in baseDailyValues) { dailyValues[_k] = baseDailyValues[_k]; }

var upperLimits = {
  vitaminA: 3000, vitaminC: 2000, vitaminE: 1000, vitaminB6: 100,
  folate: 1000, niacin: 35, calcium: 2500, iron: 45,
  magnesium: 350, zinc: 40, selenium: 400, copper: 10,
  manganese: 11, phosphorus: 4000
};

var upperLimitWarnings = {
  en: {
    vitaminA: 'Can cause liver damage', vitaminC: 'May cause GI distress and kidney stones',
    vitaminE: 'Increases bleeding risk', vitaminB6: 'Can cause nerve damage',
    folate: 'May mask B12 deficiency', niacin: 'Can cause flushing and liver damage',
    calcium: 'Risk of kidney stones', iron: 'Can cause GI distress and organ damage',
    magnesium: 'May cause diarrhea', zinc: 'Can cause copper deficiency',
    selenium: 'Risk of selenosis', copper: 'Can cause liver damage',
    manganese: 'Risk of neurological issues', phosphorus: 'May affect kidneys'
  },
  pt: {
    vitaminA: 'Pode causar danos no fígado', vitaminC: 'Pode causar desconforto GI',
    vitaminE: 'Aumenta risco de hemorragia', vitaminB6: 'Pode causar danos nos nervos',
    folate: 'Pode mascarar deficiência de B12', niacin: 'Pode causar rubor',
    calcium: 'Risco de pedras nos rins', iron: 'Pode causar danos em órgãos',
    magnesium: 'Pode causar diarreia', zinc: 'Pode causar deficiência de cobre',
    selenium: 'Risco de selenose', copper: 'Pode causar danos no fígado',
    manganese: 'Risco neurológico', phosphorus: 'Pode afetar rins'
  }
};

var nutrientNames = {
  en: {
    histidine:'Histidine', isoleucine:'Isoleucine', leucine:'Leucine', lysine:'Lysine',
    methionine:'Methionine', phenylalanine:'Phenylalanine', threonine:'Threonine',
    tryptophan:'Tryptophan', valine:'Valine', vitaminA:'Vitamin A', vitaminC:'Vitamin C',
    vitaminE:'Vitamin E', vitaminK:'Vitamin K', vitaminB6:'Vitamin B6', folate:'Folate',
    thiamin:'Thiamin (B1)', riboflavin:'Riboflavin (B2)', niacin:'Niacin (B3)',
    calcium:'Calcium', iron:'Iron', magnesium:'Magnesium', zinc:'Zinc',
    potassium:'Potassium', phosphorus:'Phosphorus', selenium:'Selenium',
    copper:'Copper', manganese:'Manganese', omega3:'Omega-3 (ALA)',
    omega6:'Omega-6', fiber:'Fiber'
  },
  pt: {
    histidine:'Histidina', isoleucine:'Isoleucina', leucine:'Leucina', lysine:'Lisina',
    methionine:'Metionina', phenylalanine:'Fenilalanina', threonine:'Treonina',
    tryptophan:'Triptofano', valine:'Valina', vitaminA:'Vitamina A', vitaminC:'Vitamina C',
    vitaminE:'Vitamina E', vitaminK:'Vitamina K', vitaminB6:'Vitamina B6', folate:'Folato',
    thiamin:'Tiamina (B1)', riboflavin:'Riboflavina (B2)', niacin:'Niacina (B3)',
    calcium:'Cálcio', iron:'Ferro', magnesium:'Magnésio', zinc:'Zinco',
    potassium:'Potássio', phosphorus:'Fósforo', selenium:'Selénio',
    copper:'Cobre', manganese:'Manganês', omega3:'Ómega-3 (ALA)',
    omega6:'Ómega-6', fiber:'Fibra'
  }
};

// Section 2: State
var currentLang = 'en';
var currentCategory = 'all';
var searchQuery = '';
var currentView = 'select';
var macroChart = null;
var completionChart = null;
var currentTheme = 'light';
var currentMealSlot = 'breakfast';
var searchDebounceTimer = null;
var apiIngredients = [];
var mealSlots = { breakfast: [], lunch: [], dinner: [], snacks: [] };
var undoStack = [];
var redoStack = [];
var MAX_UNDO = 50;
var selectedIngredients = mealSlots.breakfast;

// ============================================
// SECTION 3: TOAST NOTIFICATIONS
// ============================================
function showToast(message, type, duration) {
  type = type || 'info';
  duration = duration || 3000;
  var container = document.getElementById('toastContainer');
  if (!container) return;
  var toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(function() {
    toast.classList.add('fade-out');
    setTimeout(function() { toast.remove(); }, 300);
  }, duration);
}

// ============================================
// SECTION 4: MODALS
// ============================================
function openModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.add('visible');
  if (id === 'shareModal') {
    document.getElementById('shareUrlInput').value = generateShareUrl();
  }
}

function closeModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.remove('visible');
}

// ============================================
// SECTION 5: UNDO / REDO
// ============================================
function saveState() {
  undoStack.push(JSON.parse(JSON.stringify(mealSlots)));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack = [];
  updateUndoRedoButtons();
}

function undo() {
  if (undoStack.length === 0) return;
  redoStack.push(JSON.parse(JSON.stringify(mealSlots)));
  mealSlots = undoStack.pop();
  selectedIngredients = mealSlots[currentMealSlot] || [];
  refreshAll();
  updateUndoRedoButtons();
  showToast(translations[currentLang].toast.undone, 'info', 1500);
}

function redo() {
  if (redoStack.length === 0) return;
  undoStack.push(JSON.parse(JSON.stringify(mealSlots)));
  mealSlots = redoStack.pop();
  selectedIngredients = mealSlots[currentMealSlot] || [];
  refreshAll();
  updateUndoRedoButtons();
  showToast(translations[currentLang].toast.redone, 'info', 1500);
}

function updateUndoRedoButtons() {
  var u = document.getElementById('undoBtn');
  var r = document.getElementById('redoBtn');
  if (u) u.disabled = undoStack.length === 0;
  if (r) r.disabled = redoStack.length === 0;
}

// ============================================
// SECTION 6: THEME
// ============================================
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.getElementById('themeBtn').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('abbaya-theme', currentTheme);
  if (macroChart && completionChart) updateCharts(calculateTotals());
}

function loadTheme() {
  var saved = localStorage.getItem('abbaya-theme');
  if (saved === 'dark') {
    currentTheme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');
    var btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = '☀️';
  }
}

// ============================================
// SECTION 7: LANGUAGE
// ============================================
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('abbaya-lang', lang);
  var en = document.getElementById('langEn');
  var pt = document.getElementById('langPt');
  if (en) en.classList.toggle('active', lang === 'en');
  if (pt) pt.classList.toggle('active', lang === 'pt');
  applyTranslations();
  renderIngredients();
  renderSelectedItems();
  updateDashboard();
  populateCompareSelect();
  renderMealHistory();
}

function applyTranslations() {
  var t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var keys = el.getAttribute('data-i18n').split('.');
    var val = t;
    for (var i = 0; i < keys.length; i++) {
      if (val) val = val[keys[i]];
    }
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var keys = el.getAttribute('data-i18n-placeholder').split('.');
    var val = t;
    for (var i = 0; i < keys.length; i++) {
      if (val) val = val[keys[i]];
    }
    if (val) el.placeholder = val;
  });
}

function getIngredientName(ing) {
  return (currentLang === 'pt' && ingredientNamesPt[ing.id]) ? ingredientNamesPt[ing.id] : ing.name;
}

// ============================================
// SECTION 8: PERSONALIZATION
// ============================================
function updatePersonalDV() {
  var gender = document.getElementById('personalGender').value;
  var age = parseInt(document.getElementById('personalAge').value) || 30;
  var weight = parseInt(document.getElementById('personalWeight').value) || 70;
  var activity = document.getElementById('personalActivity').value;
  var multMap = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, 'very-active': 1.9 };
  var mult = multMap[activity] || 1.55;

  var bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * 175 - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * 162 - 5 * age - 161;
  }
  var tdee = Math.round(bmr * mult);

  dailyValues = {};
  for (var key in baseDailyValues) { dailyValues[key] = baseDailyValues[key]; }
  dailyValues.calories = tdee;
  dailyValues.protein = Math.round(weight * 0.8);
  dailyValues.carbs = Math.round(tdee * 0.55 / 4);
  dailyValues.fat = Math.round(tdee * 0.3 / 9);
  dailyValues.fiber = gender === 'male' ? 38 : 25;

  var aminoPerKg = {
    histidine: 0.01, isoleucine: 0.02, leucine: 0.039, lysine: 0.03,
    methionine: 0.0104, phenylalanine: 0.025, threonine: 0.015,
    tryptophan: 0.004, valine: 0.026
  };
  for (var ak in aminoPerKg) { dailyValues[ak] = aminoPerKg[ak] * weight; }

  if (gender === 'male') {
    dailyValues.iron = 8; dailyValues.zinc = 11;
    dailyValues.magnesium = age > 30 ? 420 : 400;
  } else {
    dailyValues.iron = age > 50 ? 8 : 18; dailyValues.zinc = 8;
    dailyValues.magnesium = age > 30 ? 320 : 310;
  }
  if (age > 50) { dailyValues.vitaminB6 = 1.7; dailyValues.calcium = 1200; }

  localStorage.setItem('abbaya-personal', JSON.stringify({ gender: gender, age: age, weight: weight, activity: activity }));
  updateDashboard();
  showToast('✅ Daily values updated', 'success', 2000);
}

function loadPersonalPreferences() {
  try {
    var p = JSON.parse(localStorage.getItem('abbaya-personal'));
    if (p) {
      document.getElementById('personalGender').value = p.gender || 'female';
      document.getElementById('personalAge').value = p.age || 30;
      document.getElementById('personalWeight').value = p.weight || 70;
      document.getElementById('personalActivity').value = p.activity || 'moderate';
      updatePersonalDV();
    }
  } catch (e) {}
}

// ============================================
// SECTION 9: MEAL SLOTS
// ============================================
function switchMealSlot(slot) {
  currentMealSlot = slot;
  if (slot === 'all') {
    selectedIngredients = getAllIngredients();
  } else {
    selectedIngredients = mealSlots[slot];
  }
  document.querySelectorAll('.meal-slot-btn').forEach(function(b) { b.classList.remove('active'); });
  if (event && event.target) {
    var btn = event.target.closest('.meal-slot-btn');
    if (btn) btn.classList.add('active');
  }
  refreshAll();
}

function getAllIngredients() {
  var map = {};
  var slots = Object.keys(mealSlots);
  for (var s = 0; s < slots.length; s++) {
    var slot = mealSlots[slots[s]];
    for (var i = 0; i < slot.length; i++) {
      var item = slot[i];
      if (map[item.id]) { map[item.id].serving += item.serving; }
      else { map[item.id] = { id: item.id, serving: item.serving }; }
    }
  }
  return Object.values(map);
}

function updateSlotCounts() {
  var slotNames = ['breakfast', 'lunch', 'dinner', 'snacks'];
  for (var i = 0; i < slotNames.length; i++) {
    var el = document.getElementById(slotNames[i] + 'Count');
    if (el) el.textContent = mealSlots[slotNames[i]].length;
  }
}

function loadPreset(presetId) {
  var preset = mealPresets[presetId];
  if (!preset) return;
  saveState();
  if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
  mealSlots[currentMealSlot] = preset.items.map(function(i) { return { id: i.id, serving: i.serving }; });
  selectedIngredients = mealSlots[currentMealSlot];
  refreshAll();
  showToast('🍽️ ' + preset.name[currentLang] + ' loaded!', 'success');
}

// ============================================
// SECTION 10: VIEW & CATEGORY
// ============================================
function setView(view, btn) {
  currentView = view;
  document.querySelectorAll('.view-toggle button').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.getElementById('selectView').style.display = view === 'select' ? 'block' : 'none';
  var cv = document.getElementById('compareView');
  cv.style.display = view === 'compare' ? 'block' : 'none';
  cv.classList.toggle('active', view === 'compare');
}

function setupCategoryPills() {
  document.querySelectorAll('.category-pill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      document.querySelectorAll('.category-pill').forEach(function(p) { p.classList.remove('active'); });
      pill.classList.add('active');
      currentCategory = pill.dataset.category;
      renderIngredients();
    });
  });
}

// ============================================
// SECTION 11: SEARCH + API
// ============================================
function handleSearch() {
  searchQuery = document.getElementById('ingredientSearch').value.toLowerCase();
  clearTimeout(searchDebounceTimer);
  renderIngredients();
  if (searchQuery.length >= 3) {
    searchDebounceTimer = setTimeout(function() { searchFoodAPI(searchQuery); }, 500);
  } else {
    hideApiResults();
  }
}

function filterIngredients() { handleSearch(); }

function searchFoodAPI(query) {
  var div = document.getElementById('apiSearchResults');
  if (!div) return;
  div.innerHTML = '<div class="api-loading">🔍 Searching USDA database...</div>';
  div.classList.add('visible');

  fetch(API_CONFIG.USDA_BASE + '/foods/search?api_key=' + API_CONFIG.USDA_API_KEY + '&query=' + encodeURIComponent(query) + '&dataType=Foundation,SR%20Legacy&pageSize=8')
    .then(function(r) {
      if (!r.ok) throw new Error('USDA error');
      return r.json();
    })
    .then(function(data) {
      if (data.foods && data.foods.length > 0) {
        div.innerHTML = data.foods.map(function(f) {
          var safeName = f.description.replace(/'/g, "\\'");
          return '<div class="api-result-item" onclick="addApiFood(' + f.fdcId + ',\'' + safeName + '\')">' +
            '<span>🔬 ' + f.description + '</span><span class="api-badge">USDA</span></div>';
        }).join('');
      } else {
        searchOFF(query, div);
      }
    })
    .catch(function() {
      searchOFF(query, div);
    });
}

function searchOFF(query, div) {
  fetch(API_CONFIG.OFF_BASE + '/search?search_terms=' + encodeURIComponent(query) + '&search_simple=1&json=1&page_size=8&fields=product_name,nutriments,code')
    .then(function(r) {
      if (!r.ok) throw new Error('OFF error');
      return r.json();
    })
    .then(function(data) {
      var valid = (data.products || []).filter(function(p) { return p.product_name && p.nutriments; });
      if (valid.length > 0) {
        div.innerHTML = valid.map(function(p) {
          var safeName = (p.product_name || '').replace(/'/g, "\\'");
          return '<div class="api-result-item" onclick="addOFFFood(\'' + p.code + '\',\'' + safeName + '\')">' +
            '<span>🌍 ' + p.product_name + '</span><span class="api-badge" style="background:#4CAF50">OFF</span></div>';
        }).join('');
      } else {
        div.innerHTML = '<div class="api-loading">No results found</div>';
        setTimeout(hideApiResults, 2000);
      }
    })
    .catch(function() {
      div.innerHTML = '<div class="api-loading">Using local data only</div>';
      setTimeout(hideApiResults, 3000);
    });
}

function hideApiResults() {
  var d = document.getElementById('apiSearchResults');
  if (d) d.classList.remove('visible');
}

function addApiFood(fdcId, name) {
  hideApiResults();
  showToast('⏳ Loading ' + name + '...', 'info', 2000);

  fetch(API_CONFIG.USDA_BASE + '/food/' + fdcId + '?api_key=' + API_CONFIG.USDA_API_KEY)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var n = parseUSDA(data);
      var ing = { id: 'api-' + fdcId, name: name.substring(0, 50), category: 'api', emoji: '🔬', serving: '100g', isApi: true, nutrients: n };
      if (!ingredients.find(function(i) { return i.id === ing.id; })) {
        ingredients.push(ing);
        apiIngredients.push(ing);
      }
      saveState();
      if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
      selectedIngredients.push({ id: ing.id, serving: 1 });
      refreshAll();
      showToast('✅ ' + name + ' added', 'success');
    })
    .catch(function() {
      showToast(translations[currentLang].toast.apiError, 'error');
    });
}

function parseUSDA(data) {
  var n = {
    calories: 0, protein: 0, carbs: 0, fat: 0,
    histidine: 0, isoleucine: 0, leucine: 0, lysine: 0,
    methionine: 0, phenylalanine: 0, threonine: 0, tryptophan: 0, valine: 0,
    vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 0, folate: 0,
    vitaminE: 0, thiamin: 0, riboflavin: 0, niacin: 0,
    calcium: 0, iron: 0, magnesium: 0, zinc: 0,
    potassium: 0, phosphorus: 0, selenium: 0, copper: 0, manganese: 0,
    omega3: 0, omega6: 0, fiber: 0
  };
  var map = {
    1008: 'calories', 1003: 'protein', 1005: 'carbs', 1004: 'fat',
    1221: 'histidine', 1212: 'isoleucine', 1213: 'leucine', 1214: 'lysine',
    1215: 'methionine', 1217: 'phenylalanine', 1211: 'threonine',
    1210: 'tryptophan', 1219: 'valine',
    1106: 'vitaminA', 1162: 'vitaminC', 1185: 'vitaminK', 1175: 'vitaminB6',
    1177: 'folate', 1109: 'vitaminE', 1165: 'thiamin', 1166: 'riboflavin', 1167: 'niacin',
    1087: 'calcium', 1089: 'iron', 1090: 'magnesium', 1095: 'zinc',
    1092: 'potassium', 1091: 'phosphorus', 1103: 'selenium', 1098: 'copper',
    1101: 'manganese', 1079: 'fiber', 1404: 'omega3', 1269: 'omega6'
  };
  if (data.foodNutrients) {
    data.foodNutrients.forEach(function(fn) {
      var id = fn.nutrient ? fn.nutrient.id : fn.nutrientId;
      if (map[id]) n[map[id]] = fn.amount || 0;
    });
  }
  return n;
}

function addOFFFood(code, name) {
  hideApiResults();
  showToast('⏳ Loading...', 'info', 2000);

  fetch(API_CONFIG.OFF_BASE + '/product/' + code + '.json?fields=product_name,nutriments')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var nm = (data.product && data.product.nutriments) ? data.product.nutriments : {};
      var n = {
        calories: nm['energy-kcal_100g'] || 0, protein: nm.proteins_100g || 0,
        carbs: nm.carbohydrates_100g || 0, fat: nm.fat_100g || 0, fiber: nm.fiber_100g || 0,
        calcium: (nm.calcium_100g || 0) * 1000, iron: (nm.iron_100g || 0) * 1000,
        magnesium: (nm.magnesium_100g || 0) * 1000, zinc: (nm.zinc_100g || 0) * 1000,
        potassium: (nm.potassium_100g || 0) * 1000, phosphorus: (nm.phosphorus_100g || 0) * 1000,
        selenium: (nm.selenium_100g || 0) * 1e6, copper: (nm.copper_100g || 0) * 1000,
        manganese: (nm.manganese_100g || 0) * 1000,
        vitaminA: (nm['vitamin-a_100g'] || 0) * 1e6, vitaminC: (nm['vitamin-c_100g'] || 0) * 1000,
        vitaminE: (nm['vitamin-e_100g'] || 0) * 1000, vitaminK: (nm['vitamin-k_100g'] || 0) * 1e6,
        vitaminB6: (nm['vitamin-b6_100g'] || 0) * 1000, folate: (nm.folates_100g || 0) * 1e6,
        thiamin: (nm['vitamin-b1_100g'] || 0) * 1000, riboflavin: (nm['vitamin-b2_100g'] || 0) * 1000,
        niacin: (nm['vitamin-pp_100g'] || 0) * 1000,
        omega3: nm['omega-3-fat_100g'] || 0, omega6: nm['omega-6-fat_100g'] || 0,
        histidine: 0, isoleucine: 0, leucine: 0, lysine: 0,
        methionine: 0, phenylalanine: 0, threonine: 0, tryptophan: 0, valine: 0
      };
      var ing = { id: 'off-' + code, name: name.substring(0, 50), category: 'api', emoji: '🌍', serving: '100g', isApi: true, nutrients: n };
      if (!ingredients.find(function(i) { return i.id === ing.id; })) {
        ingredients.push(ing);
        apiIngredients.push(ing);
      }
      saveState();
      if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
      selectedIngredients.push({ id: ing.id, serving: 1 });
      refreshAll();
      showToast('✅ ' + name + ' added', 'success');
    })
    .catch(function() {
      showToast(translations[currentLang].toast.apiError, 'error');
    });
}

// ============================================
// SECTION 12: RENDER INGREDIENTS
// ============================================
function renderIngredients() {
  var grid = document.getElementById('ingredientGrid');
  if (!grid) return;
  var t = translations[currentLang];

  var filtered = ingredients.filter(function(ing) {
    var catMatch = currentCategory === 'all' || ing.category === currentCategory;
    var nameStr = getIngredientName(ing).toLowerCase();
    var searchMatch = !searchQuery || nameStr.indexOf(searchQuery) !== -1;
    return catMatch && searchMatch;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div class="no-results">' + t.noResults + '</div>';
    return;
  }

  grid.innerHTML = filtered.map(function(ing) {
    var sel = selectedIngredients.some(function(s) { return s.id === ing.id; });
    var name = getIngredientName(ing);
    return '<div class="ingredient-card ' + (sel ? 'selected' : '') + '" onclick="toggleIngredient(\'' + ing.id + '\')" tabindex="0" onkeydown="if(event.key===\'Enter\')toggleIngredient(\'' + ing.id + '\')">' +
      '<div class="check-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div>' +
      (ing.isApi ? '<div class="api-tag">API</div>' : '') +
      '<div class="emoji">' + ing.emoji + '</div>' +
      '<div class="name">' + name + '</div>' +
      '<div class="protein">' + ing.nutrients.protein + 'g ' + t.stats.protein.toLowerCase() + '</div>' +
      '</div>';
  }).join('');
}

// ============================================
// SECTION 13: TOGGLE, SERVE, CLEAR
// ============================================
function toggleIngredient(id) {
  saveState();
  if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
  var idx = -1;
  for (var i = 0; i < selectedIngredients.length; i++) {
    if (selectedIngredients[i].id === id) { idx = i; break; }
  }
  if (idx > -1) selectedIngredients.splice(idx, 1);
  else selectedIngredients.push({ id: id, serving: 1 });
  refreshAll();
}

function renderSelectedItems() {
  var c = document.getElementById('selectedItems');
  var cnt = document.getElementById('mealCount');
  if (!c || !cnt) return;
  var t = translations[currentLang];
  var items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;
  cnt.textContent = '(' + items.length + ')';

  if (!items.length) {
    c.innerHTML = '<div class="empty-state">' + t.meal.empty + '</div>';
    return;
  }

  c.innerHTML = items.map(function(sel) {
    var ing = ingredients.find(function(i) { return i.id === sel.id; });
    if (!ing) return '';
    var name = getIngredientName(ing);
    var grams = Math.round(sel.serving * 100);
    return '<div class="selected-item">' +
      '<div class="selected-item-header">' +
      '<span class="selected-item-name">' + ing.emoji + ' ' + name + '</span>' +
      (currentMealSlot !== 'all' ? '<button class="selected-item-remove" onclick="toggleIngredient(\'' + sel.id + '\')">&times;</button>' : '') +
      '</div>' +
      '<div class="serving-control">' +
      '<span>' + t.meal.serving + ':</span>' +
      '<input type="range" class="serving-slider" min="0.1" max="5" step="0.1" value="' + sel.serving + '" oninput="updateServing(\'' + sel.id + '\',this.value)">' +
      '<input type="number" class="gram-input" value="' + grams + '" min="10" max="500" step="10" onchange="updateServingGrams(\'' + sel.id + '\',this.value)">' +
      '<span style="font-size:0.75rem;color:var(--text-muted)">g</span>' +
      '</div></div>';
  }).join('');
}

function updateServing(id, val) {
  var items = currentMealSlot === 'all' ? getAllSlotItems() : selectedIngredients;
  var item = items.find(function(s) { return s.id === id; });
  if (item) { item.serving = parseFloat(val); renderSelectedItems(); updateDashboard(); updateMealBar(); }
}

function updateServingGrams(id, g) {
  var items = currentMealSlot === 'all' ? getAllSlotItems() : selectedIngredients;
  var item = items.find(function(s) { return s.id === id; });
  if (item) { item.serving = parseFloat(g) / 100; renderSelectedItems(); updateDashboard(); updateMealBar(); }
}

function getAllSlotItems() {
  var a = [];
  var slots = Object.keys(mealSlots);
  for (var i = 0; i < slots.length; i++) {
    var slot = mealSlots[slots[i]];
    for (var j = 0; j < slot.length; j++) { a.push(slot[j]); }
  }
  return a;
}

function clearAll() {
  saveState();
  if (currentMealSlot === 'all') { mealSlots = { breakfast: [], lunch: [], dinner: [], snacks: [] }; }
  else { mealSlots[currentMealSlot] = []; }
  selectedIngredients = currentMealSlot === 'all' ? [] : mealSlots[currentMealSlot];
  var searchInput = document.getElementById('ingredientSearch');
  if (searchInput) searchInput.value = '';
  searchQuery = '';
  refreshAll();
  showToast(translations[currentLang].toast.cleared, 'info');
}

function addTahini() {
  saveState();
  if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
  var hasTahini = selectedIngredients.some(function(s) { return s.id === 'tahini'; });
  if (!hasTahini) {
    selectedIngredients.push({ id: 'tahini', serving: 0.3 });
    refreshAll();
    showToast('⭐ Tahini added!', 'success');
  }
}
// ============================================
// SECTION 14: CALCULATIONS
// ============================================
function calculateTotals() {
  var totals = {
    calories: 0, protein: 0, carbs: 0, fat: 0,
    histidine: 0, isoleucine: 0, leucine: 0, lysine: 0,
    methionine: 0, phenylalanine: 0, threonine: 0, tryptophan: 0, valine: 0,
    vitaminA: 0, vitaminC: 0, vitaminK: 0, vitaminB6: 0, folate: 0,
    vitaminE: 0, thiamin: 0, riboflavin: 0, niacin: 0,
    calcium: 0, iron: 0, magnesium: 0, zinc: 0,
    potassium: 0, phosphorus: 0, selenium: 0, copper: 0, manganese: 0,
    omega3: 0, omega6: 0, fiber: 0
  };
  var items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;

  for (var i = 0; i < items.length; i++) {
    var sel = items[i];
    var ing = ingredients.find(function(x) { return x.id === sel.id; });
    if (ing && ing.nutrients) {
      var keys = Object.keys(totals);
      for (var j = 0; j < keys.length; j++) {
        var ky = keys[j];
        if (ing.nutrients[ky] !== undefined) {
          totals[ky] += ing.nutrients[ky] * sel.serving;
        }
      }
    }
  }
  return totals;
}

// ============================================
// SECTION 15: DASHBOARD UPDATE
// ============================================
function updateDashboard() {
  var totals = calculateTotals();
  var items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;

  var el;
  el = document.getElementById('heroCalories'); if (el) el.textContent = Math.round(totals.calories);
  el = document.getElementById('heroProtein'); if (el) el.textContent = totals.protein.toFixed(1) + 'g';
  el = document.getElementById('heroItems'); if (el) el.textContent = items.length;
  el = document.getElementById('totalCalories'); if (el) el.textContent = Math.round(totals.calories);
  el = document.getElementById('totalCarbs'); if (el) el.textContent = totals.carbs.toFixed(1) + 'g';
  el = document.getElementById('totalFat'); if (el) el.textContent = totals.fat.toFixed(1) + 'g';

  var b12 = document.getElementById('b12Warning');
  if (b12) b12.style.display = items.length > 0 ? 'flex' : 'none';

  checkOverdoseWarnings(totals);
  updateScore(totals);

  updateNutrientSection('amino', totals,
    ['histidine', 'isoleucine', 'leucine', 'lysine', 'methionine', 'phenylalanine', 'threonine', 'tryptophan', 'valine'], 'g');
  updateNutrientSection('vitamin', totals,
    ['vitaminA', 'vitaminC', 'vitaminE', 'vitaminK', 'vitaminB6', 'folate', 'thiamin', 'riboflavin', 'niacin'], null);
  updateNutrientSection('mineral', totals,
    ['calcium', 'iron', 'magnesium', 'zinc', 'potassium', 'phosphorus', 'selenium', 'copper', 'manganese'], null);
  updateNutrientSection('fat', totals,
    ['omega3', 'omega6', 'fiber'], 'g');

  updateSuggestions(totals);
  updateTahiniPromo();
  updateCharts(totals);
  updateSlotCounts();
}

// ============================================
// SECTION 16: OVERDOSE WARNINGS
// ============================================
function checkOverdoseWarnings(totals) {
  var c = document.getElementById('warningsSection');
  if (!c) return;
  var names = nutrientNames[currentLang];
  var warns = upperLimitWarnings[currentLang];
  var t = translations[currentLang].warning;
  var html = '';

  var keys = Object.keys(upperLimits);
  for (var i = 0; i < keys.length; i++) {
    var ky = keys[i];
    var v = totals[ky] || 0;
    var limit = upperLimits[ky];
    if (v > limit) {
      var pct = Math.round(v / limit * 100);
      var danger = v > limit * 1.5;
      html += '<div class="warning-card ' + (danger ? 'danger' : '') + '">' +
        '<span class="warning-icon">' + (danger ? '🚨' : '⚠️') + '</span>' +
        '<div class="warning-text"><strong>' + t.overdosePrefix + ' ' + names[ky] + ': ' + pct + '% of upper limit</strong><br>' +
        (warns[ky] || t.overdoseSuffix) + '</div></div>';
    }
  }
  c.innerHTML = html;
}

// ============================================
// SECTION 17: SCORE
// ============================================
function updateScore(totals) {
  var excludeKeys = ['calories', 'carbs', 'fat', 'protein'];
  var keys = Object.keys(dailyValues).filter(function(ky) {
    return excludeKeys.indexOf(ky) === -1;
  });
  var total = 0;
  for (var i = 0; i < keys.length; i++) {
    var ky = keys[i];
    total += Math.min((totals[ky] / dailyValues[ky]) * 100, 100);
  }
  var score = Math.round(total / keys.length);

  var scoreValEl = document.getElementById('scoreValue');
  var heroScoreEl = document.getElementById('heroScore');
  if (scoreValEl) scoreValEl.textContent = score + '%';
  if (heroScoreEl) heroScoreEl.textContent = score + '%';

  var p = document.getElementById('scoreProgress');
  if (p) {
    var circumference = 2 * Math.PI * 44;
    p.style.strokeDashoffset = circumference - (score / 100) * circumference;
    if (score >= 80) p.style.stroke = 'var(--success)';
    else if (score >= 50) p.style.stroke = 'var(--warning)';
    else p.style.stroke = 'var(--gold)';
  }
}

// ============================================
// SECTION 18: NUTRIENT BARS
// ============================================
function updateNutrientSection(type, totals, keys, defaultUnit) {
  var bars = document.getElementById(type + 'Bars');
  var status = document.getElementById(type + 'Status');
  if (!bars || !status) return;

  var names = nutrientNames[currentLang];
  var unitMap = {
    vitaminA: 'mcg', vitaminC: 'mg', vitaminE: 'mg', vitaminK: 'mcg',
    vitaminB6: 'mg', folate: 'mcg', thiamin: 'mg', riboflavin: 'mg', niacin: 'mg',
    calcium: 'mg', iron: 'mg', magnesium: 'mg', zinc: 'mg',
    potassium: 'mg', phosphorus: 'mg', selenium: 'mcg', copper: 'mg', manganese: 'mg'
  };

  var allMet = true;
  var someMet = false;

  bars.innerHTML = keys.map(function(ky) {
    var v = totals[ky] || 0;
    var dv = dailyValues[ky];
    if (!dv) return '';

    var pct = Math.min(v / dv * 100, 100);
    var dpct = Math.round(v / dv * 100);
    var ul = upperLimits[ky];
    var over = ul && v > ul;
    var unit = defaultUnit || unitMap[ky] || 'mg';

    if (pct >= 100) someMet = true;
    else allMet = false;

    var cls = 'low';
    if (over) cls = 'overdose';
    else if (pct >= 100) cls = 'good';
    else if (pct >= 50) cls = 'medium';

    return '<div class="nutrient-bar">' +
      '<div class="bar-header">' +
      '<span class="bar-name">' + (names[ky] || ky) + (over ? ' <span class="overdose-icon">⚠️</span>' : '') + '</span>' +
      '<span class="bar-value">' + v.toFixed(2) + unit + ' (' + dpct + '%)</span>' +
      '</div>' +
      '<div class="bar-track"><div class="bar-fill ' + cls + '" style="width:' + pct + '%"></div></div>' +
      '</div>';
  }).join('');

  if (allMet) { status.className = 'status good'; status.innerHTML = '&#10003;'; }
  else if (someMet) { status.className = 'status warning'; status.innerHTML = '!'; }
  else { status.className = 'status bad'; status.innerHTML = '!'; }
}

function toggleSection(id) {
  var s = document.getElementById(id);
  if (s) s.classList.toggle('expanded');
}

// ============================================
// SECTION 19: SUGGESTIONS
// ============================================
function updateSuggestions(totals) {
  var c = document.getElementById('suggestionList');
  if (!c) return;
  var t = translations[currentLang].suggestions;
  var items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;
  var sug = [];

  if (items.length > 0) sug.push(t.addB12);
  if (totals.lysine < dailyValues.lysine * 0.5) sug.push(t.addLegumes);
  if (totals.methionine < dailyValues.methionine * 0.5) sug.push(t.addGrains);
  if (totals.calcium < dailyValues.calcium * 0.5) sug.push(t.addCalcium);
  if (totals.iron < dailyValues.iron * 0.5) sug.push(t.addIron);
  if (totals.zinc < dailyValues.zinc * 0.5) sug.push(t.addZinc);
  if (totals.omega3 < dailyValues.omega3 * 0.5) sug.push(t.addOmega3);
  if (totals.vitaminC < dailyValues.vitaminC * 0.5) sug.push(t.addVitaminC);
  if (items.length > 0 && t.addVitaminD) sug.push(t.addVitaminD);

  var valid = sug.filter(function(s) { return s; });

  if (!valid.length) {
    if (items.length === 0) {
      c.innerHTML = '<div class="suggestion-item">' + t.default + '</div>';
    } else {
      c.innerHTML = '<div class="suggestion-item" style="color:var(--success)">' + t.balanced + '</div>';
    }
  } else {
    c.innerHTML = valid.map(function(s) {
      return '<div class="suggestion-item">' + s + '</div>';
    }).join('');
  }
}

function updateTahiniPromo() {
  var p = document.getElementById('tahiniPromo');
  if (!p) return;
  var items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;
  var hasTahini = items.some(function(s) { return s.id === 'tahini'; });
  if (items.length > 0 && !hasTahini) { p.classList.add('visible'); }
  else { p.classList.remove('visible'); }
}

// ============================================
// SECTION 20: CHARTS
// ============================================
function initCharts() {
  var mc = document.getElementById('macroChart');
  var cc = document.getElementById('completionChart');
  if (!mc || !cc) return;

  var tc = currentTheme === 'dark' ? '#e8e8e8' : '#2C1810';

  macroChart = new Chart(mc.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Protein', 'Carbs', 'Fat'],
      datasets: [{ data: [0, 0, 0], backgroundColor: ['#4CAF50', '#C4A35A', '#5C4033'], borderWidth: 0 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 10, color: tc } } },
      cutout: '60%'
    }
  });

  completionChart = new Chart(cc.getContext('2d'), {
    type: 'radar',
    data: {
      labels: ['Protein', 'Vitamins', 'Minerals', 'Fats', 'Fiber'],
      datasets: [{
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(196,163,90,0.3)',
        borderColor: '#C4A35A', borderWidth: 2,
        pointBackgroundColor: '#C4A35A'
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          beginAtZero: true, max: 100,
          ticks: { display: false },
          grid: { color: 'rgba(196,163,90,0.2)' },
          angleLines: { color: 'rgba(196,163,90,0.2)' },
          pointLabels: { font: { size: 9 }, color: tc }
        }
      }
    }
  });
}

function updateCharts(totals) {
  if (!macroChart || !completionChart) return;

  macroChart.data.datasets[0].data = [totals.protein * 4, totals.carbs * 4, totals.fat * 9];
  macroChart.data.labels = currentLang === 'pt' ? ['Proteína', 'Hidratos', 'Gordura'] : ['Protein', 'Carbs', 'Fat'];
  macroChart.update();

  var ps = Math.min(totals.protein / dailyValues.protein * 100, 100);

  var vitKeys = ['vitaminA', 'vitaminC', 'vitaminE', 'vitaminK', 'vitaminB6', 'folate'];
  var vs = 0;
  for (var i = 0; i < vitKeys.length; i++) { vs += Math.min(totals[vitKeys[i]] / dailyValues[vitKeys[i]] * 100, 100); }
  vs = vs / vitKeys.length;

  var minKeys = ['calcium', 'iron', 'magnesium', 'zinc'];
  var ms = 0;
  for (var j = 0; j < minKeys.length; j++) { ms += Math.min(totals[minKeys[j]] / dailyValues[minKeys[j]] * 100, 100); }
  ms = ms / minKeys.length;

  var fs = Math.min(totals.omega3 / dailyValues.omega3 * 100, 100);
  var fbs = Math.min(totals.fiber / dailyValues.fiber * 100, 100);

  completionChart.data.datasets[0].data = [Math.round(ps), Math.round(vs), Math.round(ms), Math.round(fs), Math.round(fbs)];
  completionChart.data.labels = currentLang === 'pt' ? ['Proteína', 'Vitaminas', 'Minerais', 'Gorduras', 'Fibra'] : ['Protein', 'Vitamins', 'Minerals', 'Fats', 'Fiber'];
  completionChart.update();
}

// ============================================
// SECTION 21: MOBILE BAR
// ============================================
function updateMealBar() {
  var bar = document.getElementById('mealBar');
  var items = document.getElementById('mealBarItems');
  var cals = document.getElementById('mobileCalories');
  if (!bar || !items || !cals) return;

  var totals = calculateTotals();
  var ci = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;
  cals.textContent = Math.round(totals.calories) + ' kcal';

  if (ci.length > 0) {
    bar.classList.add('visible');
    items.innerHTML = ci.map(function(sel) {
      var ing = ingredients.find(function(i) { return i.id === sel.id; });
      if (!ing) return '';
      return '<span style="background:var(--gold);color:white;padding:0.25rem 0.5rem;border-radius:9999px;font-size:0.75rem">' +
        ing.emoji + ' ' + Math.round(sel.serving * 100) + 'g</span>';
    }).join('');
  } else {
    bar.classList.remove('visible');
  }
}

// ============================================
// SECTION 22: COMPARE
// ============================================
function populateCompareSelect() {
  var s = document.getElementById('compareSelect');
  if (!s) return;
  while (s.options.length > 1) s.remove(1);

  ingredients.filter(function(i) { return i.id !== 'tahini'; }).forEach(function(ing) {
    var o = document.createElement('option');
    o.value = ing.id;
    o.textContent = ing.emoji + ' ' + getIngredientName(ing);
    s.appendChild(o);
  });
}

function updateComparison() {
  var s = document.getElementById('compareSelect');
  var r = document.getElementById('compareResults');
  if (!s || !r || !s.value) { if (r) r.innerHTML = ''; return; }

  var tahini = ingredients.find(function(i) { return i.id === 'tahini'; });
  var comp = ingredients.find(function(i) { return i.id === s.value; });
  if (!tahini || !comp) return;

  var t = translations[currentLang].compare;
  var names = nutrientNames[currentLang];

  var nl = [
    { k: 'calories', u: 'kcal', lower: true }, { k: 'protein', u: 'g', lower: false },
    { k: 'calcium', u: 'mg', lower: false }, { k: 'iron', u: 'mg', lower: false },
    { k: 'zinc', u: 'mg', lower: false }, { k: 'magnesium', u: 'mg', lower: false },
    { k: 'fiber', u: 'g', lower: false }, { k: 'omega3', u: 'g', lower: false },
    { k: 'selenium', u: 'mcg', lower: false }, { k: 'phosphorus', u: 'mg', lower: false }
  ];

  var rows = nl.map(function(n) {
    var tv = tahini.nutrients[n.k] || 0;
    var cv = comp.nutrients[n.k] || 0;
    var tw = n.lower ? tv < cv : tv > cv;
    var cw = n.lower ? cv < tv : cv > tv;
    return '<tr><td>' + (names[n.k] || n.k) + '</td>' +
      '<td class="' + (tw ? 'winner' : '') + '">' + tv.toFixed(1) + n.u + '</td>' +
      '<td class="' + (cw ? 'winner' : '') + '">' + cv.toFixed(1) + n.u + '</td></tr>';
  }).join('');

  r.innerHTML = '<table class="compare-table"><thead><tr>' +
    '<th>' + t.nutrient + '</th><th>⭐ ' + t.tahini + '</th>' +
    '<th>' + comp.emoji + ' ' + getIngredientName(comp) + '</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>';
}

// ============================================
// SECTION 23: SAVE / LOAD / HISTORY
// ============================================
function saveMealFromModal() {
  var input = document.getElementById('mealNameInput');
  var name = (input && input.value ? input.value.trim() : '') || ('Meal ' + new Date().toLocaleDateString());
  var items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;

  if (!items.length) { showToast('⚠️ No ingredients', 'warning'); return; }

  var totals = calculateTotals();
  var meal = {
    id: Date.now().toString(), name: name, slot: currentMealSlot,
    date: new Date().toISOString(),
    items: JSON.parse(JSON.stringify(items)),
    summary: { calories: Math.round(totals.calories), protein: totals.protein.toFixed(1), ingredients: items.length }
  };

  var h = getMealHistory();
  h.unshift(meal);
  if (h.length > 50) h.pop();
  localStorage.setItem('abbaya-meals', JSON.stringify(h));

  if (input) input.value = '';
  closeModal('saveMealModal');
  renderMealHistory();
  showToast(translations[currentLang].toast.saved, 'success');
}

function getMealHistory() {
  try { return JSON.parse(localStorage.getItem('abbaya-meals')) || []; }
  catch (e) { return []; }
}

function loadMeal(id) {
  var meal = getMealHistory().find(function(m) { return m.id === id; });
  if (!meal) return;
  saveState();
  if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
  mealSlots[currentMealSlot] = JSON.parse(JSON.stringify(meal.items));
  selectedIngredients = mealSlots[currentMealSlot];
  refreshAll();
  showToast(translations[currentLang].toast.loaded, 'success');
}

function deleteMeal(id) {
  var filtered = getMealHistory().filter(function(m) { return m.id !== id; });
  localStorage.setItem('abbaya-meals', JSON.stringify(filtered));
  renderMealHistory();
  showToast(translations[currentLang].toast.deleted, 'info');
}

function duplicateMeal(id) {
  var h = getMealHistory();
  var meal = h.find(function(m) { return m.id === id; });
  if (!meal) return;
  var copy = JSON.parse(JSON.stringify(meal));
  copy.id = Date.now().toString();
  copy.name += ' (copy)';
  copy.date = new Date().toISOString();
  h.unshift(copy);
  localStorage.setItem('abbaya-meals', JSON.stringify(h));
  renderMealHistory();
  showToast('📋 Duplicated', 'success');
}

function renderMealHistory() {
  var c = document.getElementById('mealHistory');
  if (!c) return;
  var h = getMealHistory();
  var t = translations[currentLang].history;

  if (!h.length) { c.innerHTML = '<div class="empty-state">' + t.empty + '</div>'; return; }

  var locale = currentLang === 'pt' ? 'pt-PT' : 'en-US';
  c.innerHTML = h.slice(0, 10).map(function(meal) {
    var d = new Date(meal.date).toLocaleDateString(locale, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    var emojis = meal.items.map(function(i) {
      var ing = ingredients.find(function(x) { return x.id === i.id; });
      return ing ? ing.emoji : '🔬';
    }).join(' ');

    return '<div class="history-card">' +
      '<div class="history-card-header"><span class="history-card-title">' + meal.name + '</span><span class="history-card-date">' + d + '</span></div>' +
      '<div class="history-card-stats"><span>🔥 ' + meal.summary.calories + ' kcal</span><span>💪 ' + meal.summary.protein + 'g</span><span>🥗 ' + meal.summary.ingredients + '</span></div>' +
      '<div class="history-card-ingredients">' + emojis + '</div>' +
      '<div class="history-card-actions">' +
      '<button class="history-btn" onclick="loadMeal(\'' + meal.id + '\')">' + t.load + '</button>' +
      '<button class="history-btn" onclick="duplicateMeal(\'' + meal.id + '\')">' + t.duplicate + '</button>' +
      '<button class="history-btn danger" onclick="deleteMeal(\'' + meal.id + '\')">' + t.delete + '</button>' +
      '</div></div>';
  }).join('');
}

// ============================================
// SECTION 24: SHARE & EXPORT
// ============================================
function shareMeal() {
  var items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;
  if (!items.length) { showToast('⚠️ No ingredients', 'warning'); return; }
  openModal('shareModal');
}

function generateShareUrl() {
  var items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;
  var encoded = items.map(function(i) { return i.id + ':' + i.serving; }).join(',');
  return location.origin + location.pathname + '?meal=' + btoa(encoded);
}

function copyShareUrl() {
  var input = document.getElementById('shareUrlInput');
  if (!input) return;
  input.select();
  if (navigator.clipboard) { navigator.clipboard.writeText(input.value); }
  else { document.execCommand('copy'); }
  showToast(translations[currentLang].toast.copied, 'success');
  closeModal('shareModal');
}

function loadSharedMeal() {
  var params = new URLSearchParams(location.search);
  var data = params.get('meal');
  if (!data) return;

  try {
    var decoded = atob(data);
    var items = decoded.split(',').map(function(s) {
      var parts = s.split(':');
      return { id: parts[0], serving: parseFloat(parts[1]) || 1 };
    }).filter(function(i) {
      return ingredients.find(function(x) { return x.id === i.id; });
    });

    if (items.length) {
      mealSlots.breakfast = items;
      selectedIngredients = mealSlots.breakfast;
      currentMealSlot = 'breakfast';
      refreshAll();
      showToast('🔗 Shared meal loaded!', 'success');
      history.replaceState({}, '', location.pathname);
    }
  } catch (e) {}
}

function exportImage() {
  var el = document.getElementById('dashboardBody');
  if (!el || typeof html2canvas === 'undefined') {
    showToast('⚠️ Export not available', 'warning');
    return;
  }
  showToast('📸 Generating...', 'info', 2000);

  html2canvas(el, {
    backgroundColor: currentTheme === 'dark' ? '#16213e' : '#fff',
    scale: 2
  }).then(function(canvas) {
    var link = document.createElement('a');
    link.download = 'nutrition-' + new Date().toISOString().slice(0, 10) + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(translations[currentLang].toast.exported, 'success');
  }).catch(function() {
    showToast('⚠️ Export failed', 'error');
  });
}

// ============================================
// SECTION 25: KEYBOARD SHORTCUTS
// ============================================
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    var isCtrl = e.ctrlKey || e.metaKey;

    if (isCtrl && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
    if (isCtrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
    if (isCtrl && e.key === 's') { e.preventDefault(); openModal('saveMealModal'); }
    if (e.key === '/' && !isCtrl) {
      var searchEl = document.getElementById('ingredientSearch');
      if (document.activeElement !== searchEl) { e.preventDefault(); if (searchEl) searchEl.focus(); }
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.visible').forEach(function(m) { m.classList.remove('visible'); });
      hideApiResults();
    }
  });
}

// ============================================
// SECTION 26: SESSION PERSISTENCE
// ============================================
function saveSession() {
  try {
    localStorage.setItem('abbaya-session', JSON.stringify({
      mealSlots: mealSlots,
      currentMealSlot: currentMealSlot,
      apiIngredients: apiIngredients
    }));
  } catch (e) {}
}

function loadSession() {
  try {
    var s = JSON.parse(localStorage.getItem('abbaya-session'));
    if (s && s.mealSlots) {
      mealSlots = s.mealSlots;
      currentMealSlot = s.currentMealSlot || 'breakfast';
      if (currentMealSlot === 'all') { selectedIngredients = getAllIngredients(); }
      else { selectedIngredients = mealSlots[currentMealSlot]; }
    }
    if (s && s.apiIngredients) {
      for (var i = 0; i < s.apiIngredients.length; i++) {
        var a = s.apiIngredients[i];
        if (!ingredients.find(function(x) { return x.id === a.id; })) {
          ingredients.push(a);
          apiIngredients.push(a);
        }
      }
    }
  } catch (e) {}
}

setInterval(saveSession, 30000);
window.addEventListener('beforeunload', saveSession);

document.addEventListener('click', function(e) {
  var searchBox = document.querySelector('.search-box');
  if (searchBox && !searchBox.contains(e.target)) { hideApiResults(); }
  if (e.target.classList.contains('modal-overlay')) { e.target.classList.remove('visible'); }
});

// ============================================
// SECTION 27: REFRESH ALL
// ============================================
function refreshAll() {
  renderIngredients();
  renderSelectedItems();
  updateDashboard();
  updateMealBar();
  updateSlotCounts();
}

// ============================================
// SECTION 28: INIT
// ============================================
function init() {
  loadTheme();
  loadSession();
  loadPersonalPreferences();

  var lang = localStorage.getItem('abbaya-lang');
  if (lang) {
    currentLang = lang;
    var en = document.getElementById('langEn');
    var pt = document.getElementById('langPt');
    if (en) en.classList.toggle('active', lang === 'en');
    if (pt) pt.classList.toggle('active', lang === 'pt');
  }

  applyTranslations();
  setupCategoryPills();
  setupKeyboardShortcuts();
  initCharts();
  renderIngredients();
  renderSelectedItems();
  updateDashboard();
  updateMealBar();
  updateSlotCounts();
  populateCompareSelect();
  renderMealHistory();
  loadSharedMeal();
  updateUndoRedoButtons();

  document.querySelectorAll('.meal-slot-btn').forEach(function(btn) {
    var onclickAttr = btn.getAttribute('onclick') || '';
    if (onclickAttr.indexOf(currentMealSlot) !== -1) {
      btn.classList.add('active');
    }
  });

  console.log('🌿 Abbaya Nutrition Calculator v2.0 initialized');
}

document.addEventListener('DOMContentLoaded', init);
