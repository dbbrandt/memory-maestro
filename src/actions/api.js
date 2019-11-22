const baseURL = "http://dev.memorymaestro.com/api/";
// const baseURL = "http://localhost/api/";
const headers = {
  Accept: "application/json"
};

let Api = {}

Api.fetchGoals = () => {
  return fetch(baseURL + "goals", { headers })
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching Goals: ", error);
    });
};

Api.fetchInteractionss = (id) => {
  return fetch(`${baseURL}/${id}/goals`, { headers })
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching Interactions: ", error);
    });
};

export default Api
