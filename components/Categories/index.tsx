import React, { useCallback, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'
import categoriesStyle from './categories.module.css'
import { useMatchMedia } from 'utils/hooks/useMatchMedia'
import { useAppDispatch } from 'redux-state/hooks'
import { productFilterActions } from 'redux-state/slices/productFiltersSlice'

interface Props {
  categories: import('types').Category[]
  parentToChildCategoryMap: {
    [parentId: string]: import('types').Category[]
  }
}

const SKIN_TYPE_CATEGORY_SLUG = 'skin-type'

const Categories: React.FC<Props> = ({
  categories,
  parentToChildCategoryMap,
}) => {
  const dispatch = useAppDispatch()

  const setCategory = useCallback(
    (categoryId: number) =>
      dispatch(productFilterActions.setCategory({ categoryId })),
    []
  )

  const setSorting = useCallback(
    (sorting: string) => dispatch(productFilterActions.setSorting({ sorting })),
    []
  )

  const { parentCategories, skinTypeCategory } = useMemo(() => {
    const skinTypeCategoryIndex = categories.findIndex(
      (category) => category.slug === SKIN_TYPE_CATEGORY_SLUG
    )
    const parentCategories = [...categories]
    const skinTypeCategory =
      skinTypeCategoryIndex !== -1
        ? parentCategories.splice(skinTypeCategoryIndex, 1)[0]
        : null
    return { parentCategories, skinTypeCategory }
  }, [categories, parentToChildCategoryMap])

  const { matching: mobileView } = useMatchMedia({
    mediaQuery: '(max-width: 640px)',
  })

  const [showCategories, setShowCategories] = useState(false)

  const handleClick = useCallback(() => {
    setShowCategories((prev) => !prev)
  }, [])

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
              onClick={() => setSorting('priceAscending')}
              className={categoriesStyle.category}
            >
              Price Low-High
            </button>
            <button
              onClick={() => setSorting('priceDescending')}
              className={categoriesStyle.category}
            >
              Price High-Low
            </button>
            <button
              onClick={() => setSorting('atoz')}
              className={categoriesStyle.category}
            >
              A to Z
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories
