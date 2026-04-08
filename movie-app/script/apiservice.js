// Handles API calls
export default class ApiService {
  static async getPopularMovies() {
    const apiKey = "94f4a65fd4625e9e43edc06511f0535d";
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    return data.results.slice(0, 5); // return top 5 movies
  }

  static async getQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return `${data.content} — ${data.author}`;
  }
}

