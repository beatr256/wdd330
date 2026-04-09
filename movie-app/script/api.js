const OMDB_KEY = "94f4a65fd4625e9e43edc06511f0535d"; // Your OMDb key
const TMDB_KEY = "your_tmdb_api_key_here"; // Replace with your TMDb key

export async function searchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("OMDb error:", error);
    return [];
  }
}

export async function getMovieDetails(id) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}`);
    return await response.json();
  } catch (error) {
    console.error("OMDb details error:", error);
    return {};
  }
}

export async function getTrendingMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDb error:", error);
    return [];
  }
}
