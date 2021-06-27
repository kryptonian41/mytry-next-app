import { SET_CATEGORY, UNSET_CATEGORY } from "../actions/types";

const initialState = {
  categoryId: null,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        categoryId: action.payload,
      };
    case UNSET_CATEGORY:
      return {
        ...state,
        categoryId: null,
      };
    default:
      return state;
  }
}
