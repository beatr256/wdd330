const TMDB_KEY = "94f4a65fd4625e9e43edc06511f0535d";

export async function searchMovies(query) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${query}`;
    console.log("Searching:", url);
    const response = await fetch(url);
    const data = await response.json();
    console.log("API Response:", data);
    
    return data.results || [];
  } catch (error) {
    console.error("TMDB error:", error);
    return [];
  }
}

export async function getMovieDetails(id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}`);
    return await response.json();
  } catch (error) {
    console.error("TMDB details error:", error);
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
