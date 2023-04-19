import {
  fetchMoviesTitles,
  moviesArr,
  titlesArr,
  handleToggle,
  darkMode,
  lightMode,
} from "/js/utils.js";

const toggleBtn = document.querySelector("#toggle");
const searchForm = document.querySelector("#search-form");
const searchBtn = document.querySelector('#search-btn')
// if there's a watchlist array in storage, set it to that,
// otherwise, set it to an empty array so it can update itself
// once a movie gets added to the watchlist
let watchlist = JSON.parse(localStorage.getItem("watchlist"))
  ? JSON.parse(localStorage.getItem("watchlist"))
  : [];

// will later implement search pages
let page = 1;

// Check mode and set it
localStorage.getItem("mode") === "dark" ? darkMode() : lightMode();

// Listen for clicks on toggleBtn and call handleToggle
toggleBtn.addEventListener("click", handleToggle);

searchForm.addEventListener("submit", (e) => {
  searchBtn.disabled = true;
  e.preventDefault();
  // clear both moviesArr and titlesArr
  moviesArr.length = 0;
  titlesArr.length = 0;
  // get searched input
  const formData = new FormData(searchForm);
  const searchItem = formData.get("search").trim();

  // fetch titles using searched input
  fetchMoviesTitles(searchItem, page);
  handleCheckedPreviously();
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.imdbId) {
    handleWatchlist(e.target.dataset.imdbId);
    e.target.children[0].classList.replace('fa-circle-plus', 'fa-circle-check');
    e.target.children[0].style.color = '#24f820';
  }
});

// makes the buttons of previously checked movies
// checked and green
function handleCheckedPreviously() {
  if (watchlist.length > 0) {
    watchlist.forEach(movie => {
      const button = document.querySelector(`button[data-imdb-id=${movie.imdbID}]`)
        button.classList.replace('fa-circle-plus', 'fa-circle-check');
        button.style.color = '#24f820';
    })
  }
}

function handleWatchlist(imdbId) {
  const selectedMovie = moviesArr.filter((movie) => {
    return movie.imdbID === imdbId;
  })[0];
  // Check wether the movie's already in the watchlist
  const alreadyIn = watchlist.filter(movie => {
    return movie.imdbID === selectedMovie.imdbID
  })[0]
  !alreadyIn ? watchlist.unshift(checked) : "";
  // Add the new watchlist to localStorage
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

export { moviesArr, titlesArr };
