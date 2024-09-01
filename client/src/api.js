import axios from 'axios';

const API_URL = 'http://localhost:5000';
// const API_URL = '5000-idx-recipe-sharing-platformgit-1724994789362.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
//   withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["x-auth-token"] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const getRecipes = () => api.get('/recipes');
export const createRecipe = (recipeData) => api.post('/recipes', recipeData);
export const updateRecipe = (id, recipeData) => api.put(`/recipes/${id}`, recipeData);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);
export const searchRecipes = (query) => api.get(`/recipes?search=${query}`);
export const getUserDetails = () => api.get("/auth/user");

export default api;
