import api from './apiClient';

export const searchNewProjects = async (params = {}) => {
  try {
    const response = await api.post('/new_projects_search', params);
    console.log('[ProjectsAPI] searchNewProjects Success:', response);
    return response;
  } catch (error) {
    console.error('[ProjectsAPI] searchNewProjects Error:', error);
    throw error;
  }
};


export const getProjectById = async (id) => {
  try {
    const response = await api.post(`/new_projects_search?source_id=${id}`);
    console.log('[ProjectsAPI] getProjectById Success:', response);
    // The response for a single ID might be the object itself or an array with one item
    return response;
  } catch (error) {
    console.error('[ProjectsAPI] getProjectById Error:', error);
    throw error;
  }
};

export const testFetchProjects = async () => {
  console.log('[ProjectsAPI] Testing fetch...');
  const data = await searchNewProjects({ page: 2 });
  return data;
};

const projectsApi = {
  searchNewProjects,
  getProjectById,
  testFetchProjects
};

export default projectsApi;
