import Api from "../utils/api";
import { fetchGoals } from "./goals";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {setLoading} from "./loading";

export const handleInititalData = () => {
  return dispatch => {
    dispatch(showLoading());
    dispatch(setLoading(true));
    Api.fetchGoals()
      .then((goals ) => {
        dispatch(fetchGoals(goals));
        dispatch(hideLoading());
        dispatch(setLoading(false));
    })
    .catch((error) => (
        alert('Failed to download initial data '+error)
      )
    )
  };
};
