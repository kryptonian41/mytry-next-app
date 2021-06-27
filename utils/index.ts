import { Category } from "types/commons";

export const processCategories = (categories: Category[]) => {
  const parentCategories = categories.filter(
    (category) =>
      category.parent === 0 && category.slug.toLowerCase() !== "uncategorized"
  );
  const childCategories = categories.filter(
    (category) => category.parent !== 0
  );
  const parentToChildMapping = childCategories.reduce((acc, category) => {
    const { parent } = category;
    if (!acc[parent]) acc[parent] = [];
    acc[category.parent].push(category);
    return acc;
  }, {});
  return { parentCategories, parentToChildMapping };
};

export const isServer = () => typeof window === 'undefined'