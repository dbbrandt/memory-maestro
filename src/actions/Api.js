let API = {};

const baseURL = "http://www.memorymaestro.com/api/";

API.fetchGoals = () => {
  fetch(baseURL + 'goals')
    .then(res => res.json())
    .catch(error => alert(error));
};

export default API;
