import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchRecipes = async (searchQuery = "") => {
  try {
    const response = await axios.get(`${API_URL}/recipes/search`, {
      params: {
        name: searchQuery.trim(), // Use 'name' as the parameter
      },
    });
    return response.data; // Return the fetched recipes
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return []; // Return an empty array in case of error
  }
};

export const fetchRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/${id}`);

    // Check if the response has valid data
    if (response && response.data) {
      return response.data; // Return recipe details data
    } else {
      throw new Error("Recipe not found");
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null; // Return null if error occurs
  }
};
