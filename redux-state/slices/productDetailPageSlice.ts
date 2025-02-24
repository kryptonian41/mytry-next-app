import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Review {
  id: string;
  rating: number;
  review: string;
  reviewer: string;
}

interface ProductDetailPageData {
  reviews: Review[];
}

const initialState: ProductDetailPageData = { reviews: [] };

export const productDetailPageSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setProductReviews: (
      state,
      action: PayloadAction<{ reviews: ProductDetailPageData["reviews"] }>
    ) => {
      state.reviews = action.payload.reviews;
    },
    createProductReview: (state, action: PayloadAction<{ review: Review }>) => {
      state.reviews = [...state.reviews, action.payload.review];
    },
  },
});

export const productDetailPageActions = productDetailPageSlice.actions;
