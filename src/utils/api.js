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

Api.updateGoal = goal => {
  return fetch(apiURL + "/goals/" + goal.id, {
    method: 'PUT',
    headers,
    body: JSON.stringify(goal)
  })
    .then(res=> res.json())
    .catch(error => {
      console.log("Error saving goal: ", error);
    });
};

Api.deleteGoal = id => {
  return fetch(apiURL + "/goals/" + id, {
    method: 'DELETE',
    headers,
  })
    .catch(error => {
      console.log("Error deleting goal: ", error);
    });
};

Api.fetchInteractions = id => {
  return fetch(`${apiURL}/goals/${id}/interactions?deep=true`, { headers })
    .then(interaction => interaction.json())
    .then(data => {
        if (!data.message)
          return fixupImageUrl(data).sort((a, b) => (a.title > b.title ? 1 : -1));
        else
          return [];
      }
    )
    .catch(error => {
      console.log("Error fetching Interactions: ", error);
    });
};

Api.addInteraction = (interaction, goalId) => {
  return fetch(`${apiURL}/goals/${goalId}/interactions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(interaction)
  })
    .then(res => res.json())
    .catch(error => {
      console.log("Error saving interaction: ", error);
    });
};

Api.updateInteraction = (interaction, goalId) => {
  const { id } = interaction;
  return fetch(`${apiURL}/goals/${goalId}/interactions/${id}?deep=true`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(interaction)
  })
    .then(res => res.json())
    .catch(error => {
      console.log("Error saving interaction: ", error);
    });
};

Api.deleteInteraction = id => {
  return fetch(apiURL + "/interactions/" + id, {
    method: 'DELETE',
    headers,
  })
    .catch(error => {
      console.log("Error deleting interaction: ", error);
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
