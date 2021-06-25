import React, { useMemo } from "react";
import { connect } from "react-redux";
import categoriesStyle from "./categories.module.css";

interface Props {
  categories: import("utils").Category[],
  parentToChildCategoryMap: { [parentId: string]: import("utils").Category[] },
  setCategory: (...any) => void
}

const SKIN_TYPE_CATEGORY_SLUG = 'skin-type'

const Categories: React.FC<Props> = ({ categories, parentToChildCategoryMap, setCategory }) => {
  const { parentCategories, skinTypeCategory } = useMemo(() => {
    const skinTypeCategoryIndex = categories.findIndex(category => category.slug === SKIN_TYPE_CATEGORY_SLUG)
    const parentCategories = [...categories]
    const skinTypeCategory = skinTypeCategoryIndex !== -1 ? parentCategories.splice(skinTypeCategoryIndex, 1)[0] : null
    return { parentCategories, skinTypeCategory }

  }, [categories, parentToChildCategoryMap])

  return (
    <div className={categoriesStyle.container}>
      {skinTypeCategory && <div>
        <h2 className={categoriesStyle.heading}>skin type</h2>
        <div className={categoriesStyle.categoriesWrapper}>
          {parentToChildCategoryMap[skinTypeCategory.id].map((skinTypeCategory) => (
            <button
              onClick={() => setCategory(skinTypeCategory.id)}
              key={skinTypeCategory.id}
              className={categoriesStyle.category}
            >
              {skinTypeCategory.name}
            </button>
          ))}
        </div>
      </div>}
      <div>
        <h2 className={categoriesStyle.heading}>categories</h2>
        <div className={categoriesStyle.categoriesWrapper}>
          {parentCategories.map((category) => (
            <button
              onClick={() => setCategory(category.id)}
              key={category.id}
              className={categoriesStyle.category}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className={categoriesStyle.heading}>sort by</h2>
        <div className={categoriesStyle.categoriesWrapper}>
          <button className={categoriesStyle.category}>Price Low-High</button>
          <button className={categoriesStyle.category}>Price High-Low</button>
          <button className={categoriesStyle.category}>A to Z</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCategory: (categoryId) => {
    dispatch({ type: "SET_CATEGORY", payload: categoryId });
  },
});

export default connect(null, mapDispatchToProps)(Categories);
