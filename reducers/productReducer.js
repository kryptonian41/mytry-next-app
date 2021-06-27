import { SET_REVIEWS, CREATE_REVIEW } from "actions/types";

const initialState = {
  reviews: [],
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case CREATE_REVIEW:
      const updatedReviews = state.reviews;
      const review = {
        ...action.payload,
        review: `<p>${action.payload.review}</p>\n`,
      };
      updatedReviews.unshift(review);
      return {
        ...state,
        reviews: updatedReviews,
      };
    default:
      return state;
  }
}
