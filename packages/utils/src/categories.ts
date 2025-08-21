export const categorySlugs = [
  'housing',
  'daily',
  'financial',
  'insurance',
  'income',
] as const;

export type CategorySlug = (typeof categorySlugs)[number];
export const subcategoriesByCategory = {
  housing: [
    'rent',
    'utilities',
    'internet',
    'maintenance',
    'furniture',
    'housing-other',
  ] as const,
  daily: [
    'groceries',
    'dining',
    'transportation',
    'shopping',
    'entertainment',
    'personal-care',
    'medical',
    'daily-other',
  ] as const,
  financial: [
    'savings',
    'investments',
    'loan-repayments',
    'bank-fees',
    'financial-other',
  ] as const,
  insurance: [
    'health-insurance',
    'car-insurance',
    'home-insurance',
    'insurance-other',
  ] as const,
  income: ['salary', 'freelance', 'gifts', 'income-other'] as const,
} satisfies Record<CategorySlug, readonly string[]>;

export const subcategorySlugs = Object.values(subcategoriesByCategory).flat();
export type SubcategorySlug = (typeof subcategorySlugs)[number];
