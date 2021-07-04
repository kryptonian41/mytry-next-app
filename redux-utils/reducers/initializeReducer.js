import { FINISH_INIT_APP, INIT_APP } from "../actions/types";

const initialState = {
  isInitializing: true,
  appInitialized: false,
};

export default function initializeReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        isInitializing: true,
      };
    case FINISH_INIT_APP:
      return {
        ...state,
        isInitializing: false,
        appInitialized: true,
      };
    default:
      return state;
  }
}
