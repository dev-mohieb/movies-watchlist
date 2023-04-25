import { getMoviesHtml, handleToggle, darkMode, lightMode } from "./utils.js";

const toggleBtn = document.querySelector("#toggle");
const main = document.querySelector("main");
let moviesArr = JSON.parse(localStorage.getItem("watchlist"))
  ? JSON.parse(localStorage.getItem("watchlist"))
  : [];

const explore = `
    <article
    class="m-auto text-center text-lg text-accent dark:text-accent-dark md:text-xl lg:text-2xl">
    <p class="font-bold">Your watchlist is looking a little empty...</p>
    <a href="index.html" class="font-bold text-[#363636] dark:text-white">
      <i
        class="fa-solid fa-circle-plus mb-3 text-xl dark:text-[#787878]"></i>
      Let’s add some movies!
    </a>
    </article>
    `;

// Check watchlisted movies and light mode
checkMoviesNum(moviesArr);
localStorage.getItem("mode") === "dark" ? darkMode() : lightMode();

// Listen for clicks on toggleBtn and call handleToggle
toggleBtn.addEventListener("click", handleToggle);

// Listen for Remove btn events
document.addEventListener("click", (e) => {
  if (e.target.dataset.imdbId) {
    handleRemoveBtn(e.target.dataset.imdbId);
    checkMoviesNum(moviesArr);
  }
});

function handleRemoveBtn(imdbId) {
  // Use .filter method on moviesArr to create
  // a new array that contains the result of the method
  const newMoviesArr = moviesArr.filter((movie) => {
    return movie.imdbID !== imdbId;
  });
  // Set the new array to local storage and update moviesArr
  // with the data from local storage
  localStorage.setItem("watchlist", JSON.stringify(newMoviesArr));
  moviesArr = JSON.parse(localStorage.getItem("watchlist"));
}

function checkMoviesNum(arr) {
  if (arr.length === 0){
    main.classList.add('h-[75vh]')
    main.innerHTML = explore;
  } else {
    main.classList.remove('h-[75vh]')
    renderMovieCards(arr);
  }
}

function renderMovieCards(arr) {
  main.innerHTML = getMoviesHtml(arr, "minus");
}
