import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

const registerStepTwo = async (userData) => {
  const response = await axios.post(`${API_URL}register2`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    console.log('Token saved to localStorage:', response.data.token);
  } else {
    console.error('No token received from server');
  }
  return response.data;
};

const logout = async () => {
  try {
    await axios.post(`${API_URL}logout`);
  } catch (error) {
    console.error('Error during server logout:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
};

const authService = { register, registerStepTwo, login, logout };

export default authService;
