import categoriesStyle from "./categories.module.css";

const Categories = ({ categories, skinTypeCategories }) => {
  return (
    <div className={categoriesStyle.container}>
      <h2 className={categoriesStyle.heading}>skin type</h2>
      {skinTypeCategories.map((skinTypeCategory) => (
        <p key={skinTypeCategory.id} className={categoriesStyle.category}>
          {skinTypeCategory.name}
        </p>
      ))}
      <h2 className={categoriesStyle.heading}>categories</h2>
      {categories.map((category) => (
        <p key={category.id} className={categoriesStyle.category}>
          {category.name}
        </p>
      ))}
    </div>
  );
};

export default Categories;
