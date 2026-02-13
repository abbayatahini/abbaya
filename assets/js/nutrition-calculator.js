// ================================================================
// ABBAYA NUTRITION CALCULATOR v2.0 - ENGINE
// ================================================================
// REQUIRED: Include BEFORE this file:
// 1. The translations object (from your existing code)
// 2. The ingredients array (from your existing code)  
// 3. The ingredientNamesPt object (from your existing code)
// 4. Chart.js CDN
// 5. html2canvas CDN (for export)
//
// This file adds: API integration, undo/redo, meal slots,
// save/load, share, export, overdose warnings, personalization,
// dark mode, keyboard shortcuts, session persistence
// ================================================================

// ============================================
// SECTION 1: CONFIG & CONSTANTS
// ============================================
const API_CONFIG = {
  USDA_API_KEY: 'DEMO_KEY', // Get free key: https://fdc.nal.usda.gov/api-key-signup.html
  USDA_BASE: 'https://api.nal.usda.gov/fdc/v1',
  OFF_BASE: 'https://world.openfoodfacts.org/api/v2'
};

const baseDailyValues = {
  calories: 2000, protein: 50, carbs: 300, fat: 65,
  histidine: 0.7, isoleucine: 1.4, leucine: 2.73, lysine: 2.1,
  methionine: 0.73, phenylalanine: 1.75, threonine: 1.05, tryptophan: 0.28, valine: 1.82,
  vitaminA: 900, vitaminC: 90, vitaminK: 120, vitaminB6: 1.3, folate: 400,
  vitaminE: 15, thiamin: 1.2, riboflavin: 1.3, niacin: 16,
  calcium: 1000, iron: 18, magnesium: 400, zinc: 11, potassium: 4700,
  phosphorus: 700, selenium: 55, copper: 0.9, manganese: 2.3,
  omega3: 1.6, omega6: 17, fiber: 28
};

let dailyValues = { ...baseDailyValues };

const upperLimits = {
  vitaminA: 3000, vitaminC: 2000, vitaminE: 1000, vitaminB6: 100,
  folate: 1000, niacin: 35, calcium: 2500, iron: 45,
  magnesium: 350, zinc: 40, selenium: 400, copper: 10,
  manganese: 11, phosphorus: 4000
};

const upperLimitWarnings = {
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

const nutrientNames = {
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

const mealPresets = {
  'buddha-bowl': {
    name: { en: 'Buddha Bowl', pt: 'Buddha Bowl' },
    items: [
      { id: 'quinoa', serving: 1.5 }, { id: 'chickpeas', serving: 1 },
      { id: 'avocado', serving: 0.5 }, { id: 'spinach', serving: 1 },
      { id: 'tahini', serving: 0.3 }, { id: 'bell-pepper-red', serving: 0.5 }
    ]
  },
  'power-smoothie': {
    name: { en: 'Power Smoothie', pt: 'Smoothie Energético' },
    items: [
      { id: 'banana', serving: 1.5 }, { id: 'blueberries', serving: 1 },
      { id: 'spinach', serving: 0.5 }, { id: 'chia-seeds', serving: 0.2 },
      { id: 'fortified-plant-milk', serving: 2.5 }
    ]
  },
  'protein-plate': {
    name: { en: 'Protein Plate', pt: 'Prato Proteico' },
    items: [
      { id: 'tofu', serving: 1.5 }, { id: 'brown-rice', serving: 1.5 },
      { id: 'broccoli', serving: 1 }, { id: 'pumpkin-seeds', serving: 0.3 },
      { id: 'nutritional-yeast', serving: 0.1 }
    ]
  },
  'mediterranean': {
    name: { en: 'Mediterranean', pt: 'Mediterrâneo' },
    items: [
      { id: 'chickpeas', serving: 1 }, { id: 'tahini', serving: 0.3 },
      { id: 'tomatoes', serving: 1 }, { id: 'olive-oil', serving: 0.15 },
      { id: 'kale', serving: 0.5 }, { id: 'lentils', serving: 0.75 }
    ]
  },
  'asian-bowl': {
    name: { en: 'Asian Bowl', pt: 'Bowl Asiático' },
    items: [
      { id: 'tofu', serving: 1 }, { id: 'brown-rice', serving: 1.5 },
      { id: 'edamame', serving: 0.75 }, { id: 'mushrooms', serving: 0.5 },
      { id: 'sesame-seeds', serving: 0.1 }
    ]
  }
};

// ============================================
// SECTION 2: STATE
// ============================================
let currentLang = 'en';
let currentCategory = 'all';
let searchQuery = '';
let currentView = 'select';
let macroChart = null;
let completionChart = null;
let currentTheme = 'light';
let currentMealSlot = 'breakfast';
let searchDebounceTimer = null;
let apiIngredients = [];

let mealSlots = { breakfast: [], lunch: [], dinner: [], snacks: [] };
let undoStack = [];
let redoStack = [];
const MAX_UNDO = 50;
let selectedIngredients = mealSlots.breakfast;

// ============================================
// SECTION 3: TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ============================================
// SECTION 4: MODALS
// ============================================
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('visible'); }
  if (id === 'shareModal') {
    document.getElementById('shareUrlInput').value = generateShareUrl();
  }
}

function closeModal(id) {
  const m = document.getElementById(id);
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
  const u = document.getElementById('undoBtn');
  const r = document.getElementById('redoBtn');
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
  const saved = localStorage.getItem('abbaya-theme');
  if (saved === 'dark') {
    currentTheme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = '☀️';
  }
}

// ============================================
// SECTION 7: LANGUAGE
// ============================================
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('abbaya-lang', lang);
  const en = document.getElementById('langEn');
  const pt = document.getElementById('langPt');
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
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = el.getAttribute('data-i18n').split('.').reduce((o, k) => o && o[k], t);
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = el.getAttribute('data-i18n-placeholder').split('.').reduce((o, k) => o && o[k], t);
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
  const gender = document.getElementById('personalGender').value;
  const age = parseInt(document.getElementById('personalAge').value) || 30;
  const weight = parseInt(document.getElementById('personalWeight').value) || 70;
  const activity = document.getElementById('personalActivity').value;
  const mult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, 'very-active': 1.9 }[activity] || 1.55;
  
  let bmr = gender === 'male' ? (10*weight + 6.25*175 - 5*age + 5) : (10*weight + 6.25*162 - 5*age - 161);
  const tdee = Math.round(bmr * mult);
  
  dailyValues = { ...baseDailyValues };
  dailyValues.calories = tdee;
  dailyValues.protein = Math.round(weight * 0.8);
  dailyValues.carbs = Math.round(tdee * 0.55 / 4);
  dailyValues.fat = Math.round(tdee * 0.3 / 9);
  dailyValues.fiber = gender === 'male' ? 38 : 25;
  
  const aminoPerKg = { histidine:0.01, isoleucine:0.02, leucine:0.039, lysine:0.03, methionine:0.0104, phenylalanine:0.025, threonine:0.015, tryptophan:0.004, valine:0.026 };
  Object.keys(aminoPerKg).forEach(k => { dailyValues[k] = aminoPerKg[k] * weight; });
  
  if (gender === 'male') { dailyValues.iron = 8; dailyValues.zinc = 11; dailyValues.magnesium = age > 30 ? 420 : 400; }
  else { dailyValues.iron = age > 50 ? 8 : 18; dailyValues.zinc = 8; dailyValues.magnesium = age > 30 ? 320 : 310; }
  if (age > 50) { dailyValues.vitaminB6 = 1.7; dailyValues.calcium = 1200; }
  
  localStorage.setItem('abbaya-personal', JSON.stringify({ gender, age, weight, activity }));
  updateDashboard();
  showToast('✅ Daily values updated', 'success', 2000);
}

function loadPersonalPreferences() {
  try {
    const p = JSON.parse(localStorage.getItem('abbaya-personal'));
    if (p) {
      document.getElementById('personalGender').value = p.gender || 'female';
      document.getElementById('personalAge').value = p.age || 30;
      document.getElementById('personalWeight').value = p.weight || 70;
      document.getElementById('personalActivity').value = p.activity || 'moderate';
      updatePersonalDV();
    }
  } catch(e) {}
}

// ============================================
// SECTION 9: MEAL SLOTS
// ============================================
function switchMealSlot(slot) {
  currentMealSlot = slot;
  selectedIngredients = slot === 'all' ? getAllIngredients() : mealSlots[slot];
  document.querySelectorAll('.meal-slot-btn').forEach(b => b.classList.remove('active'));
  if (event && event.target) event.target.closest('.meal-slot-btn').classList.add('active');
  refreshAll();
}

function getAllIngredients() {
  const map = {};
  Object.values(mealSlots).forEach(slot => {
    slot.forEach(item => {
      if (map[item.id]) map[item.id].serving += item.serving;
      else map[item.id] = { ...item };
    });
  });
  return Object.values(map);
}

function updateSlotCounts() {
  ['breakfast','lunch','dinner','snacks'].forEach(s => {
    const el = document.getElementById(s + 'Count');
    if (el) el.textContent = mealSlots[s].length;
  });
}

function loadPreset(presetId) {
  const preset = mealPresets[presetId];
  if (!preset) return;
  saveState();
  if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
  mealSlots[currentMealSlot] = preset.items.map(i => ({ ...i }));
  selectedIngredients = mealSlots[currentMealSlot];
  refreshAll();
  showToast(`🍽️ ${preset.name[currentLang]} loaded!`, 'success');
}

// ============================================
// SECTION 10: VIEW & CATEGORY
// ============================================
function setView(view, btn) {
  currentView = view;
  document.querySelectorAll('.view-toggle button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('selectView').style.display = view === 'select' ? 'block' : 'none';
  const cv = document.getElementById('compareView');
  cv.style.display = view === 'compare' ? 'block' : 'none';
  cv.classList.toggle('active', view === 'compare');
}

function setupCategoryPills() {
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
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
    searchDebounceTimer = setTimeout(() => searchFoodAPI(searchQuery), 500);
  } else { hideApiResults(); }
}

function filterIngredients() { handleSearch(); }

async function searchFoodAPI(query) {
  const div = document.getElementById('apiSearchResults');
  if (!div) return;
  div.innerHTML = '<div class="api-loading">🔍 Searching USDA database...</div>';
  div.classList.add('visible');
  try {
    const r = await fetch(`${API_CONFIG.USDA_BASE}/foods/search?api_key=${API_CONFIG.USDA_API_KEY}&query=${encodeURIComponent(query)}&dataType=Foundation,SR%20Legacy&pageSize=8`);
    if (!r.ok) throw new Error('USDA error');
    const data = await r.json();
    if (data.foods && data.foods.length > 0) {
      div.innerHTML = data.foods.map(f => `
        <div class="api-result-item" onclick="addApiFood(${f.fdcId},'${f.description.replace(/'/g,"\\'")}')">
          <span>🔬 ${f.description}</span><span class="api-badge">USDA</span>
        </div>`).join('');
    } else { await searchOFF(query, div); }
  } catch(e) {
    try { await searchOFF(query, div); }
    catch(e2) { div.innerHTML = '<div class="api-loading">Using local data only</div>'; setTimeout(hideApiResults, 3000); }
  }
}

async function searchOFF(query, div) {
  const r = await fetch(`${API_CONFIG.OFF_BASE}/search?search_terms=${encodeURIComponent(query)}&search_simple=1&json=1&page_size=8&fields=product_name,nutriments,code`);
  if (!r.ok) throw new Error('OFF error');
  const data = await r.json();
  const valid = (data.products || []).filter(p => p.product_name && p.nutriments);
  if (valid.length > 0) {
    div.innerHTML = valid.map(p => `
      <div class="api-result-item" onclick="addOFFFood('${p.code}','${(p.product_name||'').replace(/'/g,"\\'")}')">
        <span>🌍 ${p.product_name}</span><span class="api-badge" style="background:#4CAF50">OFF</span>
      </div>`).join('');
  } else { div.innerHTML = '<div class="api-loading">No results</div>'; setTimeout(hideApiResults, 2000); }
}

function hideApiResults() {
  const d = document.getElementById('apiSearchResults');
  if (d) d.classList.remove('visible');
}

async function addApiFood(fdcId, name) {
  hideApiResults();
  showToast(`⏳ Loading ${name}...`, 'info', 2000);
  try {
    const r = await fetch(`${API_CONFIG.USDA_BASE}/food/${fdcId}?api_key=${API_CONFIG.USDA_API_KEY}`);
    const data = await r.json();
    const n = parseUSDA(data);
    const ing = { id: `api-${fdcId}`, name: name.substring(0,50), category: 'api', emoji: '🔬', serving: '100g', isApi: true, nutrients: n };
    if (!ingredients.find(i => i.id === ing.id)) { ingredients.push(ing); apiIngredients.push(ing); }
    saveState();
    if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
    selectedIngredients.push({ id: ing.id, serving: 1 });
    refreshAll();
    showToast(`✅ ${name} added`, 'success');
  } catch(e) { showToast(translations[currentLang].toast.apiError, 'error'); }
}

function parseUSDA(data) {
  const n = { calories:0, protein:0, carbs:0, fat:0, histidine:0, isoleucine:0, leucine:0, lysine:0, methionine:0, phenylalanine:0, threonine:0, tryptophan:0, valine:0, vitaminA:0, vitaminC:0, vitaminK:0, vitaminB6:0, folate:0, vitaminE:0, thiamin:0, riboflavin:0, niacin:0, calcium:0, iron:0, magnesium:0, zinc:0, potassium:0, phosphorus:0, selenium:0, copper:0, manganese:0, omega3:0, omega6:0, fiber:0 };
  const map = { 1008:'calories',1003:'protein',1005:'carbs',1004:'fat',1221:'histidine',1212:'isoleucine',1213:'leucine',1214:'lysine',1215:'methionine',1217:'phenylalanine',1211:'threonine',1210:'tryptophan',1219:'valine',1106:'vitaminA',1162:'vitaminC',1185:'vitaminK',1175:'vitaminB6',1177:'folate',1109:'vitaminE',1165:'thiamin',1166:'riboflavin',1167:'niacin',1087:'calcium',1089:'iron',1090:'magnesium',1095:'zinc',1092:'potassium',1091:'phosphorus',1103:'selenium',1098:'copper',1101:'manganese',1079:'fiber',1404:'omega3',1269:'omega6' };
  if (data.foodNutrients) data.foodNutrients.forEach(fn => { const id = fn.nutrient?.id || fn.nutrientId; if (map[id]) n[map[id]] = fn.amount || 0; });
  return n;
}

async function addOFFFood(code, name) {
  hideApiResults();
  showToast(`⏳ Loading...`, 'info', 2000);
  try {
    const r = await fetch(`${API_CONFIG.OFF_BASE}/product/${code}.json?fields=product_name,nutriments`);
    const data = await r.json();
    const nm = data.product?.nutriments || {};
    const n = {
      calories: nm['energy-kcal_100g']||0, protein: nm.proteins_100g||0, carbs: nm.carbohydrates_100g||0,
      fat: nm.fat_100g||0, fiber: nm.fiber_100g||0,
      calcium: (nm.calcium_100g||0)*1000, iron: (nm.iron_100g||0)*1000,
      magnesium: (nm.magnesium_100g||0)*1000, zinc: (nm.zinc_100g||0)*1000,
      potassium: (nm.potassium_100g||0)*1000, phosphorus: (nm.phosphorus_100g||0)*1000,
      selenium: (nm.selenium_100g||0)*1e6, copper: (nm.copper_100g||0)*1000, manganese: (nm.manganese_100g||0)*1000,
      vitaminA: (nm['vitamin-a_100g']||0)*1e6, vitaminC: (nm['vitamin-c_100g']||0)*1000,
      vitaminE: (nm['vitamin-e_100g']||0)*1000, vitaminK: (nm['vitamin-k_100g']||0)*1e6,
      vitaminB6: (nm['vitamin-b6_100g']||0)*1000, folate: (nm.folates_100g||0)*1e6,
      thiamin: (nm['vitamin-b1_100g']||0)*1000, riboflavin: (nm['vitamin-b2_100g']||0)*1000,
      niacin: (nm['vitamin-pp_100g']||0)*1000,
      omega3: nm['omega-3-fat_100g']||0, omega6: nm['omega-6-fat_100g']||0,
      histidine:0, isoleucine:0, leucine:0, lysine:0, methionine:0, phenylalanine:0, threonine:0, tryptophan:0, valine:0
    };
    const ing = { id:`off-${code}`, name:name.substring(0,50), category:'api', emoji:'🌍', serving:'100g', isApi:true, nutrients:n };
    if (!ingredients.find(i=>i.id===ing.id)) { ingredients.push(ing); apiIngredients.push(ing); }
    saveState();
    if (currentMealSlot==='all') { currentMealSlot='breakfast'; selectedIngredients=mealSlots.breakfast; }
    selectedIngredients.push({ id:ing.id, serving:1 });
    refreshAll();
    showToast(`✅ ${name} added`, 'success');
  } catch(e) { showToast(translations[currentLang].toast.apiError, 'error'); }
}

// ============================================
// SECTION 12: RENDER INGREDIENTS
// ============================================
function renderIngredients() {
  const grid = document.getElementById('ingredientGrid');
  if (!grid) return;
  const t = translations[currentLang];
  let filtered = ingredients.filter(ing => {
    const cat = currentCategory === 'all' || ing.category === currentCategory;
    const name = getIngredientName(ing).toLowerCase();
    const search = !searchQuery || name.includes(searchQuery);
    return cat && search;
  });
  if (!filtered.length) { grid.innerHTML = `<div class="no-results">${t.noResults}</div>`; return; }
  grid.innerHTML = filtered.map(ing => {
    const sel = selectedIngredients.some(s => s.id === ing.id);
    const name = getIngredientName(ing);
    return `<div class="ingredient-card ${sel?'selected':''}" onclick="toggleIngredient('${ing.id}')" tabindex="0" onkeydown="if(event.key==='Enter')toggleIngredient('${ing.id}')">
      <div class="check-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div>
      ${ing.isApi?'<div class="api-tag">API</div>':''}
      <div class="emoji">${ing.emoji}</div>
      <div class="name">${name}</div>
      <div class="protein">${ing.nutrients.protein}g ${t.stats.protein.toLowerCase()}</div>
    </div>`;
  }).join('');
}

// ============================================
// SECTION 13: TOGGLE, SERVE, CLEAR
// ============================================
function toggleIngredient(id) {
  saveState();
  if (currentMealSlot === 'all') { currentMealSlot = 'breakfast'; selectedIngredients = mealSlots.breakfast; }
  const idx = selectedIngredients.findIndex(s => s.id === id);
  if (idx > -1) selectedIngredients.splice(idx, 1);
  else selectedIngredients.push({ id, serving: 1 });
  refreshAll();
}

function renderSelectedItems() {
  const c = document.getElementById('selectedItems');
  const cnt = document.getElementById('mealCount');
  if (!c || !cnt) return;
  const t = translations[currentLang];
  const items = currentMealSlot === 'all' ? getAllIngredients() : selectedIngredients;
  cnt.textContent = `(${items.length})`;
  if (!items.length) { c.innerHTML = `<div class="empty-state">${t.meal.empty}</div>`; return; }
  c.innerHTML = items.map(sel => {
    const ing = ingredients.find(i => i.id === sel.id);
    if (!ing) return '';
    const name = getIngredientName(ing);
    const grams = Math.round(sel.serving * 100);
    return `<div class="selected-item">
      <div class="selected-item-header">
        <span class="selected-item-name">${ing.emoji} ${name}</span>
        ${currentMealSlot!=='all'?`<button class="selected-item-remove" onclick="toggleIngredient('${sel.id}')">&times;</button>`:''}
      </div>
      <div class="serving-control">
        <span>${t.meal.serving}:</span>
        <input type="range" class="serving-slider" min="0.1" max="5" step="0.1" value="${sel.serving}" oninput="updateServing('${sel.id}',this.value)">
        <input type="number" class="gram-input" value="${grams}" min="10" max="500" step="10" onchange="updateServingGrams('${sel.id}',this.value)">
        <span style="font-size:0.75rem;color:var(--text-muted)">g</span>
      </div>
    </div>`;
  }).join('');
}

function updateServing(id, val) {
  const item = (currentMealSlot==='all' ? getAllSlotItems() : selectedIngredients).find(s=>s.id===id);
  if (item) { item.serving = parseFloat(val); renderSelectedItems(); updateDashboard(); updateMealBar(); }
}

function updateServingGrams(id, g) {
  const item = (currentMealSlot==='all' ? getAllSlotItems() : selectedIngredients).find(s=>s.id===id);
  if (item) { item.serving = parseFloat(g)/100; renderSelectedItems(); updateDashboard(); updateMealBar(); }
}

function getAllSlotItems() {
  const a = [];
  Object.values(mealSlots).forEach(s => s.forEach(i => a.push(i)));
  return a;
}

function clearAll() {
  saveState();
  if (currentMealSlot==='all') mealSlots = { breakfast:[], lunch:[], dinner:[], snacks:[] };
  else mealSlots[currentMealSlot] = [];
  selectedIngredients = currentMealSlot==='all' ? [] : mealSlots[currentMealSlot];
  document.getElementById('ingredientSearch').value = '';
  searchQuery = '';
  refreshAll();
  showToast(translations[currentLang].toast.cleared, 'info');
}

function addTahini() {
  saveState();
  if (currentMealSlot==='all') { currentMealSlot='breakfast'; selectedIngredients=mealSlots.breakfast; }
  if (!selectedIngredients.some(s=>s.id==='tahini')) {
    selectedIngredients.push({ id:'tahini', serving:0.3 });
    refreshAll();
    showToast('⭐ Tahini added!', 'success');
  }
}

// ============================================
// SECTION 14: CALCULATIONS
// ============================================
function calculateTotals() {
  const totals = { calories:0,protein:0,carbs:0,fat:0,histidine:0,isoleucine:0,leucine:0,lysine:0,methionine:0,phenylalanine:0,threonine:0,tryptophan:0,valine:0,vitaminA:0,vitaminC:0,vitaminK:0,vitaminB6:0,folate:0,vitaminE:0,thiamin:0,riboflavin:0,niacin:0,calcium:0,iron:0,magnesium:0,zinc:0,potassium:0,phosphorus:0,selenium:0,copper:0,manganese:0,omega3:0,omega6:0,fiber:0 };
  const items = currentMealSlot==='all' ? getAllIngredients() : selectedIngredients;
  items.forEach(sel => {
    const ing = ingredients.find(i=>i.id===sel.id);
    if (ing?.nutrients) Object.keys(totals).forEach(k => { if (ing.nutrients[k]!==undefined) totals[k] += ing.nutrients[k]*sel.serving; });
  });
  return totals;
}

// ============================================
// SECTION 15: DASHBOARD UPDATE
// ============================================
function updateDashboard() {
  const totals = calculateTotals();
  const items = currentMealSlot==='all' ? getAllIngredients() : selectedIngredients;
  
  document.getElementById('heroCalories').textContent = Math.round(totals.calories);
  document.getElementById('heroProtein').textContent = totals.protein.toFixed(1)+'g';
  document.getElementById('heroItems').textContent = items.length;
  document.getElementById('totalCalories').textContent = Math.round(totals.calories);
  document.getElementById('totalCarbs').textContent = totals.carbs.toFixed(1)+'g';
  document.getElementById('totalFat').textContent = totals.fat.toFixed(1)+'g';
  
  // B12 warning
  const b12 = document.getElementById('b12Warning');
  if (b12) b12.style.display = items.length > 0 ? 'flex' : 'none';
  
  checkOverdoseWarnings(totals);
  updateScore(totals);
  
  updateNutrientSection('amino', totals, ['histidine','isoleucine','leucine','lysine','methionine','phenylalanine','threonine','tryptophan','valine'], 'g');
  updateNutrientSection('vitamin', totals, ['vitaminA','vitaminC','vitaminE','vitaminK','vitaminB6','folate','thiamin','riboflavin','niacin'], null);
  updateNutrientSection('mineral', totals, ['calcium','iron','magnesium','zinc','potassium','phosphorus','selenium','copper','manganese'], null);
  updateNutrientSection('fat', totals, ['omega3','omega6','fiber'], 'g');
  
  updateSuggestions(totals);
  updateTahiniPromo();
  updateCharts(totals);
  updateSlotCounts();
}

// ============================================
// SECTION 16: OVERDOSE WARNINGS
// ============================================
function checkOverdoseWarnings(totals) {
  const c = document.getElementById('warningsSection');
  if (!c) return;
  const names = nutrientNames[currentLang];
  const warns = upperLimitWarnings[currentLang];
  const t = translations[currentLang].warning;
  let html = '';
  Object.keys(upperLimits).forEach(k => {
    const v = totals[k]||0;
    const limit = upperLimits[k];
    if (v > limit) {
      const pct = Math.round(v/limit*100);
      const danger = v > limit*1.5;
      html += `<div class="warning-card ${danger?'danger':''}">
        <span class="warning-icon">${danger?'🚨':'⚠️'}</span>
        <div class="warning-text"><strong>${t.overdosePrefix} ${names[k]}: ${pct}% of upper limit</strong><br>${warns[k]||t.overdoseSuffix}</div>
      </div>`;
    }
  });
  c.innerHTML = html;
}

// ============================================
// SECTION 17: SCORE
// ============================================
function updateScore(totals) {
  const keys = Object.keys(dailyValues).filter(k=>!['calories','carbs','fat','protein'].includes(k));
  let total = 0;
  keys.forEach(k => { total += Math.min((totals[k]/dailyValues[k])*100, 100); });
  const score = Math.round(total/keys.length);
  document.getElementById('scoreValue').textContent = score+'%';
  document.getElementById('heroScore').textContent = score+'%';
  const p = document.getElementById('scoreProgress');
  if (p) {
    const c = 2*Math.PI*44;
    p.style.strokeDashoffset = c - (score/100)*c;
    p.style.stroke = score>=80?'var(--success)':score>=50?'var(--warning)':'var(--gold)';
  }
}

// ============================================
// SECTION 18: NUTRIENT BARS
// ============================================
function updateNutrientSection(type, totals, keys, defaultUnit) {
  const bars = document.getElementById(type+'Bars');
  const status = document.getElementById(type+'Status');
  if (!bars||!status) return;
  const names = nutrientNames[currentLang];
  const unitMap = { vitaminA:'mcg', vitaminC:'mg', vitaminE:'mg', vitaminK:'mcg', vitaminB6:'mg', folate:'mcg', thiamin:'mg', riboflavin:'mg', niacin:'mg', calcium:'mg', iron:'mg', magnesium:'mg', zinc:'mg', potassium:'mg', phosphorus:'mg', selenium:'mcg', copper:'mg', manganese:'mg' };
  let allMet=true, someMet=false;
  
  bars.innerHTML = keys.map(k => {
    const v = totals[k]||0;
    const dv = dailyValues[k];
    if (!dv) return '';
    const pct = Math.min(v/dv*100, 100);
    const dpct = Math.round(v/dv*100);
    const ul = upperLimits[k];
    const over = ul && v > ul;
    const unit = defaultUnit || unitMap[k] || 'mg';
    
    if (pct>=100) someMet=true; else allMet=false;
    let cls = 'low';
    if (over) cls='overdose'; else if (pct>=100) cls='good'; else if (pct>=50) cls='medium';
    
    return `<div class="nutrient-bar">
      <div class="bar-header">
        <span class="bar-name">${names[k]||k} ${over?'<span class="overdose-icon">⚠️</span>':''}</span>
        <span class="bar-value">${v.toFixed(2)}${unit} (${dpct}%)</span>
      </div>
      <div class="bar-track"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
  
  if (allMet) { status.className='status good'; status.innerHTML='&#10003;'; }
  else if (someMet) { status.className='status warning'; status.innerHTML='!'; }
  else { status.className='status bad'; status.innerHTML='!'; }
}

function toggleSection(id) {
  const s = document.getElementById(id);
  if (s) s.classList.toggle('expanded');
}

// ============================================
// SECTION 19: SUGGESTIONS
// ============================================
function updateSuggestions(totals) {
  const c = document.getElementById('suggestionList');
  if (!c) return;
  const t = translations[currentLang].suggestions;
  const items = currentMealSlot==='all' ? getAllIngredients() : selectedIngredients;
  const sug = [];
  
  if (items.length>0) sug.push(t.addB12);
  if (totals.lysine<dailyValues.lysine*0.5) sug.push(t.addLegumes);
  if (totals.methionine<dailyValues.methionine*0.5) sug.push(t.addGrains);
  if (totals.calcium<dailyValues.calcium*0.5) sug.push(t.addCalcium);
  if (totals.iron<dailyValues.iron*0.5) sug.push(t.addIron);
  if (totals.zinc<dailyValues.zinc*0.5) sug.push(t.addZinc);
  if (totals.omega3<dailyValues.omega3*0.5) sug.push(t.addOmega3);
  if (totals.vitaminC<dailyValues.vitaminC*0.5) sug.push(t.addVitaminC);
  if (items.length>0 && t.addVitaminD) sug.push(t.addVitaminD);
  
  const valid = sug.filter(s=>s);
  if (!valid.length) {
    c.innerHTML = items.length===0 ? `<div class="suggestion-item">${t.default}</div>` : `<div class="suggestion-item" style="color:var(--success)">${t.balanced}</div>`;
  } else {
    c.innerHTML = valid.map(s=>`<div class="suggestion-item">${s}</div>`).join('');
  }
}

function updateTahiniPromo() {
  const p = document.getElementById('tahiniPromo');
  if (!p) return;
  const items = currentMealSlot==='all' ? getAllIngredients() : selectedIngredients;
  p.classList.toggle('visible', items.length>0 && !items.some(s=>s.id==='tahini'));
}

// ============================================
// SECTION 20: CHARTS
// ============================================
function initCharts() {
  const mc = document.getElementById('macroChart');
  const cc = document.getElementById('completionChart');
  if (!mc||!cc) return;
  const tc = currentTheme==='dark' ? '#e8e8e8' : '#2C1810';
  
  macroChart = new Chart(mc.getContext('2d'), {
    type:'doughnut', data:{ labels:['Protein','Carbs','Fat'], datasets:[{ data:[0,0,0], backgroundColor:['#4CAF50','#C4A35A','#5C4033'], borderWidth:0 }]},
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ font:{size:10}, padding:10, color:tc }}}, cutout:'60%' }
  });
  
  completionChart = new Chart(cc.getContext('2d'), {
    type:'radar', data:{ labels:['Protein','Vitamins','Minerals','Fats','Fiber'], datasets:[{ data:[0,0,0,0,0], backgroundColor:'rgba(196,163,90,0.3)', borderColor:'#C4A35A', borderWidth:2, pointBackgroundColor:'#C4A35A' }]},
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}}, scales:{ r:{ beginAtZero:true, max:100, ticks:{display:false}, grid:{color:'rgba(196,163,90,0.2)'}, angleLines:{color:'rgba(196,163,90,0.2)'}, pointLabels:{font:{size:9},color:tc} }}}
  });
}

function updateCharts(totals) {
  if (!macroChart||!completionChart) return;
  macroChart.data.datasets[0].data = [totals.protein*4, totals.carbs*4, totals.fat*9];
  macroChart.data.labels = currentLang==='pt' ? ['Proteína','Hidratos','Gordura'] : ['Protein','Carbs','Fat'];
  macroChart.update();
  
  const ps = Math.min(totals.protein/dailyValues.protein*100,100);
  const vs = ['vitaminA','vitaminC','vitaminE','vitaminK','vitaminB6','folate'].reduce((s,k)=>s+Math.min(totals[k]/dailyValues[k]*100,100),0)/6;
  const ms = ['calcium','iron','magnesium','zinc'].reduce((s,k)=>s+Math.min(totals[k]/dailyValues[k]*100,100),0)/4;
  const fs = Math.min(totals.omega3/dailyValues.omega3*100,100);
  const fbs = Math.min(totals.fiber/dailyValues.fiber*100,100);
  
  completionChart.data.datasets[0].data = [Math.round(ps),Math.round(vs),Math.round(ms),Math.round(fs),Math.round(fbs)];
  completionChart.data.labels = currentLang==='pt' ? ['Proteína','Vitaminas','Minerais','Gorduras','Fibra'] : ['Protein','Vitamins','Minerals','Fats','Fiber'];
  completionChart.update();
}

// ============================================
// SECTION 21: MOBILE BAR
// ============================================
function updateMealBar() {
  const bar=document.getElementById('mealBar'), items=document.getElementById('mealBarItems'), cals=document.getElementById('mobileCalories');
  if (!bar||!items||!cals) return;
  const totals = calculateTotals();
  const ci = currentMealSlot==='all' ? getAllIngredients() : selectedIngredients;
  cals.textContent = Math.round(totals.calories)+' kcal';
  if (ci.length>0) {
    bar.classList.add('visible');
    items.innerHTML = ci.map(sel => { const ing=ingredients.find(i=>i.id===sel.id); return ing?`<span style="background:var(--gold);color:white;padding:0.25rem 0.5rem;border-radius:9999px;font-size:0.75rem">${ing.emoji} ${Math.round(sel.serving*100)}g</span>`:''; }).join('');
  } else bar.classList.remove('visible');
}

// ============================================
// SECTION 22: COMPARE
// ============================================
function populateCompareSelect() {
  const s = document.getElementById('compareSelect');
  if (!s) return;
  while (s.options.length>1) s.remove(1);
  ingredients.filter(i=>i.id!=='tahini').forEach(ing => {
    const o = document.createElement('option');
    o.value = ing.id;
    o.textContent = `${ing.emoji} ${getIngredientName(ing)}`;
    s.appendChild(o);
  });
}

function updateComparison() {
  const s=document.getElementById('compareSelect'), r=document.getElementById('compareResults');
  if (!s||!r||!s.value) { if(r) r.innerHTML=''; return; }
  const tahini=ingredients.find(i=>i.id==='tahini'), comp=ingredients.find(i=>i.id===s.value);
  if (!tahini||!comp) return;
  const t=translations[currentLang].compare, names=nutrientNames[currentLang];
  const nl = [{k:'calories',u:'kcal',lower:true},{k:'protein',u:'g'},{k:'calcium',u:'mg'},{k:'iron',u:'mg'},{k:'zinc',u:'mg'},{k:'magnesium',u:'mg'},{k:'fiber',u:'g'},{k:'omega3',u:'g'},{k:'selenium',u:'mcg'},{k:'phosphorus',u:'mg'}];
  r.innerHTML = `<table class="compare-table"><thead><tr><th>${t.nutrient}</th><th>⭐ ${t.tahini}</th><th>${comp.emoji} ${getIngredientName(comp)}</th></tr></thead><tbody>
    ${nl.map(n=>{const tv=tahini.nutrients[n.k]||0,cv=comp.nutrients[n.k]||0,tw=n.lower?tv<cv:tv>cv,cw=n.lower?cv<tv:cv>tv;
    return `<tr><td>${names[n.k]||n.k}</td><td class="${tw?'winner':''}">${tv.toFixed(1)}${n.u}</td><td class="${cw?'winner':''}">${cv.toFixed(1)}${n.u}</td></tr>`;}).join('')}
  </tbody></table>`;
}

// ============================================
// SECTION 23: SAVE / LOAD / HISTORY
// ============================================
function saveMealFromModal() {
  const input = document.getElementById('mealNameInput');
  const name = (input?.value||'').trim() || `Meal ${new Date().toLocaleDateString()}`;
  const items = currentMealSlot==='all' ? getAllIngredients() : selectedIngredients;
  if (!items.length) { showToast('⚠️ No ingredients','warning'); return; }
  const totals = calculateTotals();
  const meal = { id:Date.now().toString(), name, slot:currentMealSlot, date:new Date().toISOString(), items:JSON.parse(JSON.stringify(items)), summary:{ calories:Math.round(totals.calories), protein:totals.protein.toFixed(1), ingredients:items.length }};
  const h = getMealHistory(); h.unshift(meal); if(h.length>50)h.pop();
  localStorage.setItem('abbaya-meals', JSON.stringify(h));
  if(input) input.value='';
  closeModal('saveMealModal');
  renderMealHistory();
  showToast(translations[currentLang].toast.saved, 'success');
}

function getMealHistory() { try { return JSON.parse(localStorage.getItem('abbaya-meals'))||[]; } catch{return[];} }

function loadMeal(id) {
  const meal = getMealHistory().find(m=>m.id===id);
  if (!meal) return;
  saveState();
  if (currentMealSlot==='all') { currentMealSlot='breakfast'; selectedIngredients=mealSlots.breakfast; }
  mealSlots[currentMealSlot] = JSON.parse(JSON.stringify(meal.items));
  selectedIngredients = mealSlots[currentMealSlot];
  refreshAll();
  showToast(translations[currentLang].toast.loaded, 'success');
}

function deleteMeal(id) {
  localStorage.setItem('abbaya-meals', JSON.stringify(getMealHistory().filter(m=>m.id!==id)));
  renderMealHistory();
  showToast(translations[currentLang].toast.deleted, 'info');
}

function duplicateMeal(id) {
  const h=getMealHistory(), meal=h.find(m=>m.id===id);
  if (!meal) return;
  const copy=JSON.parse(JSON.stringify(meal));
  copy.id=Date.now().toString(); copy.name+=' (copy)'; copy.date=new Date().toISOString();
  h.unshift(copy);
  localStorage.setItem('abbaya-meals', JSON.stringify(h));
  renderMealHistory();
  showToast('📋 Duplicated', 'success');
}

function renderMealHistory() {
  const c=document.getElementById('mealHistory');
  if (!c) return;
  const h=getMealHistory(), t=translations[currentLang].history;
  if (!h.length) { c.innerHTML=`<div class="empty-state">${t.empty}</div>`; return; }
  c.innerHTML = h.slice(0,10).map(meal => {
    const d=new Date(meal.date).toLocaleDateString(currentLang==='pt'?'pt-PT':'en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
    const emojis=meal.items.map(i=>{const ing=ingredients.find(x=>x.id===i.id);return ing?ing.emoji:'🔬';}).join(' ');
    return `<div class="history-card">
      <div class="history-card-header"><span class="history-card-title">${meal.name}</span><span class="history-card-date">${d}</span></div>
      <div class="history-card-stats"><span>🔥 ${meal.summary.calories} kcal</span><span>💪 ${meal.summary.protein}g</span><span>🥗 ${meal.summary.ingredients}</span></div>
      <div class="history-card-ingredients">${emojis}</div>
      <div class="history-card-actions">
        <button class="history-btn" onclick="loadMeal('${meal.id}')">${t.load}</button>
        <button class="history-btn" onclick="duplicateMeal('${meal.id}')">${t.duplicate}</button>
        <button class="history-btn danger" onclick="deleteMeal('${meal.id}')">${t.delete}</button>
      </div></div>`;
  }).join('');
}

// ============================================
// SECTION 24: SHARE & EXPORT
// ============================================
function shareMeal() {
  const items = currentMealSlot==='all' ? getAllIngredients() : selectedIngredients;
  if (!items.length) { showToast('⚠️ No ingredients','warning'); return; }
  openModal('shareModal');
}

function generateShareUrl() {
  const items = currentMealSlot==='all' ? getAllIngredients() : selectedIngredients;
  return `${location.origin}${location.pathname}?meal=${btoa(items.map(i=>`${i.id}:${i.serving}`).join(','))}`;
}

function copyShareUrl() {
  const input=document.getElementById('shareUrlInput');
  if (!input) return;
  input.select();
  if (navigator.clipboard) navigator.clipboard.writeText(input.value);
  else document.execCommand('copy');
  showToast(translations[currentLang].toast.copied, 'success');
  closeModal('shareModal');
}

function loadSharedMeal() {
  const data = new URLSearchParams(location.search).get('meal');
  if (!data) return;
  try {
    const items = atob(data).split(',').map(s=>{const[id,sv]=s.split(':');return{id,serving:parseFloat(sv)||1};}).filter(i=>ingredients.find(x=>x.id===i.id));
    if (items.length) {
      mealSlots.breakfast=items; selectedIngredients=mealSlots.breakfast; currentMealSlot='breakfast';
      refreshAll(); showToast('🔗 Shared meal loaded!','success');
      history.replaceState({},'',location.pathname);
    }
  } catch(e){}
}

async function exportImage() {
  const el=document.getElementById('dashboardBody');
  if (!el||typeof html2canvas==='undefined') { showToast('⚠️ Export not available','warning'); return; }
  showToast('📸 Generating...','info',2000);
  try {
    const canvas = await html2canvas(el,{ backgroundColor:currentTheme==='dark'?'#16213e':'#fff', scale:2 });
    const link=document.createElement('a');
    link.download=`nutrition-${new Date().toISOString().slice(0,10)}.png`;
    link.href=canvas.toDataURL('image/png');
    link.click();
    showToast(translations[currentLang].toast.exported,'success');
  } catch(e) { showToast('⚠️ Export failed','error'); }
}

// ============================================
// SECTION 25: KEYBOARD SHORTCUTS
// ============================================
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey||e.metaKey) && e.key==='z' && !e.shiftKey) { e.preventDefault(); undo(); }
    if ((e.ctrlKey||e.metaKey) && (e.key==='y'||(e.key==='z'&&e.shiftKey))) { e.preventDefault(); redo(); }
    if ((e.ctrlKey||e.metaKey) && e.key==='s') { e.preventDefault(); openModal('saveMealModal'); }
    if (e.key==='/' && !e.ctrlKey && !e.metaKey && document.activeElement!==document.getElementById('ingredientSearch')) { e.preventDefault(); document.getElementById('ingredientSearch')?.focus(); }
    if (e.key==='Escape') { document.querySelectorAll('.modal-overlay.visible').forEach(m=>m.classList.remove('visible')); hideApiResults(); }
  });
}

// ============================================
// SECTION 26: SESSION PERSISTENCE
// ============================================
function saveSession() {
  try { localStorage.setItem('abbaya-session', JSON.stringify({ mealSlots, currentMealSlot, apiIngredients })); } catch(e){}
}

function loadSession() {
  try {
    const s = JSON.parse(localStorage.getItem('abbaya-session'));
    if (s?.mealSlots) {
      mealSlots = s.mealSlots;
      currentMealSlot = s.currentMealSlot || 'breakfast';
      selectedIngredients = currentMealSlot==='all' ? getAllIngredients() : mealSlots[currentMealSlot];
    }
    if (s?.apiIngredients) s.apiIngredients.forEach(a => { if (!ingredients.find(i=>i.id===a.id)) { ingredients.push(a); apiIngredients.push(a); }});
  } catch(e){}
}

setInterval(saveSession, 30000);
window.addEventListener('beforeunload', saveSession);

// Close API results & modals on outside click
document.addEventListener('click', e => {
  if (!document.querySelector('.search-box')?.contains(e.target)) hideApiResults();
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('visible');
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
  
  const lang = localStorage.getItem('abbaya-lang');
  if (lang) { currentLang=lang; const en=document
  // ============================================
// SECTION 28: INIT
// ============================================
function init() {
  loadTheme();
  loadSession();
  loadPersonalPreferences();

  const lang = localStorage.getItem('abbaya-lang');
  if (lang) {
    currentLang = lang;
    const en = document.getElementById('langEn');
    const pt = document.getElementById('langPt');
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

  // Auto-select meal slot button
  document.querySelectorAll('.meal-slot-btn').forEach(btn => {
    if (btn.dataset.slot === currentMealSlot) {
      btn.classList.add('active');
    }
  });

  console.log('🌿 Abbaya Nutrition Calculator v2.0 initialized');
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
