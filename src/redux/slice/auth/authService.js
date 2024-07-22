import axios from "axios";
import { AUTH, BASE_URL } from "../api/apiUrl";

const register = async (data) => {
  const response = await axios.post(BASE_URL + AUTH.CREATE, data);
  if (response?.data?.error == true) {
    throw new Error(response?.data?.data);
  }
  return response.data.data;
};
const login = async (data) => {
  const response = await axios.post(BASE_URL + AUTH.LOGIN, data);
  if (response?.data?.error == true) {
    throw new Error(response?.data?.data);
  }
  if (response.data.data.token && typeof response.data.data.token == 'string') {
    localStorage.setItem("auth", JSON.stringify(response.data.data));
  }
  return response.data.data;
};
const logout = async () => {
  localStorage.removeItem("auth");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
