import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import { connect } from "react-redux";
import categoriesStyle from "./categories.module.css";

interface Props {
  categories: import("types/commons").Category[];
  parentToChildCategoryMap: {
    [parentId: string]: import("types/commons").Category[];
  };
  setCategory: (...any) => void;
  setSorting: (...any) => void;
}

const SKIN_TYPE_CATEGORY_SLUG = "skin-type";

const Categories: React.FC<Props> = ({
  categories,
  parentToChildCategoryMap,
  setCategory,
  setSorting,
}) => {
  const { parentCategories, skinTypeCategory } = useMemo(() => {
    const skinTypeCategoryIndex = categories.findIndex(
      (category) => category.slug === SKIN_TYPE_CATEGORY_SLUG
    );
    const parentCategories = [...categories];
    const skinTypeCategory =
      skinTypeCategoryIndex !== -1
        ? parentCategories.splice(skinTypeCategoryIndex, 1)[0]
        : null;
    return { parentCategories, skinTypeCategory };
  }, [categories, parentToChildCategoryMap]);

  const [mobileView, setMobileView] = useState(null);

  const mobileViewRef = useRef(mobileView);

  const [showCategories, setShowCategories] = useState(false);

  const handleClick = useCallback(() => {
    setShowCategories((prev) => !prev);
  }, []);

  useLayoutEffect(() => {
    setMobileView(window.matchMedia("(max-width: 640px)").matches);
  }, []);

  const matchHandler = ({ matches }) => {
    if (matches === mobileViewRef.current) return;
    mobileViewRef.current = matches;
    setMobileView(matches);
  };

  useEffect(() => {
    window
      .matchMedia("(max-width: 640px)")
      .addEventListener("change", matchHandler);

    return () => {
      window
        .matchMedia("(max-width: 640px)")
        .removeEventListener("change", matchHandler);
    };
  }, []);

  return (
    <div className={categoriesStyle.container} onClick={() => handleClick()}>
      {skinTypeCategory && (
        <div>
          <h2 className={categoriesStyle.heading}>skin type</h2>
          {((mobileView && showCategories) || !mobileView) && (
            <div className={categoriesStyle.categoriesWrapper}>
              {parentToChildCategoryMap[skinTypeCategory.id].map(
                (skinTypeCategory) => (
                  <button
                    onClick={() => setCategory(skinTypeCategory.id)}
                    key={skinTypeCategory.id}
                    className={categoriesStyle.category}
                  >
                    {skinTypeCategory.name}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}
      <div>
        <h2 className={categoriesStyle.heading}>categories</h2>
        {((mobileView && showCategories) || !mobileView) && (
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
        )}
      </div>
      <div>
        <h2 className={categoriesStyle.heading}>sort by</h2>
        {((mobileView && showCategories) || !mobileView) && (
          <div className={categoriesStyle.categoriesWrapper}>
            <button
              onClick={() => setSorting("priceAscending")}
              className={categoriesStyle.category}
            >
              Price Low-High
            </button>
            <button
              onClick={() => setSorting("priceDescending")}
              className={categoriesStyle.category}
            >
              Price High-Low
            </button>
            <button
              onClick={() => setSorting("atoz")}
              className={categoriesStyle.category}
            >
              A to Z
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCategory: (categoryId) => {
    dispatch({ type: "SET_CATEGORY", payload: categoryId });
  },
  setSorting: (sorting) => {
    dispatch({ type: "SET_SORT", payload: sorting });
  },
});

export default connect(null, mapDispatchToProps)(Categories);
