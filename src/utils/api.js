// Temporary dummy user data
import { _getUsers } from './_DATA.js'

// const baseURL = "http://dev.memorymaestro.com";
const baseURL = "http://localhost:80";
const apiURL = baseURL + "/api";
// const apiURL = "/api";
const headers = {
  Accept: "application/json"
};

let Api = {};

Api.fetchGoals = () => {
  return fetch(apiURL + "/goals", { headers })
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching Goals: ", error);
    });
};

const fixupImageUrl = interactions => {
  console.log(interactions);
  interactions.forEach(interaction => {
    interaction.prompt.stimulus_url = baseURL + interaction.prompt.stimulus_url;
  });
  return interactions;
};

Api.fetchInteractions = id => {
  return fetch(`${apiURL}/goals/${id}/interactions?deep=true`, { headers })
    .then(res => res.json())
    .then(data =>
      fixupImageUrl(data).sort((a, b) => (a.title > b.title ? 1 : -1))
    )
    .catch(error => {
      console.log("Error fetching Interactions: ", error);
    });
};

// Temporary user api
Api.getUsers = () => {
  return _getUsers()
    .then((users) => users)
};

Api.getInitialData = () => {
  return Promise.all([
    _getUsers(),
    Api.fetchGoals(),
  ]).then(([users, goals]) => ({
    users,
    goals,
  }))
};

export default Api;
