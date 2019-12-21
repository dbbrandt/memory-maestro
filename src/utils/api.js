// Temporary dummy user data
import { _getUsers } from './_DATA.js'

// const baseURL = "http://www.memorymaestro.com";
// const baseURL = "http://localhost:80";
// const apiURL = baseURL + "/api";
const  baseURL="";
const apiURL = "/api";
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const fixupImageUrl = interactions => {
  interactions.forEach(interaction => {
    const { stimulus_url } = interaction.prompt;
    interaction.prompt.stimulus_url = !!stimulus_url ? baseURL + stimulus_url : '';
  });
  return interactions;
};


let Api = {};

Api.fetchGoals = () => {
  return fetch(apiURL + "/goals", { headers })
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching Goals: ", error);
    });
};

Api.addGoal = goal => {
  return fetch(apiURL + "/goals", {
    method: 'POST',
    headers,
    body: JSON.stringify(goal)
  })
    .then(res => res.json())
    .catch(error => {
      console.log("Error saving goal: ", error);
    });
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
