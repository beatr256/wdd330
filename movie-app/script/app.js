import { searchMovies, getTrendingMovies } from './api.js';
import { displayResults, renderTrending } from './ui.js';
import { showFavorites } from './storage.js';

document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  if (!query) {
    document.getElementById("results").innerHTML = "<p>Please enter a movie title.</p>";
    return;
  }
  const movies = await searchMovies(query); // OMDb
  if (movies.length === 0) {
    document.getElementById("results").innerHTML = "<p>No results found.</p>";
  } else {
    displayResults(movies);
  }
});

document.getElementById("favoritesBtn").addEventListener("click", () => {
  showFavorites();
});

// Load trending movies from TMDb on startup
getTrendingMovies().then(renderTrending);
