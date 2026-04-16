import { getMovieDetails } from './api.js';

export function addToFavorites(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to Favorites!");
  } else {
    alert("Already in Favorites!");
  }
}

export async function showFavorites() {
  let favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesContent = document.getElementById("favoritesContent");
  
  if (favoriteIds.length === 0) {
    favoritesContent.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  // Fetch details for all favorite movies
  const favorites = await Promise.all(
    favoriteIds.map(id => getMovieDetails(id))
  );

  favoritesContent.innerHTML = favorites.map(movie => `
    <div class="movie-card">
      <div class="movie-rating-badge">⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}</div>
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title} movie poster" onerror="this.src='https://via.placeholder.com/200x300?text=No+Image'">
      <h3>${movie.title}</h3>
      <p>${movie.release_date || 'N/A'}</p>
      <button onclick="window.playTrailer('${movie.id}')">▶ Trailer</button>
      <button onclick="window.removeFromFavorites('${movie.id}')">Remove</button>
    </div>
  `).join("");
}

export function removeFromFavorites(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(id => id !== movieId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  showFavorites();
}
