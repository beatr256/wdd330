export default class UI {
  static displayMovies(movies) {
    const container = document.getElementById("moviesList");
    container.innerHTML = "";
    movies.forEach(movie => {
      const item = document.createElement("li");
      item.textContent = `${movie.title} (⭐ ${movie.vote_average})`;
      container.appendChild(item);
    });
    container.classList.add("show");
  }

  static displayQuote(quote) {
    const el = document.getElementById("quoteText");
    el.textContent = quote;
    el.classList.add("show");
  }
}
