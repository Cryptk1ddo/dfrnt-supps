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
 * Search products
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
