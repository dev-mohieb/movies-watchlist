import { fetchMoviesTitles } from "/src/js/utils.js";
const searchForm = document.querySelector("#search-form");
const moviesArr = [];
const titlesArr = [];
const watchlist = [];
let page = 1;

function handleWatchlist(uuid) {
  const selectedMovie = moviesArr.filter((movie) => {
    return movie.uuid === uuid;
  })[0];
  // Check wether the movie's already in the watchlist
  !watchlist.includes(selectedMovie) ? watchlist.unshift(selectedMovie) : "";
  // Add the new watchlist to localStorage
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

document.addEventListener("click", (e) => {
  if (e.target.dataset.uuid) {
    handleWatchlist(e.target.dataset.uuid);
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // clear both moviesArr and titlesArr
  moviesArr.length = 0;
  titlesArr.length = 0;
  // get searched input
  const formData = new FormData(searchForm);
  const searchItem = formData.get("search").trim();
  // fetch titles using searched input
  fetchMoviesTitles(searchItem, page);
});

export { moviesArr, titlesArr };
