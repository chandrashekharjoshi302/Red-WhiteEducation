import API from "./api"; // Assuming you have an API instance set up

export const login = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  return data;
};

export const register = async (userData) => {
  const { data } = await API.post("/auth/register", userData); // Sends POST request for user registration
  return data;
};
