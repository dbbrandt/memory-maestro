// Temporary dummy user data
import { _getUsers } from './_DATA.js'

const prod = {
  BASE_URL: "https://api.memorymaestro.com",
  API_URL:   "https://api.memorymaestro.com/api"
};

const dev = {
  BASE_URL: "http://localhost",
  API_URL: "http://localhost/api"
};

const { BASE_URL, API_URL } = process.env.NODE_ENV === 'development' ? dev : prod;
console.log('BASE_URL: ', BASE_URL);

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const fixupGoalImage = goals => {
  let host = '';
  goals.forEach(goal => {
    const { image_url } = goal;
    if (!!image_url) {
      host = image_url.includes('http') ? '' : BASE_URL;
      goal.image_url = host + image_url;
    }
  });
  return goals;
};

const fixupInteractionImage = interactions => {
  let host = '';
  interactions.forEach(interaction => {
    const { stimulus_url } = interaction.prompt;
    if (!!stimulus_url) {
      host = stimulus_url.includes('http') ? '' : BASE_URL;
      interaction.prompt.stimulus_url = host + stimulus_url;
    }
  });
  return interactions;
};

let Api = {};

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

Api.fetchGoals = () => {
  return fetch(API_URL + "/goals", { headers })
    .then(res => res.json())
    .then(data => {
      if (!data.message)
        return fixupGoalImage(data).sort((a, b) => (a.title > b.title ? 1 : -1));
      else
        return [];
    })
    .catch(error => {
      console.log("Error fetching Goals: ", error);
    });
};

Api.addGoal = goal => {
  return fetch(API_URL + "/goals", {
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
  return fetch(API_URL + "/goals/" + goal.id, {
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
  return fetch(API_URL + "/goals/" + id, {
    method: 'DELETE',
    headers,
  })
    .catch(error => {
      console.log("Error deleting goal: ", error);
    });
};

Api.fetchInteractions = id => {
  return fetch(`${API_URL}/goals/${id}/interactions?deep=true`, { headers })
    .then(interaction => interaction.json())
    .then(data => {
        if (!data.message)
          return fixupInteractionImage(data).sort((a, b) => (a.title > b.title ? 1 : -1));
        else
          return [];
      }
    )
    .catch(error => {
      console.log("Error fetching Interactions: ", error);
    });
};

Api.addInteraction = (interaction, goalId) => {
  return fetch(`${API_URL}/goals/${goalId}/interactions`, {
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
  return fetch(`${API_URL}/goals/${goalId}/interactions/${id}?deep=true`, {
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
  return fetch(API_URL + "/interactions/" + id, {
    method: 'DELETE',
    headers,
  })
    .catch(error => {
      console.log("Error deleting interaction: ", error);
    });
};

Api.fetchRounds = id => {
  return fetch(`${API_URL}/goals/${id}/rounds`, { headers })
    .then(rounds => rounds.json())
    .catch(error => {
      console.log("Error fetching Rounds: ", error);
    });
};

export default Api;
