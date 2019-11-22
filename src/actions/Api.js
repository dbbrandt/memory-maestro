const baseURL = "http://dev.memorymaestro.com/api/";
// const baseURL = "http://localhost/api/";
const headers = {
  Accept: "application/json"
};

let API = {}

API.fetchGoals = () => {
  return fetch(baseURL + "goals", { headers })
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching Goals: ", error);
      return [{ title: "Error Fetching Goals", error: error }];
    });
};

export default API
