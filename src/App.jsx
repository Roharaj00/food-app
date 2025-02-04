import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/pages/RecipesList';
import LandingPage from './components/pages/LandingPage';
import Layout from './components/layout/Layout';
import ViewRecipes from './components/pages/ViewRecipes';
import Login from './components/pages/LoginPage';
import Register from './components/pages/RegisterPage';
import LikedRecipes from './components/pages/LikedPage';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/view-recipe/:id" element={<ViewRecipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/liked-recipes" element={<LikedRecipes />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;