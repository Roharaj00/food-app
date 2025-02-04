import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipeDetails } from '../../services/api';
import axios from '../../services/auth';
import { Clock, ExternalLink, Heart } from 'lucide-react';

const API_URL = "http://localhost:3000/api";

const ViewRecipes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      try {
        // Fetch recipe details
        const data = await fetchRecipeDetails(id);
        setRecipe(data);

        // Check like status if logged in
        if (token) {
          try {
            const likeResponse = await axios.get(`${API_URL}/recipes/${id}/like-status`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setIsLiked(likeResponse.data.isLiked);
          } catch (error) {
            console.error('Error checking like status:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  // Handle like/unlike functionality
  const handleLikeToggle = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // Use the single endpoint for liking/unliking
      const response = await axios.post(`${API_URL}/like/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update like status based on the response
      setIsLiked(response.data.liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  return (
    <div className="recipe-detail-page relative">
      <div className="recipe-detail-container">
        {/* Like Button */}
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
        >
          <Heart 
            className={`w-6 h-6 ${
              isLiked 
                ? 'fill-current' 
                : 'stroke-current'
            }`} 
          />
        </button>

        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-image-container relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipe-detail-image"
            onError={(e) => {
              e.target.src = '/api/placeholder/600/400';
            }}
          />
        </div>

        <div className="recipe-meta">
          <div className="recipe-time">
            <Clock className="meta-icon" />
            <span>{recipe.readyInMinutes} mins</span>
          </div>
          <div className="recipe-servings">
            <span>Servings: {recipe.servings}</span>
          </div>
        </div>

        <h2 className="section-heading">Ingredients</h2>
        <ul className="ingredients-list">
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="ingredient-item">
              {ingredient.name} - {ingredient.amount} {ingredient.unit}
            </li>
          ))}
        </ul>

        <h2 className="section-heading">Instructions</h2>
        <div
          className="recipe-instructions"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        ></div>

        <h2 className="section-heading">Nutrition Information</h2>
        <div className="recipe-nutrition">
          <p>Calories: {recipe.nutrition?.nutrients.find(nutrient => nutrient.name === "Calories")?.amount} kcal</p>
          <p>Fat: {recipe.nutrition?.nutrients.find(nutrient => nutrient.name === "Fat")?.amount} g</p>
          <p>Protein: {recipe.nutrition?.nutrients.find(nutrient => nutrient.name === "Protein")?.amount} g</p>
          <p>Carbohydrates: {recipe.nutrition?.nutrients.find(nutrient => nutrient.name === "Carbohydrates")?.amount} g</p>
        </div>

        <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="source-recipe-link"
        >
          <span>View Full Recipe</span>
          <ExternalLink className="external-link-icon" size={20} />
        </a>
      </div>
    </div>
  );
};

export default ViewRecipes;