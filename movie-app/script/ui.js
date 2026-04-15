import { getMovieDetails } from './api.js';
import { addToFavorites } from './storage.js';

export function setFeaturedMovie(movie) {
  const featured = document.getElementById('featured');
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  featured.style.backgroundImage = `url('${backdropUrl}')`;
  
  document.getElementById('featuredTitle').textContent = movie.title;
  document.getElementById('featuredOverview').textContent = movie.overview || 'No description available';
}

export function displayResults(movies) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = movies.map(movie => `
    <div class="movie-card" tabindex="0" role="button">
      <img src="https://image.tmdb.org/t/p/w400${movie.poster_path}" alt="${movie.title} movie poster">
      <h3>${movie.title}</h3>
      <p>${movie.release_date}</p>
      <button onclick="window.addToFavorites('${movie.id}')">Add to Favorites</button>
      <button onclick="window.showDetails('${movie.id}')">Details</button>
    </div>
  `).join("");
}

export async function showDetails(id) {
  const movie = await getMovieDetails(id);
  document.getElementById("results").innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w400${movie.poster_path}" alt="${movie.title} movie poster">
    <p>${movie.overview}</p>
    <p>⭐ ${movie.vote_average}</p>
  `;
}

export function renderTrending(movies) {
  const trendingDiv = document.getElementById("trending");
  trendingDiv.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title} movie poster">
      <h3>${movie.title}</h3>
    </div>
  `).join("");
}
