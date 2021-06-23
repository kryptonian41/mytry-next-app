import { useState } from "react";
import { connect } from "react-redux";
import categoriesStyle from "./categories.module.css";

const Categories = ({ categories, skinTypeCategories, setCategory }) => {
  const [test, setTest] = useState(false);

  return (
    <div className={categoriesStyle.container}>
      <h2 className={categoriesStyle.heading}>skin type</h2>
      <div className={categoriesStyle.categoriesWrapper}>
        {skinTypeCategories.map((skinTypeCategory) => (
          <button
            onClick={() => setCategory(skinTypeCategory.id)}
            key={skinTypeCategory.id}
            className={categoriesStyle.category}
          >
            {skinTypeCategory.name}
          </button>
        ))}
      </div>
      <h2 className={categoriesStyle.heading}>categories</h2>
      <div className={categoriesStyle.categoriesWrapper}>
        {categories.map((category) => (
          <button
            onClick={() => setCategory(category.id)}
            key={category.id}
            className={categoriesStyle.category}
          >
            {category.name}
          </button>
        ))}
      </div>
      <h2 className={categoriesStyle.heading}>sort by</h2>
      <div className={categoriesStyle.categoriesWrapper}>
        <button className={categoriesStyle.category}>Price Low-High</button>
        <button className={categoriesStyle.category}>Price High-Low</button>
        <button className={categoriesStyle.category}>A to Z</button>
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
