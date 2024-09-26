import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

const registerStepTwo = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/registerStepTwo`, data);
    return response.data;
  } catch (error) {
    console.error('Error registering step two:', error);
    throw error;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  return response.data;
};

export default { register, registerStepTwo, login };
