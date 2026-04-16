import { searchMovies, getTrendingMovies } from './api.js';
import { displayResults, renderTrending, showDetails, setFeaturedMovie, playTrailer, closeTrailer } from './ui.js';
import { showFavorites, addToFavorites } from './storage.js';

// Make functions globally accessible for onclick handlers
window.showDetails = showDetails;
window.addToFavorites = addToFavorites;
window.playTrailer = playTrailer;
window.closeTrailer = closeTrailer;

// Get DOM elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const favoritesBtn = document.getElementById("favoritesBtn");

// Handle search functionality
async function handleSearch() {
  const query = searchInput.value;
  if (query.trim() === "") { 
    results.innerHTML = "<p>Please enter a movie title.</p>";
    return; 
  }
    
  if (searchBtn) searchBtn.innerText = `Results for "${query}"`;
  results.innerHTML = `<p>Searching for "${query}"...</p>`;

  const movies = await searchMovies(query);
  if (movies.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
  } else {
    displayResults(movies);
  }
}

// Event listeners
searchBtn.addEventListener("click", handleSearch);

// Allow Enter key to trigger search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

favoritesBtn.addEventListener("click", () => {
  showFavorites();
});

// Load trending movies on startup
getTrendingMovies().then(movies => {
  console.log("Trending movies fetched:", movies);
  if (movies.length > 0) {
    setFeaturedMovie(movies[0]);
    renderTrending(movies);
  } else {
    console.warn("No trending movies returned");
    document.getElementById("trending").innerHTML = "<p>No trending movies available</p>";
  }
}).catch(error => {
  console.error("Error loading trending movies:", error);
});                                             