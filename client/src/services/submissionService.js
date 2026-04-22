import { 
  createSubmission as createSubmissionAPI, 
  getMySubmissions as getMySubmissionsAPI 
} from './api-base.js';

export const submissionService = {
  createSubmission: async (formData) => {
    const response = await createSubmissionAPI(formData);
    return response.data;
  },

  getMySubmissions: async () => {
    const response = await getMySubmissionsAPI();
    return response.data;
  }
};

export default submissionService;
