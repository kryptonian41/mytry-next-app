import axios from "axios";
import type { AppDispatch } from "redux-state/store";

export const createReview =
  (data: any, onSuccess = () => {}) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    try {
      const res = await axios.post("/api/reviews", body, config);
      dispatch({ type: "CREATE_REVIEW", payload: res.data });
      onSuccess();
    } catch (err) {
      window.alert("Error occurred while posting review. Please try again.");
    }
  };
