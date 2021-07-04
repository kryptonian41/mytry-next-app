import { SET_CATEGORY, UNSET_CATEGORY, SET_SORT } from "../actions/types";

const initialState = {
  categoryId: null,
  sorting: null,
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
    case SET_SORT:
      return {
        ...state,
        sorting: action.payload,
      };
    default:
      return state;
  }
}
