import { useEffect, useState } from 'react';
import { fetchRecipes } from '../../services/api';
import { Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Helper function to get complete image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/api/placeholder/300/200'; // Fallback placeholder
    // If the image path is a full URL, return it as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, construct the full URL (adjust the base URL according to your API)
    return `https://spoonacular.com/recipeImages/${imagePath}`;
  };

  useEffect(() => {
    const loadRecipes = async () => {
      if (!isSearching) return;
      setIsLoading(true);
      try {
        const data = await fetchRecipes(searchQuery);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
        setIsSearching(false);
      }
    };

    loadRecipes();
  }, [isSearching, searchQuery]);

  useEffect(() => {
    const loadInitialRecipes = async () => {
      try {
        const data = await fetchRecipes('');
        setRecipes(data);
      } catch (error) {
        console.error("Error loading initial recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSearching(true);
  };

  const handleViewRecipe = (recipeId) => {
    navigate(`/view-recipe/${recipeId}`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="recipes-page">
      <div className="recipes-container">
        <div className="recipes-header">
          <h1 className="recipes-title">Discover Our Recipes</h1>
          <p className="recipes-subtitle">
            Explore our curated collection of delicious recipes, from quick weekday meals to gourmet weekend delights.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="search-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for a recipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </div>
        </form>

        <div className="recipes-grid">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="recipe-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="recipe-image-wrapper">
                  <img
                    src={getImageUrl(recipe.image)}
                    alt={recipe.title}
                    className="recipe-image"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/200';
                    }}
                  />
                  <div className="recipe-overlay" />
                </div>

                <div className="recipe-content">

                  <h3 className="recipe-title">{recipe.title}</h3>

                  <div className="recipe-meta">
                    <div className="recipe-time">
                      <Clock className="meta-icon" />
                      <span>{recipe.readyInMinutes || 30} mins</span>
                    </div>
                    <div className="recipe-rating">
                      <Star className="star-icon" />
                      <span>4.5</span>
                    </div>
                  </div>

                  <button 
                    className="view-recipe-button" 
                    onClick={() => handleViewRecipe(recipe.id)}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-recipes-message">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeList;