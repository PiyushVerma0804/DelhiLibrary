import { login as loginAPI, register as registerAPI } from './api-base.js';

export const authService = {
  login: async (userData) => {
    const response = await loginAPI(userData);
    return response.data;
  },

  register: async (userData) => {
    const response = await registerAPI(userData);
    return response.data;
  }
};

export default authService;
