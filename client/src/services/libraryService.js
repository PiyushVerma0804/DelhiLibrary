import { 
  getLibraries as getLibrariesAPI, 
  getLibraryById as getLibraryByIdAPI, 
  createLibrary as createLibraryAPI,
  deleteLibrary as deleteLibraryAPI 
} from './api-base.js';

export const libraryService = {
  getAllLibraries: async () => {
    const response = await getLibrariesAPI();
    return response.data;
  },

  getLibraryById: async (id) => {
    const response = await getLibraryByIdAPI(id);
    return response.data;
  },

  createLibrary: async (libraryData) => {
    const response = await createLibraryAPI(libraryData);
    return response.data;
  },

  deleteLibrary: async (id) => {
    const response = await deleteLibraryAPI(id);
    return response.data;
  }
};

export default libraryService;
