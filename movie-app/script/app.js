import ApiService from "./apiservice.js";
import UI from "./ui.js";

document.getElementById("getMoviesBtn").addEventListener("click", async () => {
  const movies = await ApiService.getPopularMovies();
  UI.displayMovies(movies);
});

document.getElementById("getQuoteBtn").addEventListener("click", async () => {
  const quote = await ApiService.getQuote();
  UI.displayQuote(quote);
});
