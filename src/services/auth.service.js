import axios from "axios";

const API_URL = "https://reqres.in/api/login";

const login = (email, password) => {
  const payload = {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  };
  return axios.post(API_URL, payload).then((response) => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("wishList");
};

export default {
  login,
  logout,
};
