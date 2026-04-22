import { getDocuments as getDocumentsAPI } from './api-base.js';

export const documentService = {
  getDocuments: async (queryParams = "") => {
    const response = await getDocumentsAPI(queryParams);
    return response.data;
  }
};

export default documentService;
