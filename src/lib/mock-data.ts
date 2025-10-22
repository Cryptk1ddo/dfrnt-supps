import type { Product } from '@/types'

/**
 * DFRNT Product Catalog - A System, Not a Pill
 * 
 * Built on the principle of modular synergy. Each stack targets a specific physiological system.
 * When used together, they create a powerful, compounded effect greater than the sum of their parts.
 */

const now = new Date().toISOString()

export const mockProducts: Product[] = [
  // Stack 1: Foundation - The Non-Negotiable Baseline
  {
    id: '1',
    slug: 'dfrnt-foundation',
    name: 'DFRNT Foundation',
    description: `The non-negotiable baseline of health. Provides the essential micronutrients required for thousands of enzymatic processes, including hormone production, immune function, and cognitive health.

CREATES THE FOUNDATIONAL ENVIRONMENT FOR ALL OTHER STACKS TO PERFORM OPTIMALLY.

When to Take: 1 serving with breakfast
Key Benefit: Master hormone regulation and foundational health`,
    shortDescription: 'Essential micronutrients for hormone production, immunity, and cognitive function. The baseline for all optimization.',
    price: 49.99,
    compareAtPrice: 64.99,
    category: 'supplements',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1550572017-4ff06194f636?w=800&h=800&fit=crop',
    ],
    inStock: true,
    inventory: 145,
    sku: 'DFRNT-FOUND-001',
    tags: ['foundation', 'vitamins', 'hormones', 'baseline'],
    createdAt: now,
    updatedAt: now,
    benefits: [
      'Master hormone regulator, critical for testosterone synthesis and immunity',
      'Directs calcium to bones/teeth, works synergistically with D3',
      'Fundamental for testosterone production and immune function',
      'Supports sleep, stress response, and 300+ enzymatic reactions',
      'Supports thyroid health and antioxidant systems (works with Zinc)',
      'Dramatically enhances the bioavailability of all other ingredients',
    ],
    ingredients: [
      'Vitamin D3 (Cholecalciferol) - 5,000 IU',
      'Vitamin K2 (MK-7) - 200 mcg',
      'Zinc (Glycinate) - 30 mg',
      'Magnesium (Glycinate) - 200 mg',
      'Selenium - 200 mcg',
      'Piperine (BioPerine®) - 10 mg',
    ],
    features: [
      'Take 1 serving with breakfast',
      'Creates foundational environment for all stacks',
      'Critical for hormone synthesis',
      'Enhanced absorption with BioPerine®',
      'Third-party tested for purity',
      '60-day supply',
    ],
  },

  // Stack 2: Androgen - Optimize the Hormonal Environment
  {
    id: '2',
    slug: 'dfrnt-androgen',
    name: 'DFRNT Androgen',
    description: `Naturally optimize the hormonal environment by increasing free testosterone levels and reducing limiting factors like SHBG and cortisol.

CREATES A POWERFUL ANABOLIC ENVIRONMENT.

When to Take: 1 capsule with breakfast. Cycle: 4 weeks on, 2 weeks off
Key Benefit: Increases free testosterone, supports libido`,
    shortDescription: 'Optimize hormones naturally. Boost free testosterone, reduce SHBG, support libido and performance.',
    price: 69.99,
    compareAtPrice: 89.99,
    category: 'supplements',
    images: [
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=800&fit=crop',
    ],
    inStock: true,
    inventory: 89,
    sku: 'DFRNT-ANDR-001',
    tags: ['testosterone', 'hormones', 'androgen', 'performance'],
    createdAt: now,
    updatedAt: now,
    benefits: [
      'Primary driver. Potently reduces SHBG and cortisol, significantly boosting free T',
      'Synergizes with Tongkat Ali by reducing SHBG. Cycle: 2 weeks on, 1 week off',
      'The synergist. Enhances nutrient absorption and mitochondrial function',
      'Potent addition. May stimulate LH production, supporting natural T production',
      'Key addition. Potent natural aromatase inhibitor (AI) to protect testosterone from converting to estrogen',
    ],
    ingredients: [
      'Tongkat Ali (200:1 Extract) - 400 mg',
      'Boron (Glycinate) - 9 mg',
      'Shilajit (Fulvic Acid Complex) - 250 mg',
      'Fadogia Agrestis Extract - 400 mg',
      'Apigenin - 50 mg',
    ],
    features: [
      'Take 1 capsule with breakfast',
      'Cycle: 4 weeks on, 2 weeks off',
      'Boron: 2 weeks on, 1 week off',
      'Natural aromatase inhibition',
      'Clinically researched ingredients',
      '30-day supply',
    ],
  },

  // Stack 3: Nootropic - Long-Term Brain Health
  {
    id: '3',
    slug: 'dfrnt-nootropic',
    name: 'DFRNT Nootropic',
    description: `Promote long-term brain health, neurogenesis, memory, and cerebral blood flow. This is a long-game investment in cognitive capital.

BUILDS A MORE RESILIENT, FOCUSED, AND ADAPTIVE BRAIN.

When to Take: 1 capsule first thing in the morning or before deep work
Key Benefit: Long-term brain health and cognitive optimization`,
    shortDescription: 'Long-term brain optimization. Neurogenesis, memory, cerebral blood flow, and peak cognitive performance.',
    price: 64.99,
    compareAtPrice: 84.99,
    category: 'nootropics',
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=800&fit=crop',
    ],
    inStock: true,
    inventory: 67,
    sku: 'DFRNT-NOOT-001',
    tags: ['nootropics', 'brain', 'neurogenesis', 'focus'],
    createdAt: now,
    updatedAt: now,
    benefits: [
      'The star. Boosts Nerve Growth Factor (NGF) for memory and neural repair',
      'Critical addition. Provides choline, the essential precursor for acetylcholine (the learning & memory neurotransmitter)',
      'Increases cerebral blood flow, delivering more nutrients and oxygen to the brain',
      'Alternative/Complement. Supports brain energy and phospholipid synthesis',
      'Reduces cortisol, protects brain cell membranes, and enhances cognitive function under stress',
    ],
    ingredients: [
      'Lion\'s Mane (30% Polysaccharides) - 1,000 mg',
      'Alpha-GPC (50%) - 300 mg',
      'Ginkgo Biloba (24% Flavoglycosides) - 120 mg',
      'Citicoline (CDP-Choline) - 250 mg',
      'Phosphatidylserine - 100 mg',
    ],
    features: [
      'Take 1 capsule first thing in the morning',
      'Perfect before deep work sessions',
      'Long-term brain health investment',
      'Promotes neuroplasticity',
      'Non-stimulant enhancement',
      '30-day supply',
    ],
  },

  // Stack 4: Ignite - Acute Energy and Focus
  {
    id: '4',
    slug: 'dfrnt-ignite',
    name: 'DFRNT Ignite',
    description: `Acute, powerful energy, focus, and drive. The perfect pre-workout or pre-focus session catalyst without jitters or crash.

CLEAN, SUSTAINED ENERGY AND LASER-LIKE FOCUS.

When to Take: 1 serving 30 minutes before workout or demanding mental task
Key Benefit: Clean energy and enhanced focus without crash`,
    shortDescription: 'Acute energy and focus. Pre-workout or deep work catalyst with clean energy and no jitters.',
    price: 54.99,
    compareAtPrice: 69.99,
    category: 'performance',
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
    ],
    inStock: true,
    inventory: 112,
    sku: 'DFRNT-IGNT-001',
    tags: ['pre-workout', 'energy', 'focus', 'stimulant'],
    createdAt: now,
    updatedAt: now,
    benefits: [
      'The primary stimulant. Blocks adenosine, increases dopamine and norepinephrine',
      'Promotes alpha-wave "calm focus" and eliminates the jitters from caffeine',
      'Adaptogen that reduces fatigue and provides clean mental and physical energy',
      'Provides a rapid-onset, sharp mental energy boost that synergizes with caffeine',
      'A natural dopamine reuptake inhibitor, enhancing motivation, drive, and focus',
      'Enhances the bioavailability and absorption of all other compounds',
    ],
    ingredients: [
      'Caffeine (from Natural Sources) - 200 mg',
      'L-Theanine (Suntheanine®) - 200 mg',
      'Panax Ginseng (15% Ginsenosides) - 200 mg',
      'Dynamine™ (Methylliberine) - 150 mg',
      'Sabroxy® (50% Oroxylin A) - 500 mg',
      'BioPerine® - 5 mg',
    ],
    features: [
      'Take 30 minutes before workout or deep work',
      '1:1 Caffeine to L-Theanine ratio',
      'Natural dopamine reuptake inhibition',
      'No crash or jitters',
      'Stacks with DFRNT Kinetic',
      '30 servings',
    ],
  },

  // Stack 5: Kinetic - Maximum Performance and Recovery
  {
    id: '5',
    slug: 'dfrnt-kinetic',
    name: 'DFRNT Kinetic',
    description: `Fuel performance, maximize training output, accelerate recovery, and upregulate androgen receptors. Pure physical optimization.

INCREASES POWER, FIGHTS FATIGUE, DRAMATICALLY SPEEDS UP RECOVERY.

When to Take: 1 scoop mixed in water immediately post-workout
Key Benefit: Maximum performance and accelerated recovery`,
    shortDescription: 'Maximum performance and recovery. Clinical doses for strength, pumps, and reduced muscle soreness.',
    price: 59.99,
    compareAtPrice: 79.99,
    category: 'performance',
    images: [
      'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=800&fit=crop',
    ],
    inStock: true,
    inventory: 98,
    sku: 'DFRNT-KNTC-001',
    tags: ['recovery', 'performance', 'creatine', 'post-workout'],
    createdAt: now,
    updatedAt: now,
    benefits: [
      'The gold standard. Increases strength, power, and muscle volume',
      'The pump & performance driver. Significantly increases NO production, blood flow, and reduces fatigue',
      'Buffers muscle acidity, increasing work capacity and fighting fatigue',
      'Critical addition. Shuttles fatty acids for energy and may upregulate androgen receptors',
      'The recovery powerhouse. Precursor to glutathione, the body\'s master antioxidant. Reduces muscle soreness and oxidative damage',
      'Adaptogen that lowers cortisol post-workout, improves recovery, and supports strength',
    ],
    ingredients: [
      'Creatine Monohydrate (Micronized) - 5 g',
      'L-Citrulline Malate (2:1) - 6 g',
      'Beta-Alanine - 3.2 g',
      'L-Carnitine L-Tartrate - 2 g',
      'NAC (N-Acetyl Cysteine) - 600 mg',
      'Ashwagandha (5% Withanolides) - 600 mg',
    ],
    features: [
      'Take 1 scoop immediately post-workout',
      'Clinical doses of all ingredients',
      'Upregulates androgen receptors',
      'Master antioxidant precursor',
      'Lowers post-workout cortisol',
      '30 servings',
    ],
  },

  // Blue-Light Blocking Glasses - Pro
  {
    id: '6',
    slug: 'blue-light-pro',
    name: 'Blue-Light Blocking Glasses - Pro',
    description: `Premium blue-light blocking glasses with advanced lens technology. Protect your circadian rhythm and optimize sleep quality.

Perfect for evening screen time, gaming, or working late.`,
    shortDescription: 'Premium blue-light blocking glasses for circadian rhythm protection and better sleep.',
    price: 89.99,
    compareAtPrice: 129.99,
    category: 'blue-light-glasses',
    images: [
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&h=800&fit=crop',
    ],
    inStock: true,
    inventory: 45,
    sku: 'DFRNT-BLBG-PRO',
    tags: ['blue-light', 'glasses', 'sleep', 'circadian'],
    createdAt: now,
    updatedAt: now,
    benefits: [
      'Filters 99% of harmful blue light',
      'Maintains true color perception',
      'Reduces eye strain and fatigue',
      'Protects natural circadian rhythm',
      'Improves sleep quality',
    ],
    ingredients: [],
    features: [
      'Advanced blue-light filtering',
      'Anti-reflective coating',
      'Scratch-resistant lenses',
      'Lightweight frames',
      'Includes case',
      '30-day return policy',
    ],
  },

  // Blue-Light Blocking Glasses - Classic
  {
    id: '7',
    slug: 'blue-light-classic',
    name: 'Blue-Light Blocking Glasses - Classic',
    description: `Essential blue-light protection at an accessible price. Reduce eye strain and support healthy sleep patterns.

Simple, effective, affordable circadian rhythm protection.`,
    shortDescription: 'Essential blue-light blocking glasses for everyday protection and better sleep.',
    price: 49.99,
    category: 'blue-light-glasses',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=800&fit=crop',
    ],
    inStock: true,
    inventory: 78,
    sku: 'DFRNT-BLBG-CLS',
    tags: ['blue-light', 'glasses', 'sleep', 'affordable'],
    createdAt: now,
    updatedAt: now,
    benefits: [
      'Filters 90% of blue light',
      'Reduces digital eye strain',
      'Supports healthy sleep patterns',
      'Comfortable all-day wear',
      'Classic style',
    ],
    ingredients: [],
    features: [
      'Blue-light filtering lenses',
      'Durable frames',
      'Adjustable nose pads',
      'Spring hinges',
      'Includes cleaning cloth',
      '1-year warranty',
    ],
  },

  // Comprehensive Biomarker Testing Kit
  {
    id: '8',
    slug: 'biomarker-testing-kit',
    name: 'Comprehensive Biomarker Testing Kit',
    description: `Knowledge is power. Measure 50+ critical biomarkers including hormones, vitamins, minerals, metabolic markers, and inflammation indicators.

Get the data you need to optimize your protocol.

Includes professional analysis and personalized recommendations.`,
    shortDescription: 'At-home testing for 50+ biomarkers with professional analysis and personalized recommendations.',
    price: 199.99,
    compareAtPrice: 299.99,
    category: 'wearables',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582719471137-c3967ffb857b?w=800&h=800&fit=crop',
    ],
    inStock: true,
    inventory: 32,
    sku: 'DFRNT-BIOTEST-001',
    tags: ['testing', 'biomarkers', 'hormones', 'optimization'],
    createdAt: now,
    updatedAt: now,
    benefits: [
      'Comprehensive hormone panel (Testosterone, Estrogen, Cortisol, Thyroid)',
      'Vitamin and mineral status (D3, B12, Magnesium, Zinc)',
      'Metabolic markers (Glucose, HbA1c, Lipid panel)',
      'Inflammation indicators (hsCRP, Omega-3 index)',
      'Professional analysis included',
      'Personalized optimization recommendations',
    ],
    ingredients: [],
    features: [
      'Simple at-home finger prick test',
      'CLIA-certified lab processing',
      'Results in 5-7 business days',
      'Detailed digital report',
      'Optional physician consultation',
      'Retest every 3-6 months recommended',
    ],
  },
]

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return mockProducts
}

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((product) => product.slug === slug)
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter((product) => product.category === category)
}

/**
 * Search products by query string
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Mock ingredient data for interactive visualization
 */
export const mockIngredients = {
  foundation: [
    {
      id: 'vitamin-d3',
      name: 'Vitamin D3 (Cholecalciferol)',
      dosage: '5,000 IU',
      category: 'core' as const,
      icon: 'award' as const,
      color: 'from-yellow-500 to-orange-500',
      shortDescription: 'Master hormone regulator essential for testosterone synthesis, immunity, and calcium absorption.',
      detailedDescription: 'Vitamin D3 is a fat-soluble hormone precursor that plays a fundamental role in over 200 genetic expressions. It regulates testosterone production, immune function, bone health, and mood regulation. Studies show that optimal D3 levels (50-80 ng/mL) are associated with 25% higher testosterone levels and significantly reduced inflammation.',
      benefits: [
        'Increases testosterone production by up to 25%',
        'Enhances immune system function and reduces inflammation',
        'Improves bone density and calcium absorption',
        'Supports mood regulation and reduces depression risk',
        'Optimizes muscle protein synthesis',
        'Reduces risk of chronic diseases including diabetes and cardiovascular disease',
      ],
      studies: [
        {
          title: 'Effect of vitamin D supplementation on testosterone levels in men',
          source: 'Hormone and Metabolic Research',
          url: 'https://pubmed.ncbi.nlm.nih.gov/21154195/',
          year: 2011,
        },
        {
          title: 'Vitamin D and the immune system: new perspectives on an old theme',
          source: 'Rheumatic Disease Clinics',
          url: 'https://pubmed.ncbi.nlm.nih.gov/22023896/',
          year: 2012,
        },
        {
          title: 'Vitamin D status and muscle function in post-menarcheal adolescent girls',
          source: 'Journal of Clinical Endocrinology & Metabolism',
          url: 'https://pubmed.ncbi.nlm.nih.gov/20685857/',
          year: 2010,
        },
      ],
    },
    {
      id: 'vitamin-k2',
      name: 'Vitamin K2 (MK-7)',
      dosage: '200 mcg',
      category: 'supporting' as const,
      icon: 'shield' as const,
      color: 'from-green-500 to-emerald-500',
      shortDescription: 'Directs calcium to bones and teeth while preventing arterial calcification.',
      detailedDescription: 'Vitamin K2 (MK-7) is the most bioavailable form of vitamin K, with a half-life of 72 hours. It works synergistically with Vitamin D3 to ensure calcium is deposited in bones rather than soft tissues. This is critical for cardiovascular health and bone density optimization.',
      benefits: [
        'Prevents arterial calcification and supports cardiovascular health',
        'Enhances bone mineral density by 3-6%',
        'Works synergistically with D3 for optimal calcium utilization',
        'Reduces fracture risk by up to 60%',
        'Supports dental health and prevents cavities',
      ],
      studies: [
        {
          title: 'Vitamin K2 and bone and cardiovascular health',
          source: 'Advances in Nutrition',
          url: 'https://pubmed.ncbi.nlm.nih.gov/22332096/',
          year: 2012,
        },
        {
          title: 'Vitamin K2 supplementation improves insulin sensitivity',
          source: 'Diabetes Care',
          url: 'https://pubmed.ncbi.nlm.nih.gov/21617109/',
          year: 2011,
        },
      ],
    },
    {
      id: 'zinc',
      name: 'Zinc Glycinate',
      dosage: '30 mg',
      category: 'core' as const,
      icon: 'beaker' as const,
      color: 'from-blue-500 to-indigo-500',
      shortDescription: 'Critical mineral for testosterone production, immune function, and protein synthesis.',
      detailedDescription: 'Zinc is involved in over 300 enzymatic reactions in the body. It is the most important mineral for testosterone production, with deficiency linked to 40-50% reductions in T levels. Glycinate form ensures maximum absorption without GI distress.',
      benefits: [
        'Essential cofactor in testosterone synthesis',
        'Boosts immune system by 50% in deficient individuals',
        'Enhances protein synthesis and muscle recovery',
        'Improves sperm quality and fertility',
        'Supports thyroid function and metabolism',
        'Powerful antioxidant protecting against oxidative stress',
      ],
      studies: [
        {
          title: 'Zinc status and testosterone levels of healthy adults',
          source: 'Nutrition',
          url: 'https://pubmed.ncbi.nlm.nih.gov/8875519/',
          year: 1996,
        },
        {
          title: 'Zinc supplementation increases testosterone in athletes',
          source: 'The Journal of Exercise Physiology',
          url: 'https://pubmed.ncbi.nlm.nih.gov/17685720/',
          year: 2007,
        },
      ],
    },
    {
      id: 'magnesium',
      name: 'Magnesium Glycinate',
      dosage: '200 mg',
      category: 'core' as const,
      icon: 'trending' as const,
      color: 'from-purple-500 to-pink-500',
      shortDescription: 'Supports 300+ enzymatic reactions including sleep, stress response, and testosterone production.',
      detailedDescription: 'Magnesium is the fourth most abundant mineral in the body and is critically deficient in 50% of the population. Glycinate form is chelated for superior absorption and does not cause digestive issues. Essential for deep sleep, stress management, and hormonal balance.',
      benefits: [
        'Increases free and total testosterone levels',
        'Improves sleep quality and duration',
        'Reduces cortisol and stress response',
        'Enhances insulin sensitivity',
        'Supports cardiovascular health and blood pressure regulation',
        'Prevents muscle cramps and supports recovery',
      ],
      studies: [
        {
          title: 'Effects of magnesium supplementation on testosterone levels',
          source: 'Biological Trace Element Research',
          url: 'https://pubmed.ncbi.nlm.nih.gov/20352370/',
          year: 2011,
        },
        {
          title: 'Magnesium intake and sleep quality in elderly',
          source: 'Journal of Research in Medical Sciences',
          url: 'https://pubmed.ncbi.nlm.nih.gov/23853635/',
          year: 2012,
        },
      ],
    },
    {
      id: 'bioperine',
      name: 'BioPerine® (Black Pepper Extract)',
      dosage: '10 mg',
      category: 'absorption' as const,
      icon: 'zap' as const,
      color: 'from-orange-500 to-red-500',
      shortDescription: 'Dramatically enhances bioavailability of all other ingredients by up to 2000%.',
      detailedDescription: 'BioPerine® is a patented extract from black pepper containing 95% piperine. It inhibits enzymes that metabolize nutrients too quickly, allowing for significantly higher absorption rates. This means you get more benefit from every ingredient in the formula.',
      benefits: [
        'Increases nutrient absorption by up to 2000%',
        'Enhances bioavailability of vitamins and minerals',
        'Improves thermogenesis and metabolic rate',
        'Supports cognitive function and memory',
      ],
      studies: [
        {
          title: 'Influence of piperine on the pharmacokinetics of curcumin',
          source: 'Planta Medica',
          url: 'https://pubmed.ncbi.nlm.nih.gov/9619120/',
          year: 1998,
        },
      ],
    },
  ],
};

/**
 * Mock benefits timeline data
 */
export const mockBenefitsTimeline = {
  foundation: [
    {
      week: 'Week 1-2',
      title: 'Initial Adaptation',
      description: 'Your body begins absorbing and utilizing essential nutrients.',
      intensity: 25,
      icon: 'zap' as const,
      benefits: [
        'Improved energy levels throughout the day',
        'Better sleep quality and faster sleep onset',
        'Reduced afternoon fatigue',
        'Slight improvements in mood and focus',
      ],
    },
    {
      week: 'Week 3-4',
      title: 'Foundation Building',
      description: 'Nutrient stores replenish, hormonal optimization begins.',
      intensity: 50,
      icon: 'trending' as const,
      benefits: [
        'Noticeable increase in morning energy',
        'Enhanced workout performance and stamina',
        'Improved stress resilience',
        'Better muscle recovery post-exercise',
        'Clearer skin and stronger nails',
      ],
    },
    {
      week: 'Week 5-8',
      title: 'Optimization Phase',
      description: 'Peak benefits emerge as systems reach optimal function.',
      intensity: 80,
      icon: 'target' as const,
      benefits: [
        'Significant testosterone level improvements (15-25% increase)',
        'Enhanced libido and sexual performance',
        'Increased lean muscle mass and strength',
        'Optimized immune function with fewer sick days',
        'Consistent energy without afternoon crashes',
        'Improved bone density markers',
      ],
    },
    {
      week: 'Week 9+',
      title: 'Long-Term Benefits',
      description: 'Sustained optimization and compounding health benefits.',
      intensity: 100,
      icon: 'check' as const,
      benefits: [
        'Sustained hormonal balance and vitality',
        'Reduced inflammation and chronic disease risk',
        'Enhanced cognitive clarity and focus',
        'Optimal metabolic function',
        'Improved cardiovascular health markers',
        'Better stress management and mood regulation',
        'Maximum strength and muscle development',
      ],
    },
  ],
};

/**
 * Mock education hub content
 */
export const mockEducationContent = {
  foundation: {
    howItWorks: [
      {
        id: 'step-1',
        step: 1,
        title: 'Rapid Absorption',
        description: 'Bioavailable forms ensure maximum nutrient uptake within 30-60 minutes.',
        icon: 'beaker' as const,
        details: [
          'Chelated minerals (Glycinate forms) bypass competitive absorption pathways',
          'BioPerine® enhances bioavailability by up to 2000% through enzyme inhibition',
          'Fat-soluble vitamins (D3, K2) absorb best when taken with dietary fats',
          'Peak plasma levels achieved within 2-4 hours of consumption',
        ],
      },
      {
        id: 'step-2',
        step: 2,
        title: 'Cellular Integration',
        description: 'Nutrients are transported to target tissues and incorporated into cellular processes.',
        icon: 'trending' as const,
        details: [
          'Vitamin D3 converts to active hormone calcitriol in kidneys and target tissues',
          'Zinc activates over 300 enzymatic reactions including testosterone synthesis',
          'Magnesium regulates calcium channels and neurotransmitter function',
          'K2 activates proteins that direct calcium to bones instead of arteries',
        ],
      },
      {
        id: 'step-3',
        step: 3,
        title: 'Systemic Optimization',
        description: 'Cumulative benefits compound over time as nutrient stores replenish.',
        icon: 'award' as const,
        details: [
          'Hormonal axis optimization: HPT (thyroid), HPA (stress), HPG (testosterone)',
          'Immune system strengthening with reduced inflammatory markers (CRP, IL-6)',
          'Bone remodeling with increased density (3-6% improvement in 6-12 months)',
          'Cardiovascular protection through reduced arterial calcification',
          'Enhanced mitochondrial function and ATP production for sustained energy',
        ],
      },
    ],
    blogPosts: [
      {
        id: 'blog-1',
        title: 'The Vitamin D Deficiency Epidemic: Why 50% of Adults Are Affected',
        excerpt: 'Exploring the widespread prevalence of vitamin D deficiency and its impact on testosterone, immunity, and overall health.',
        author: 'Dr. Sarah Mitchell',
        readTime: '8 min read',
        category: 'Research',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
        url: 'https://example.com/blog/vitamin-d-deficiency',
      },
      {
        id: 'blog-2',
        title: 'Zinc and Testosterone: The Missing Link in Male Optimization',
        excerpt: 'Clinical evidence showing how zinc supplementation can increase testosterone levels by up to 25% in deficient individuals.',
        author: 'Dr. Michael Chen',
        readTime: '10 min read',
        category: 'Performance',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop',
        url: 'https://example.com/blog/zinc-testosterone',
      },
      {
        id: 'blog-3',
        title: 'Magnesium: The Forgotten Mineral for Sleep and Recovery',
        excerpt: 'How magnesium glycinate improves sleep quality, reduces stress, and enhances athletic recovery.',
        author: 'Dr. Emily Roberts',
        readTime: '7 min read',
        category: 'Recovery',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop',
        url: 'https://example.com/blog/magnesium-sleep',
      },
      {
        id: 'blog-4',
        title: 'K2 and D3: The Synergistic Duo for Bone and Heart Health',
        excerpt: 'Understanding why these two vitamins must be taken together for optimal calcium metabolism.',
        author: 'Dr. James Anderson',
        readTime: '9 min read',
        category: 'Science',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
        url: 'https://example.com/blog/k2-d3-synergy',
      },
    ],
    videos: [
      {
        id: 'video-1',
        title: 'How to Take DFRNT Foundation for Maximum Results',
        description: 'Step-by-step guide on optimal timing, dosage, and what to take it with.',
        thumbnail: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=450&fit=crop',
        duration: '5:32',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 'video-2',
        title: 'Understanding Bioavailability: Why Form Matters',
        description: 'Deep dive into why we chose glycinate forms over cheaper alternatives.',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop',
        duration: '8:15',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ],
    guides: [
      {
        id: 'guide-1',
        title: 'Complete Guide to Optimizing Male Hormones',
        description: 'A comprehensive 47-page guide covering nutrition, supplementation, training, and lifestyle factors for testosterone optimization.',
        fileSize: '3.2 MB',
        pages: '47',
        format: 'PDF' as const,
        downloadUrl: '/downloads/hormone-optimization-guide.pdf',
      },
      {
        id: 'guide-2',
        title: 'The DFRNT System: Stacking Guide',
        description: 'How to combine Foundation with other DFRNT products for maximum synergistic effects.',
        fileSize: '1.8 MB',
        pages: '24',
        format: 'PDF' as const,
        downloadUrl: '/downloads/stacking-guide.pdf',
      },
      {
        id: 'guide-3',
        title: 'Supplement Timing & Absorption Cheat Sheet',
        description: 'Quick reference guide for when and how to take each supplement for optimal absorption.',
        fileSize: '0.5 MB',
        pages: '2',
        format: 'PDF' as const,
        downloadUrl: '/downloads/timing-cheat-sheet.pdf',
      },
    ],
    podcasts: [
      {
        id: 'podcast-1',
        title: 'Building a Supplement Company on Radical Transparency',
        podcast: 'The Tim Ferriss Show',
        duration: '1h 23min',
        description: 'DFRNT founder discusses why transparency matters in the supplement industry and how clinical dosing changed his life.',
        url: 'https://example.com/podcast/tim-ferriss',
      },
      {
        id: 'podcast-2',
        title: 'The Science of Micronutrient Optimization',
        podcast: 'Huberman Lab',
        duration: '2h 15min',
        description: 'Dr. Andrew Huberman breaks down the research behind vitamin D, zinc, and magnesium for performance.',
        url: 'https://example.com/podcast/huberman-lab',
      },
      {
        id: 'podcast-3',
        title: 'Supplement Myths Debunked by a Research Scientist',
        podcast: 'Joe Rogan Experience',
        duration: '1h 47min',
        description: 'Deep dive into what actually works in supplementation and what&apos;s marketing hype.',
        url: 'https://example.com/podcast/joe-rogan',
      },
    ],
  },
};

/**
 * Mock trust and credibility signals
 */
export const mockTrustSignals = {
  videoTestimonials: [
    {
      id: 'video-test-1',
      name: 'Marcus Johnson',
      title: 'Professional Athlete',
      location: 'Los Angeles, CA',
      thumbnail: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=800&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '1:24',
      quote: 'DFRNT Foundation completely changed my energy levels and recovery. I noticed improvements within the first week.',
      rating: 5,
    },
    {
      id: 'video-test-2',
      name: 'Sarah Chen',
      title: 'Fitness Coach',
      location: 'New York, NY',
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '2:15',
      quote: 'After years of trying different supplements, DFRNT is the only brand I trust. The transparency is unmatched.',
      rating: 5,
    },
    {
      id: 'video-test-3',
      name: 'David Martinez',
      title: 'Entrepreneur',
      location: 'Austin, TX',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '1:48',
      quote: 'My sleep quality and focus have dramatically improved. This is a game-changer for anyone optimizing their health.',
      rating: 5,
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'NSF Certified for Sport',
      description: 'Third-party tested for banned substances and label accuracy',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop',
      verificationUrl: 'https://www.nsfsport.com/listings',
      badge: 'Verified',
    },
    {
      id: 'cert-2',
      name: 'GMP Certified',
      description: 'Manufactured in FDA-registered, cGMP-compliant facilities',
      logo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop',
      verificationUrl: 'https://www.fda.gov/drugs/pharmaceutical-quality-resources/current-good-manufacturing-practices-cgmp-regulations',
      badge: 'Certified',
    },
    {
      id: 'cert-3',
      name: 'Third-Party Tested',
      description: 'Every batch tested for purity, potency, and heavy metals',
      logo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop',
      verificationUrl: 'https://example.com/test-results',
      badge: 'Lab Verified',
    },
    {
      id: 'cert-4',
      name: 'Non-GMO',
      description: 'All ingredients sourced from non-genetically modified organisms',
      logo: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=200&fit=crop',
      verificationUrl: 'https://example.com/non-gmo-verification',
      badge: 'Non-GMO',
    },
  ],
  expertEndorsements: [
    {
      id: 'expert-1',
      name: 'Dr. Michael Stevens',
      credentials: 'MD, Sports Medicine',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
      quote: 'DFRNT&apos;s formulations are backed by clinical research and dosed appropriately. I recommend them to my patients seeking evidence-based supplementation.',
      specialty: 'Sports Medicine',
    },
    {
      id: 'expert-2',
      name: 'Dr. Emily Roberts',
      credentials: 'PhD, Nutritional Biochemistry',
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop',
      quote: 'The bioavailable forms and synergistic combinations in DFRNT products demonstrate a deep understanding of nutrient absorption and metabolism.',
      specialty: 'Nutrition Science',
    },
    {
      id: 'expert-3',
      name: 'Dr. James Anderson',
      credentials: 'MD, Endocrinology',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop',
      quote: 'For hormone optimization, the Foundation stack provides essential micronutrients at clinically effective doses. Transparency matters, and DFRNT delivers.',
      specialty: 'Hormone Health',
    },
  ],
  mediaFeatures: [
    {
      id: 'media-1',
      outlet: 'Men&apos;s Health',
      logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop',
      headline: 'The Best Supplements for Testosterone Optimization in 2025',
      excerpt: 'We tested 47 supplement brands and DFRNT Foundation ranked #1 for transparency, clinical dosing, and real-world results.',
      url: 'https://example.com/mens-health-article',
      date: 'March 2025',
    },
    {
      id: 'media-2',
      outlet: 'Forbes Health',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop',
      headline: 'How One Supplement Company Is Disrupting the Industry',
      excerpt: 'DFRNT&apos;s radical transparency and science-first approach is setting a new standard for the supplement industry.',
      url: 'https://example.com/forbes-article',
      date: 'January 2025',
    },
    {
      id: 'media-3',
      outlet: 'Healthline',
      logo: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=400&h=200&fit=crop',
      headline: 'Expert-Reviewed: Best Vitamin D and Zinc Supplements',
      excerpt: 'After consulting with three independent physicians, DFRNT Foundation was unanimously recommended for its quality and dosing.',
      url: 'https://example.com/healthline-article',
      date: 'February 2025',
    },
    {
      id: 'media-4',
      outlet: 'Joe Rogan Experience',
      logo: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=200&fit=crop',
      headline: 'The Science of Supplement Optimization',
      excerpt: 'Joe Rogan and Dr. Andrew Huberman discuss why transparent, clinically-dosed supplements like DFRNT are the future.',
      url: 'https://example.com/jre-episode',
      date: 'December 2024',
    },
  ],
};

export const mockReviewsData = {
  foundation: {
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Chen',
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        rating: 5 as const,
        date: '2024-10-15',
        title: 'Game changer for my testosterone levels',
        content: 'I&apos;ve been taking DFRNT Foundation for 3 months now and my recent blood work shows a 40% increase in total testosterone (from 450 to 630 ng/dL). More importantly, I feel the difference - better energy, clearer mind, and improved gym performance. The D3+K2 combo is legit backed by research. Worth every penny.',
        verified: true,
        helpfulCount: 127,
        images: [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
        ],
        variant: 'Monthly Supply (30 servings)',
      },
      {
        id: 'rev-2',
        author: 'Sarah Mitchell',
        authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        rating: 5 as const,
        date: '2024-10-12',
        title: 'Finally, a supplement that actually works',
        content: 'I&apos;ve tried so many "foundational health" supplements that promised the world. DFRNT Foundation is different. The ingredient quality is transparent, the dosages are clinical (not pixie-dusted), and I can actually feel the difference in my sleep quality and recovery. The magnesium glycinate alone is worth it - no more leg cramps or restless nights.',
        verified: true,
        helpfulCount: 89,
        images: [
          'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=400&fit=crop',
        ],
        variant: 'Monthly Supply (30 servings)',
      },
      {
        id: 'rev-3',
        author: 'Jake Thompson',
        authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        rating: 4 as const,
        date: '2024-10-08',
        title: 'Solid product, wish it was cheaper',
        content: 'The quality is undeniable - third-party tested, clinical dosages, premium forms (glycinate vs oxide). I noticed better recovery and mood within 2 weeks. Only complaint is the price point. I get that you&apos;re paying for quality, but $50/month adds up. That said, I&apos;m staying subscribed because the results speak for themselves.',
        verified: true,
        helpfulCount: 64,
        variant: 'Monthly Supply (30 servings)',
      },
      {
        id: 'rev-4',
        author: 'Emily Rodriguez',
        authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        rating: 5 as const,
        date: '2024-10-05',
        title: 'Perfect for hormone health (female perspective)',
        content: 'As a woman in my 30s, I was skeptical about a "testosterone" focused supplement. But the ingredients are just essential micronutrients that everyone needs. My energy is up, PMS symptoms are way down, and my skin/hair look better. The K2 is especially important for women for bone health. Don&apos;t let the marketing fool you - this is for everyone.',
        verified: true,
        helpfulCount: 112,
        images: [
          'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop',
        ],
        variant: 'Monthly Supply (30 servings)',
      },
      {
        id: 'rev-5',
        author: 'David Kim',
        authorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        rating: 5 as const,
        date: '2024-10-01',
        title: 'The research convinced me, the results kept me',
        content: 'I spent hours researching D3+K2 synergy, optimal zinc dosing, and magnesium forms before buying. DFRNT nailed it. The transparency is refreshing - they link to actual studies, explain WHY each dose was chosen, and use the most bioavailable forms. Results: better sleep, less brain fog, PRs in the gym. This is my forever stack.',
        verified: true,
        helpfulCount: 98,
        variant: 'Quarterly Supply (90 servings)',
      },
      {
        id: 'rev-6',
        author: 'Amanda Foster',
        rating: 4 as const,
        date: '2024-09-28',
        title: 'Great quality, but sensitive stomach',
        content: 'The supplement itself is top-tier quality. However, I have to take it with a full meal or I get mild nausea. This might be the zinc (common issue). Started splitting the dose - half morning, half evening - and that solved it. Results are great once I figured out the timing.',
        verified: true,
        helpfulCount: 43,
        variant: 'Monthly Supply (30 servings)',
      },
      {
        id: 'rev-7',
        author: 'Chris Martinez',
        authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        rating: 5 as const,
        date: '2024-09-25',
        title: 'Stacked with Androgen - unreal combo',
        content: 'Using Foundation + Androgen together for 2 months. My libido is back to my 20s (I&apos;m 38), morning wood every day, and I&apos;m crushing it in the gym. The Foundation provides the micronutrient base while Androgen handles the hormonal optimization. The system approach makes sense and the results prove it works.',
        verified: true,
        helpfulCount: 156,
        images: [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        ],
        variant: 'Monthly Supply (30 servings)',
      },
      {
        id: 'rev-8',
        author: 'Lisa Chen',
        authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        rating: 5 as const,
        date: '2024-09-20',
        title: 'Best vitamin D supplement I&apos;ve tried',
        content: 'I&apos;ve been deficient in vitamin D for years despite trying various supplements. DFRNT Foundation has it paired with K2 which apparently helps with absorption and directing calcium properly. My recent labs show I&apos;m finally in optimal range (not just "normal"). Plus the added benefits of zinc and magnesium are a bonus.',
        verified: true,
        helpfulCount: 71,
        variant: 'Monthly Supply (30 servings)',
      },
    ],
    questions: [
      {
        id: 'q-1',
        question: 'Can I take this if I&apos;m already taking a multivitamin?',
        author: 'Tom Wilson',
        date: '2024-10-10',
        answerCount: 3,
        helpfulCount: 45,
        answers: [
          {
            id: 'a-1-1',
            author: 'DFRNT Support',
            content: 'Great question! DFRNT Foundation is designed to be a complete replacement for most multivitamins, not a supplement to them. The dosages are clinical and optimized - taking both could lead to exceeding recommended daily limits for certain nutrients like zinc and vitamin D. We recommend choosing one or the other. That said, Foundation focuses on the critical nutrients most men are deficient in, while skipping the unnecessary fillers found in many multis.',
            date: '2024-10-10',
            helpful: 38,
            verified: true,
            isExpert: true,
          },
          {
            id: 'a-1-2',
            author: 'Marcus Chen',
            content: 'I switched from my multi to just Foundation. My blood work improved more in 3 months with Foundation than 2 years on my generic multi. The quality and dosing makes a huge difference.',
            date: '2024-10-11',
            helpful: 22,
            verified: true,
          },
          {
            id: 'a-1-3',
            author: 'Dr. Sarah Kim',
            content: 'As a physician, I appreciate that DFRNT uses evidence-based dosages and premium forms (glycinate chelates, MK-7 K2, etc). Most multivitamins use cheap forms with poor absorption. If you&apos;re going to take one, make it count.',
            date: '2024-10-12',
            helpful: 31,
            verified: false,
            isExpert: true,
          },
        ],
      },
      {
        id: 'q-2',
        question: 'What time of day should I take Foundation for best results?',
        author: 'Alex Rivera',
        date: '2024-10-05',
        answerCount: 2,
        helpfulCount: 67,
        answers: [
          {
            id: 'a-2-1',
            author: 'DFRNT Support',
            content: 'We recommend taking Foundation with your first meal of the day. Vitamin D3 and K2 are fat-soluble, so taking them with dietary fat improves absorption. Morning dosing also aligns with your body&apos;s natural cortisol rhythm. That said, the most important thing is consistency - same time every day.',
            date: '2024-10-05',
            helpful: 54,
            verified: true,
            isExpert: true,
          },
          {
            id: 'a-2-2',
            author: 'Jake Thompson',
            content: 'I take mine with breakfast (eggs and avocado for healthy fats). Works great and I never forget because it&apos;s part of my morning routine.',
            date: '2024-10-06',
            helpful: 19,
            verified: true,
          },
        ],
      },
      {
        id: 'q-3',
        question: 'Is this safe to take long-term? Or should I cycle off?',
        author: 'Brian Foster',
        date: '2024-09-28',
        answerCount: 2,
        helpfulCount: 89,
        answers: [
          {
            id: 'a-3-1',
            author: 'DFRNT Support',
            content: 'Foundation is designed for daily, long-term use - no cycling needed. These are essential micronutrients your body needs every single day (think of them like macronutrients - protein, carbs, fats). The dosages are within safe upper limits established by research. Unlike stimulants or adaptogens that may need cycling, vitamins and minerals work best with consistent daily intake.',
            date: '2024-09-28',
            helpful: 72,
            verified: true,
            isExpert: true,
          },
          {
            id: 'a-3-2',
            author: 'David Kim',
            content: 'Been taking it daily for 8 months straight. Regular blood work shows everything in optimal range. My doctor actually said to keep doing whatever I&apos;m doing because my markers improved significantly.',
            date: '2024-09-29',
            helpful: 34,
            verified: true,
          },
        ],
      },
      {
        id: 'q-4',
        question: 'Will this help with low testosterone or do I need the Androgen stack too?',
        author: 'Mike Johnson',
        date: '2024-09-22',
        answerCount: 3,
        helpfulCount: 124,
        answers: [
          {
            id: 'a-4-1',
            author: 'DFRNT Support',
            content: 'Foundation provides the micronutrient foundation that supports natural testosterone production (D3, zinc, magnesium are all critical). If you&apos;re deficient in these, you&apos;ll likely see improvements in T levels from Foundation alone. Androgen takes it further with botanicals specifically targeting hormonal optimization. Think of Foundation as the base, Androgen as the accelerator. Many customers start with Foundation, see results, then add Androgen for compounded benefits.',
            date: '2024-09-22',
            helpful: 95,
            verified: true,
            isExpert: true,
          },
          {
            id: 'a-4-2',
            author: 'Marcus Chen',
            content: 'I saw my T go from 450 to 630 with just Foundation. Added Androgen after 3 months and now I&apos;m at 780. The combo is powerful.',
            date: '2024-09-23',
            helpful: 52,
            verified: true,
          },
          {
            id: 'a-4-3',
            author: 'Chris Martinez',
            content: 'Start with Foundation. Get blood work done after 2-3 months. Then decide if you want to add Androgen. That&apos;s what I did and it worked perfectly.',
            date: '2024-09-24',
            helpful: 41,
            verified: true,
          },
        ],
      },
    ],
    averageRating: 4.8,
    totalReviews: 2847,
    ratingDistribution: {
      5: 2145,
      4: 512,
      3: 142,
      2: 34,
      1: 14,
    },
  },
};
