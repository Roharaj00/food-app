/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import axios from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:3000/api";

const LikedRecipes = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/liked-recipes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Assuming response.data contains detailed recipe information
        setLikedRecipes(response.data);  // Directly set the detailed recipes
        setLoading(false);
      } catch (err) {
        console.error('Error fetching liked recipes:', err);
        setError('Failed to fetch liked recipes');
        setLoading(false);
      }
    };

    fetchLikedRecipes();
  }, [navigate]);

  const handleRecipeClick = (id) => {
    navigate(`/view-recipe/${id}`);  // Navigate using spoonacularId
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
  
  if (error) return <div>{error}</div>;

  return (
    <div className="liked-recipes-container">
      <h2>My Liked Recipes</h2>
      {likedRecipes.length === 0 ? (
        <p>You haven't liked any recipes yet.</p>
      ) : (
        <div className="recipes-grid">
          {likedRecipes.map(recipe => (
            <div 
              key={recipe.spoonacularId} // Use spoonacularId as the key
              className="recipe-card"
              onClick={() => handleRecipeClick(recipe.id)} // Pass spoonacularId to navigate
            >
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                onError={(e) => {
                  e.target.src = '/api/placeholder/300/200';
                }}
              />
              <h3>{recipe.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedRecipes;
