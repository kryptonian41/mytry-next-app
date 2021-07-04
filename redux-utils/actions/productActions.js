import axios from "axios";
import { CREATE_REVIEW } from "./types";

export const createReview =
  (data, onSuccess = () => {}) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    try {
      const res = await axios.post("/api/reviews", body, config);
      dispatch({ type: CREATE_REVIEW, payload: res.data });
      onSuccess();
    } catch (err) {
      window.alert("Error occured while posting review. Please try again.");
    }
  };
