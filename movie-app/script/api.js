const TMDB_KEY = "94f4a65fd4625e9e43edc06511f0535d";
const TVMAZE_KEY = "UsRV0BgXzo-_aeDVcZvvTjP3PkHShQ_8";

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

export async function getMovieTrailers(id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_KEY}`);
    const data = await response.json();
    const trailer = data.results?.find(video => video.type === "Trailer" && video.site === "YouTube");
    return trailer || null;
  } catch (error) {
    console.error("Trailer error:", error);
    return null;
  }
}

// TVMaze API Functions (Free API)
export async function searchMoviesTVMaze(query) {
  try {
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Format TVMaze results to match TMDB structure
    return data.map(item => ({
      id: item.show.id,
      title: item.show.name,
      poster_path: item.show.image?.medium || null,
      backdrop_path: item.show.image?.original || null,
      overview: item.show.summary?.replace(/<[^>]*>/g, '') || 'No description',
      vote_average: item.show.rating?.average || 0,
      release_date: item.show.premiered || 'N/A',
      tvmaze_id: item.show.id
    })) || [];
  } catch (error) {
    console.error("TVMaze search error:", error);
    return [];
  }
}

export async function getTrendingMoviesTVMaze() {
  try {
    const url = `https://api.tvmaze.com/shows?page=0`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Format TVMaze results and sort by rating
    return data.slice(0, 20).map(show => ({
      id: show.id,
      title: show.name,
      poster_path: show.image?.medium || null,
      backdrop_path: show.image?.original || null,
      overview: show.summary?.replace(/<[^>]*>/g, '') || 'No description',
      vote_average: show.rating?.average || 0,
      release_date: show.premiered || 'N/A',
      tvmaze_id: show.id
    })).sort((a, b) => b.vote_average - a.vote_average) || [];
  } catch (error) {
    console.error("TVMaze trending error:", error);
    return [];
  }
}

export async function getMovieDetailsTVMaze(id) {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`);
    const show = await response.json();
    
    return {
      id: show.id,
      title: show.name,
      poster_path: show.image?.medium || null,
      backdrop_path: show.image?.original || null,
      overview: show.summary?.replace(/<[^>]*>/g, '') || 'No description',
      vote_average: show.rating?.average || 0,
      release_date: show.premiered || 'N/A',
      runtime: show.runtime || 0,
      genres: show.genres || [],
      tvmaze_id: show.id,
      network: show.network?.name || 'N/A'
    };
  } catch (error) {
    console.error("TVMaze details error:", error);
    return {};
  }
}
