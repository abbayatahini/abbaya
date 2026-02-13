// ================================================================
// ABBAYA NUTRITION CALCULATOR - TRANSLATIONS
// ================================================================
const translations = {
  en: {
    hero: {
      title: 'Vegan Nutrition Calculator',
      subtitle: 'Build your meal. Track calories. Check completeness.'
    },
    stats: {
      calories: 'Calories',
      protein: 'Protein',
      complete: 'Complete',
      ingredients: 'Ingredients'
    },
    personal: {
      gender: 'Gender',
      age: 'Age',
      weight: 'Weight (kg)',
      activity: 'Activity'
    },
    slot: {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snacks: 'Snacks',
      viewAll: 'View All'
    },
    panel: {
      ingredients: 'Select Ingredients',
      dashboard: 'Nutrition Dashboard',
      suggestions: 'Suggestions'
    },
    view: {
      select: 'Select',
      compare: 'Compare'
    },
    presets: {
      quickMeals: 'Quick Meals'
    },
    category: {
      all: 'All',
      legumes: 'Legumes',
      grains: 'Grains',
      nutsSeeds: 'Nuts & Seeds',
      vegetables: 'Vegetables',
      fruits: 'Fruits',
      fermented: 'Fermented',
      other: 'Other'
    },
    meal: {
      yourMeal: 'Your Meal',
      empty: 'No ingredients selected. Choose ingredients above to build your meal.',
      clearAll: 'Clear All',
      serving: 'Serving'
    },
    macro: {
      calories: 'Calories',
      carbs: 'Carbs',
      fat: 'Fat'
    },
    chart: {
      macros: 'Macronutrients',
      completion: 'Daily Values'
    },
    section: {
      amino: 'Essential Amino Acids',
      vitamins: 'Key Vitamins',
      minerals: 'Essential Minerals',
      fats: 'Healthy Fats & Fiber'
    },
    score: {
      complete: 'Complete'
    },
    warning: {
      b12Title: 'Vitamin B12 Required!',
      b12Text: 'Vitamin B12 is not naturally available in plant foods. All vegans should supplement B12 (at least 250mcg/day).',
      overdosePrefix: 'Excess',
      overdoseSuffix: 'Consider reducing intake.'
    },
    suggestions: {
      title: 'Suggestions',
      default: 'Select ingredients to get personalized suggestions.',
      balanced: '✅ Great job! Your meal looks nutritionally balanced.',
      addB12: '💊 <strong>B12 Supplement:</strong> Take at least 250mcg/day — no plant food provides enough B12.',
      addLegumes: '🫘 <strong>Add legumes</strong> (lentils, chickpeas, beans) for more lysine and protein.',
      addGrains: '🌾 <strong>Add grains</strong> (quinoa, brown rice, oats) for methionine and energy.',
      addCalcium: '🥬 <strong>Boost calcium:</strong> Add tahini, kale, fortified plant milk, or tofu.',
      addIron: '🥗 <strong>Boost iron:</strong> Add lentils, spinach, pumpkin seeds, or tofu.',
      addZinc: '🎃 <strong>Boost zinc:</strong> Add pumpkin seeds, chickpeas, oats, or cashews.',
      addOmega3: '🐟 <strong>Boost omega-3:</strong> Add chia seeds, flaxseeds, hemp seeds, or walnuts.',
      addVitaminC: '🍊 <strong>Boost vitamin C:</strong> Add bell peppers, broccoli, strawberries, or kiwi.',
      addVitaminD: '☀️ <strong>Vitamin D:</strong> Consider a supplement (1000-2000 IU/day), especially in winter.'
    },
    compare: {
      description: 'See how tahini compares to other foods per 100g serving:',
      select: '-- Select a food to compare --',
      nutrient: 'Nutrient',
      tahini: 'Tahini',
      winner: 'Winner'
    },
    promo: {
      message: 'adds calcium, iron, zinc & healthy fats!',
      add: '⭐ Add Tahini',
      learn: 'Learn More'
    },
    tips: {
      title: '💡 Nutrition Tips',
      default: 'Combine legumes with grains for complete protein. Add vitamin C-rich foods to increase iron absorption. Soak nuts and seeds to improve mineral bioavailability!'
    },
    history: {
      title: 'Saved Meals',
      empty: 'No saved meals yet. Build a meal and save it!',
      load: '📂 Load',
      duplicate: '📋 Copy',
      delete: '🗑️ Delete'
    },
    modal: {
      saveMeal: 'Save This Meal',
      saveBtn: 'Save Meal',
      shareMeal: 'Share This Meal',
      shareDesc: 'Copy this link to share your meal with anyone:',
      copyBtn: 'Copy Link'
    },
    action: {
      undo: 'Undo',
      redo: 'Redo',
      save: 'Save',
      share: 'Share',
      export: 'Export',
      print: 'Print'
    },
    toast: {
      saved: '✅ Meal saved successfully!',
      loaded: '📂 Meal loaded!',
      deleted: '🗑️ Meal deleted.',
      cleared: '🧹 All ingredients cleared.',
      copied: '📋 Link copied to clipboard!',
      exported: '📸 Image exported!',
      undone: '↩️ Undone',
      redone: '↪️ Redone',
      apiError: '⚠️ Could not load from API. Try again later.'
    },
    noResults: 'No ingredients found. Try a different search or check the USDA database above.',
    searchPlaceholder: 'Search ingredients (local + USDA)...'
  },

  pt: {
    hero: {
      title: 'Calculadora Nutricional Vegana',
      subtitle: 'Monte a sua refeição. Rastreie calorias. Verifique a completude.'
    },
    stats: {
      calories: 'Calorias',
      protein: 'Proteína',
      complete: 'Completo',
      ingredients: 'Ingredientes'
    },
    personal: {
      gender: 'Género',
      age: 'Idade',
      weight: 'Peso (kg)',
      activity: 'Atividade'
    },
    slot: {
      breakfast: 'Pequeno-almoço',
      lunch: 'Almoço',
      dinner: 'Jantar',
      snacks: 'Lanches',
      viewAll: 'Ver Tudo'
    },
    panel: {
      ingredients: 'Selecionar Ingredientes',
      dashboard: 'Painel Nutricional',
      suggestions: 'Sugestões'
    },
    view: {
      select: 'Selecionar',
      compare: 'Comparar'
    },
    presets: {
      quickMeals: 'Refeições Rápidas'
    },
    category: {
      all: 'Todos',
      legumes: 'Leguminosas',
      grains: 'Cereais',
      nutsSeeds: 'Nozes e Sementes',
      vegetables: 'Vegetais',
      fruits: 'Frutas',
      fermented: 'Fermentados',
      other: 'Outros'
    },
    meal: {
      yourMeal: 'A Sua Refeição',
      empty: 'Nenhum ingrediente selecionado. Escolha ingredientes acima.',
      clearAll: 'Limpar Tudo',
      serving: 'Porção'
    },
    macro: {
      calories: 'Calorias',
      carbs: 'Hidratos',
      fat: 'Gordura'
    },
    chart: {
      macros: 'Macronutrientes',
      completion: 'Valores Diários'
    },
    section: {
      amino: 'Aminoácidos Essenciais',
      vitamins: 'Vitaminas Chave',
      minerals: 'Minerais Essenciais',
      fats: 'Gorduras Saudáveis e Fibra'
    },
    score: {
      complete: 'Completo'
    },
    warning: {
      b12Title: 'Vitamina B12 Necessária!',
      b12Text: 'A vitamina B12 não está disponível em alimentos vegetais. Todos os veganos devem suplementar B12 (pelo menos 250mcg/dia).',
      overdosePrefix: 'Excesso de',
      overdoseSuffix: 'Considere reduzir a ingestão.'
    },
    suggestions: {
      title: 'Sugestões',
      default: 'Selecione ingredientes para obter sugestões personalizadas.',
      balanced: '✅ Excelente! A sua refeição está nutricionalmente equilibrada.',
      addB12: '💊 <strong>Suplemento B12:</strong> Tome pelo menos 250mcg/dia — nenhum alimento vegetal fornece B12 suficiente.',
      addLegumes: '🫘 <strong>Adicione leguminosas</strong> (lentilhas, grão-de-bico, feijão) para mais lisina e proteína.',
      addGrains: '🌾 <strong>Adicione cereais</strong> (quinoa, arroz integral, aveia) para metionina e energia.',
      addCalcium: '🥬 <strong>Mais cálcio:</strong> Adicione tahini, couve, leite vegetal fortificado ou tofu.',
      addIron: '🥗 <strong>Mais ferro:</strong> Adicione lentilhas, espinafre, sementes de abóbora ou tofu.',
      addZinc: '🎃 <strong>Mais zinco:</strong> Adicione sementes de abóbora, grão-de-bico, aveia ou cajus.',
      addOmega3: '🐟 <strong>Mais ómega-3:</strong> Adicione sementes de chia, linhaça, cânhamo ou nozes.',
      addVitaminC: '🍊 <strong>Mais vitamina C:</strong> Adicione pimentos, brócolos, morangos ou kiwi.',
      addVitaminD: '☀️ <strong>Vitamina D:</strong> Considere suplementar (1000-2000 UI/dia), especialmente no inverno.'
    },
    compare: {
      description: 'Veja como o tahini se compara a outros alimentos por porção de 100g:',
      select: '-- Selecione um alimento para comparar --',
      nutrient: 'Nutriente',
      tahini: 'Tahini',
      winner: 'Vencedor'
    },
    promo: {
      message: 'adiciona cálcio, ferro, zinco e gorduras saudáveis!',
      add: '⭐ Adicionar Tahini',
      learn: 'Saber Mais'
    },
    tips: {
      title: '💡 Dicas Nutricionais',
      default: 'Combine leguminosas com cereais para proteína completa. Adicione alimentos ricos em vitamina C para aumentar a absorção de ferro!'
    },
    history: {
      title: 'Refeições Guardadas',
      empty: 'Ainda não tem refeições guardadas.',
      load: '📂 Carregar',
      duplicate: '📋 Copiar',
      delete: '🗑️ Eliminar'
    },
    modal: {
      saveMeal: 'Guardar Esta Refeição',
      saveBtn: 'Guardar Refeição',
      shareMeal: 'Partilhar Esta Refeição',
      shareDesc: 'Copie este link para partilhar a sua refeição:',
      copyBtn: 'Copiar Link'
    },
    action: {
      undo: 'Desfazer',
      redo: 'Refazer',
      save: 'Guardar',
      share: 'Partilhar',
      export: 'Exportar',
      print: 'Imprimir'
    },
    toast: {
      saved: '✅ Refeição guardada com sucesso!',
      loaded: '📂 Refeição carregada!',
      deleted: '🗑️ Refeição eliminada.',
      cleared: '🧹 Todos os ingredientes removidos.',
      copied: '📋 Link copiado!',
      exported: '📸 Imagem exportada!',
      undone: '↩️ Desfeito',
      redone: '↪️ Refeito',
      apiError: '⚠️ Não foi possível carregar da API. Tente novamente.'
    },
    noResults: 'Nenhum ingrediente encontrado. Tente outra pesquisa.',
    searchPlaceholder: 'Pesquisar ingredientes (local + USDA)...'
  }
};
