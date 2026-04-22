import { 
  getAllSubmissions as getAllSubmissionsAPI, 
  updateSubmissionStatus as updateSubmissionStatusAPI 
} from './api-base.js';

export const adminService = {
  getAllSubmissions: async () => {
    const response = await getAllSubmissionsAPI();
    return response.data;
  },

  updateSubmissionStatus: async (id, status) => {
    const response = await updateSubmissionStatusAPI(id, status);
    return response.data;
  }
};

export default adminService;
