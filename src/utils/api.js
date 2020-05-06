// Temporary dummy user data
import { _getUsers } from "./_DATA.js";
import bufferFrom from "buffer-from";

const prod = {
  BASE_URL: "https://api.memorymaestro.com",
  API_URL: "https://api.memorymaestro.com/api"
};

const dev = {
  BASE_URL: "http://localhost",
  API_URL: "http://localhost/api"
};

const { BASE_URL, API_URL } =
  process.env.NODE_ENV === "development" ? dev : prod;
console.log("BASE_URL: ", BASE_URL);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const fixupGoalImage = goals => {
  let host = "";
  goals.forEach(goal => {
    const { image_url } = goal;
    if (!!image_url) {
      host = image_url.includes("http") ? "" : BASE_URL;
      goal.image_url = host + image_url;
    }
  });
  return goals;
};

const fixupInteractionImage = interactions => {
  let host = "";
  interactions.forEach(interaction => {
    const { stimulus_url } = interaction.prompt;
    if (!!stimulus_url) {
      host = stimulus_url.includes("http") ? "" : BASE_URL;
      interaction.prompt.stimulus_url = host + stimulus_url;
    }
  });
  return interactions;
};

let Api = {};

// Temporary user api
Api.getUsers = () => {
  return _getUsers().then(users => users);
};

Api.getInitialData = () => {
  return Promise.all([_getUsers(), Api.fetchGoals()]).then(
    ([users, goals]) => ({
      users,
      goals
    })
  );
};

Api.fetchGoals = () => {
  return fetch(API_URL + "/goals", { headers })
    .then(res => res.json())
    .then(data => {
      if (!data.message)
        return fixupGoalImage(data).sort((a, b) =>
          a.title > b.title ? 1 : -1
        );
      else return [];
    })
    .catch(error => {
      console.log("Error fetching Goals: ", error);
    });
};

Api.getPresignedGoalUrl = (id, filename) => {
  return fetch(
    API_URL + "/goals/" + id + "/presigned_url?filename=" + filename,
    { headers }
  )
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching Goals: ", error);
    });
};

Api.updateGoalImage = (goal, data, uploadUrl, fileUrl) => {
  return uploadFileToAws(uploadUrl, data).then(res => {
    if (res) {
      console.log("Failed to upload image to AWS", uploadUrl);
      return { message: res };
    } else {
      goal.image_url = fileUrl;
      return fetch(API_URL + "/goals/" + goal.id, {
        method: "PUT",
        headers,
        body: JSON.stringify(goal)
      })
        .then(res => res.json())
        .catch(error => {
          console.log("Error saving goal image: ", error);
        });
    }
  });
};

const uploadFileToAws = (uploadUrl, data) => {
  const buf = bufferFrom(
    data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  return fetch(uploadUrl, {
    method: "PUT",
    body: buf
  })
    .then(response => response.text())
    .catch(error => {
      console.log("Error in UploadFilesToAWS: ", error);
    });
};

Api.addGoal = goal => {
  return fetch(API_URL + "/goals", {
    method: "POST",
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
    method: "PUT",
    headers,
    body: JSON.stringify(goal)
  })
    .then(res => res.json())
    .catch(error => {
      console.log("Error saving goal: ", error);
    });
};

Api.deleteGoal = id => {
  return fetch(API_URL + "/goals/" + id, {
    method: "DELETE",
    headers
  }).catch(error => {
    console.log("Error deleting goal: ", error);
  });
};

Api.fetchInteractions = id => {
  return fetch(`${API_URL}/goals/${id}/interactions?deep=true`, { headers })
    .then(interaction => interaction.json())
    .then(data => {
      if (!data.message)
        return fixupInteractionImage(data).sort((a, b) =>
          a.title > b.title ? 1 : -1
        );
      else return [];
    })
    .catch(error => {
      console.log("Error fetching Interactions: ", error);
    });
};

Api.getPresignedInteractionUrl = (goal_id, id, filename) => {
  return fetch(
    API_URL +
      "/goals/" +
      goal_id +
      "/interactions/" +
      id +
      "/presigned_url?filename=" +
      filename,
    { headers }
  )
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching Interactions: ", error);
    });
};

Api.updateInteractionImage = (interaction, goalId, data, uploadUrl, fileUrl) => {
  return uploadFileToAws(uploadUrl, data).then(res => {
    if (res) {
      console.log(`Failed to upload image ${fileUrl} to AWS`, res);
      return { message: res};
    } else {
      interaction.prompt.stimulus_url = fileUrl;
      const { id } = interaction;
      return fetch(`${API_URL}/goals/${goalId}/interactions/${id}?deep=true`, {
        method: "PUT",
        headers,
        body: JSON.stringify(interaction)
      })
        .then(res => res.json())
        .catch(error => {
          console.log("Error saving interaction: ", error);
        });
    }
  });
};


Api.addInteraction = (interaction, goalId) => {
  return fetch(`${API_URL}/goals/${goalId}/interactions`, {
    method: "POST",
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
    method: "PUT",
    headers,
    body: JSON.stringify(interaction)
  })
    .then(res => res.json())
    .catch(error => {
      console.log("Error saving interaction: ", error);
    });
};

Api.deleteInteraction = (goalId, id) => {
  return fetch(`${API_URL}/goals/${goalId}/interactions/${id}`, {
    method: "DELETE",
    headers
  }).catch(error => {
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

Api.startRound = (id, size) => {
  return fetch(`${API_URL}/goals/${id}/interactions?size=${size}&deep=game`, { headers })
    .then(interactions => interactions.json())
    .catch(error => {
      console.log("Error starting Round: ", error);
    });
};

Api.submitReview = (goalId, id, roundId, answerVal, scoreVal, correctVal, reviewCorrectVal) => {
  return fetch(`${API_URL}/goals/${goalId}/interactions/${id}/submit-review`, {
    method: "POST",
    headers,
    body: JSON.stringify({roundId, answerVal, scoreVal, correctVal, reviewCorrectVal})}
    )
    .then(response => response.json())
    .then(json => json.round)
    .catch(error => {
      console.log("Error submitting round review: ", error);
    });
};

Api.fetchRoundResponses = (goalId, roundId) => {
  return fetch(`${API_URL}/goals/${goalId}/rounds/${roundId}/round_responses?deep=true`, { headers })
    .then(result => result.json())
    .catch(error => {
      console.log("Error fetching RoundResponses: ", error);
    });
};


export default Api;
