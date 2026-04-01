const API_KEY = "94f4a65fd4625e9e43edc06511f0535d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  if (!query) {
    alert("Please enter a movie name");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();

    console.log(data); // helps debug

    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById("movies");
  container.innerHTML = "";

  if (!movies || movies.length === 0) {
    container.innerHTML = "<p>No results found</p>";
    return;
  }

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
      <button onclick="watchTrailer('${movie.title}')">Trailer</button>
    `;

    container.appendChild(div);
  });
}

function watchTrailer(title) {
  const query = encodeURIComponent(title + " trailer");
  window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
}