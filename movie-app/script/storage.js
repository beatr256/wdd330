export function addToFavorites(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

export function showFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesDiv = document.getElementById("favorites");
  if (favorites.length === 0) {
    favoritesDiv.innerHTML = "<p>No favorites yet.</p>";
  } else {
    favoritesDiv.innerHTML = favorites.map(id => `<p>Movie ID: ${id}</p>`).join("");
  }
}
