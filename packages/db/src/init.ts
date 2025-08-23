import { reset } from 'drizzle-seed';

import {
  categorySlugs,
  subcategoriesByCategory,
  subcategorySlugs,
} from '@the-monthly-expense/utils/categories';

import { db } from '#index.ts';
import {
  expenseCategory as expenseCategoryTable,
  expenseSubcategory as expenseSubcategoryTable,
} from './schema';

async function createAndGetAllCategories() {
  const existingCategories = await db.query.expenseCategory.findMany();
  const existingCategorySlugs = existingCategories.map(
    (category) => category.slug,
  );
  const newCategories = categorySlugs.filter(
    (slug) => !existingCategorySlugs.includes(slug),
  );
  if (newCategories.length > 0) {
    await db
      .insert(expenseCategoryTable)
      .values(newCategories.map((slug) => ({ slug })));
  }
  return await db.query.expenseCategory.findMany();
}

async function createAndGetSubcategories(
  category: typeof expenseCategoryTable.$inferSelect,
) {
  const existingSubcategories = await db.query.expenseSubcategory.findMany({
    where: {
      categoryId: category.id,
    },
  });
  const existingSubcategorySlugs = existingSubcategories.map(
    (subcategory) => subcategory.slug,
  );
  const newSubcategories = subcategoriesByCategory[category.slug].filter(
    (slug) => !existingSubcategorySlugs.includes(slug),
  );
  if (newSubcategories.length > 0) {
    await db
      .insert(expenseSubcategoryTable)
      .values(
        newSubcategories.map((slug) => ({ slug, categoryId: category.id })),
      );
  }
  return await db.query.expenseSubcategory.findMany({
    where: {
      categoryId: category.id,
    },
  });
}

async function initCategories() {
  const categories = await createAndGetAllCategories();
  for (const category of categories) {
    await createAndGetSubcategories(category);
  }
  console.log('✅ Initialized categories and subcategories');
}

async function main() {
  // Check categories and subcategories slug arrays from utils for uniquness
  if (new Set(categorySlugs).size != categorySlugs.length) {
    throw new Error('Category slugs are not unique');
  }
  if (new Set(subcategorySlugs).size != subcategorySlugs.length) {
    throw new Error('Subcategory slugs are not unique');
  }

  await reset(db, { expenseCategoryTable, expenseSubcategoryTable });
  await initCategories();
}

await main();
