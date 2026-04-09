import { getMovieDetails } from './api.js';
import { addToFavorites } from './storage.js';

export function displayResults(movies) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = movies.map(movie => `
    <div class="movie-card" tabindex="0" role="button">
      <img src="${movie.Poster}" alt="${movie.Title} movie poster">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
      <button onclick="showDetails('${movie.imdbID}')">Details</button>
    </div>
  `).join("");
}

export async function showDetails(id) {
  const movie = await getMovieDetails(id);
  document.getElementById("results").innerHTML = `
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster}" alt="${movie.Title} movie poster">
    <p>${movie.Plot}</p>
    <p>⭐ ${movie.imdbRating}</p>
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
