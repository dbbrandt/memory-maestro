import bufferFrom from "buffer-from";

const prod = {
  BASE_URL: "https://api.memorymaestro.com",
  API_URL: "https://api.memorymaestro.com/api"
};

const dev = {
  BASE_URL: "http://localhost",
  API_URL: "http://localhost/api"
};

const { BASE_URL, API_URL } = process.env.NODE_ENV === "development" ? dev : prod;

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


Api.fetchUsers = () => {
  return fetch(API_URL + "/users", { headers })
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching Users: ", error);
    });
};

Api.addUser = user => {
  user["password"] = "google";
  return fetch(API_URL + "/users", {
    method: "POST",
    headers,
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .catch(error => {
      console.log("Error saving user: ", error);
    });
};

Api.updateUser = user => {
  return fetch(API_URL + "/users/" + user.id, {
    method: "PUT",
    headers,
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .catch(error => {
      console.log("Error saving user: ", error);
    });
};

Api.getPresignedUserUrl = (id, filename) => {
  return fetch(
    API_URL + "/users/" + id + "/presigned_url?filename=" + filename,
    { headers }
  )
    .then(res => res.json())
    .catch(error => {
      console.log("Error fetching User pre-signed URL: ", error);
    });
};

Api.updateUserImage = (user, data, uploadUrl, fileUrl) => {
  return uploadFileToAws(uploadUrl, data).then(res => {
    if (res) {
      console.log("Failed to upload image to AWS", uploadUrl);
      return { message: res };
    } else {
      return fetch(API_URL + "/users/" + user.id, {
        method: "PUT",
        headers,
        body: JSON.stringify({avatar_url: fileUrl})
      })
        .then(res => res.json())
        .catch(error => {
          console.log("Error saving user image: ", error);
        });
    }
  });
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
      console.log("Error fetching Goal pre-signed URL: ", error);
    });
};

Api.updateGoalImage = (id, data, uploadUrl, fileUrl) => {
  return uploadFileToAws(uploadUrl, data).then(res => {
    if (res) {
      console.log("Failed to upload image to AWS", uploadUrl);
      return { message: res };
    } else {
      return fetch(API_URL + "/goals/" + id, {
        method: "PUT",
        headers,
        body: JSON.stringify({ avatar_url:  fileUrl })
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

Api.getPresignedInteractionUrl = (goalId, id, filename) => {
  return fetch(
    API_URL +
      "/goals/" +
      goalId +
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

Api.checkAnswer = (goalId, id, answer) => {
  console.log(`API.checkAnswer goalId: ${goalId} interactionId: ${id}`);
  return fetch(`${API_URL}/goals/${goalId}/interactions/${id}/check_answer?answer=${answer}`, { headers })
    .then(response => response.json())
    .catch(error => {
      console.log("Error checking round answer: ", error);
    });
};

Api.submitReview = (goalId, id, round, answer, correct, score, review) => {
  return fetch(`${API_URL}/goals/${goalId}/interactions/${id}/submit_review`, {
    method: "POST",
    headers,
    body: JSON.stringify({round, answer, score, correct, review})}
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
