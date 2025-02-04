/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { Star, Clock, Users, ChefHat } from 'lucide-react'; {/*for icons like star clock user and chefhat*/}

const LandingPage = () => {
  return (
    <div className="landing-page" id='landing-page'>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to World Recipes</h1>
          <p className="hero-subtitle">Discover and enjoy recipes from around the world!</p>
          <Link to="/recipes" className="cta-button">
            Explore Recipes
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <ChefHat size={32} />
            <h3>1000+</h3>
            <p>Recipes</p>
          </div>
          <div className="stat-item">
            <Users size={32} />
            <h3>500K+</h3>
            <p>Happy Cooks</p>
          </div>
          <div className="stat-item">
            <Star size={32} />
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-item">
            <Clock size={32} />
            <h3>15min</h3>
            <p>Avg. Prep Time</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id='about-section'>
        <div className="about-content">
          <h2>About Us</h2>
          <p>At World Recipes, we believe that cooking is an art that brings people together. Our platform is dedicated to sharing authentic recipes from different cultures, making it easy for everyone to explore global cuisines from their own kitchen.</p>
          <div className="features-grid">
            <div className="feature">
              <h3>Easy to Follow</h3>
              <p>Step-by-step instructions with detailed images</p>
            </div>
            <div className="feature">
              <h3>Global Cuisine</h3>
              <p>Authentic recipes from around the world</p>
            </div>
            <div className="feature">
              <h3>Community Driven</h3>
              <p>Recipes shared by passionate home chefs</p>
            </div>
            <div className="feature">
              <h3>Expert Tips</h3>
              <p>Professional cooking advice included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>What Our Users Say</h2>

            <div className='reviews-grid'>
              <div className="review-card">
                <div className="review-header">
                  <h4>Sarah</h4>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f5a623" color="#f5a623" />
                    ))}
                  </div>
                </div>
                <p>The recipes are so easy to follow! I've learned to cook dishes I never thought I could make.</p>
              </div>
              
              <div className="review-card">
                <div className="review-header">
                  <h4>Robert</h4>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f5a623" color="#f5a623" />
                    ))}
                  </div>
                </div>
                <p>Amazing variety of authentic recipes. The detailed instructions make everything foolproof.</p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <h4>Rio</h4>
                  <div className="stars">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={16} fill="#f5a623" color="#f5a623" />
                    ))}
                  </div>
                </div>
                <p>Great community of food lovers. I've discovered so many new favorite dishes!</p>
              </div>
            </div>
      </section>

      {/* footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FoodApp</h3>
            <p>Bringing global cuisines to your kitchen with easy-to-follow recipes and a passionate community of food lovers.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/#landing-page">Home</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
              <li><Link to="/#about-section">About</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FoodApp. All rights reserved.</p>
        </div>
      </footer>
    </div>

  );
};

export default LandingPage;