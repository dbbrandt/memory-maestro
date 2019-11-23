import API from "./api";

export const FETCH_INTERACTIONS = "FETCH_INTERACTIONS";

const fetchInteractions = interactions => {
  return {
    type: FETCH_INTERACTIONS,
    interactions
  };
};

export const handleFetchInteractions = id => {
  return dispatch => {
    API.fetchInteractions(id)
      .then(interactions => dispatch(fetchInteractions(interactions)))
      .catch(error => alert("Fetch Interactions Failed: ", error));
  };
};
