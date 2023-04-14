const errorEl = `
    <article
      id="start-exploring"
      class="text-center m-auto text-lg text-accent dark:text-accent-dark md:text-xl lg:text-2xl">
      <p class="font-bold">
        Unable to find what you’re looking for.<br> Please try another search.
      </p>
    </article>
    `;
const loading = `
    <article
    class="m-auto text-center text-lg text-accent dark:text-accent-dark md:text-xl lg:text-2xl">
      <i class="fa-solid fa-spinner fa-spin text-6xl md:text-7xl lg:text-8xl"></i>
    </article>
    `;
const moviesArr = [];
const titlesArr = [];
const KEY = "ff27a997";
const main = document.querySelector("main");

async function fetchMoviesTitles(search, num) {
  main.innerHTML = loading;
  // fetch 10 movie titles using the ' ?s= ' query
  const res = await fetch(
    `https://www.omdbapi.com/?s=${search}&apikey=${KEY}&page=${num}`
  );
  const movies = await res.json();
  // push titles into array of titles
  if (movies.Response === "False") {
    main.innerHTML = errorEl;
  } else {
    for (let movie of movies.Search) {
      !titlesArr.includes(movie.Title) ? titlesArr.push(movie.Title) : "";
    }
    // fetch details using titles array
    fetchMoviesDetails(titlesArr);
  }
}

async function fetchMoviesDetails(titles) {
  // loop over each titles and fetch each movie individually using the ' ?t= ' query
  for (let title of titles) {
    const res = await fetch(
      `https://www.omdbapi.com/?t=${title}&apikey=${KEY}`
    );
    const movieWithDetails = await res.json();
    // push newly made movie objects to moviesArr
    moviesArr.push(movieWithDetails);
  }
  // render movies using moviesArr
  renderMovies(moviesArr);
}

function getMoviesHtml(movies, btn) {
  return movies
    .map((movie) => {
      // destructure each movie
      const {
        Title: title,
        Runtime: runtime,
        Genre: genre,
        Plot: plot,
        Poster: poster,
        imdbRating: rating,
        imdbID,
      } = movie;

      return `
      <section
      class="flex h-[212px] items-center gap-3 border-b border-[#E5E7EB] py-8 text-subtitles dark:border-[#2C2C2C] dark:text-white px-2 sm:px-4 sm:h-[234px] md:h-[254px] lg:h-[274px]"
      >
      <img
        class="h-full w-[105px] rounded object-cover sm:w-[125px] md:w-[145px] lg:w-[160px]"
        src="${poster === "N/A" ? "/images/no-image-placeholder.png" : poster}"
        width="100"
        height="212"
        alt=""
      />
      <!-- Movie info -->
      <section class="h-full max-w-[400px] w-full space-y-1 sm:pt-2">
        <!-- Title -->
        <article class="flex items-center text-xs sm:text-sm md:text-base">
          <h2
            class="text-lg font-medium text-black dark:text-white sm:text-xl md:text-2xl"
          >
            ${title}
          </h2>
          <i class="fa-solid fa-star ml-2 text-star"></i>
          <p class="ml-1">${rating}</p>
        </article>
        <!-- Genre + Add to watchlist -->
        <article class="flex items-center gap-3 text-xs sm:gap-5 sm:text-sm">
          <p class="">${runtime}</p>
          <p class="">${genre}</p>
          <button
            data-imdb-id="${imdbID}"
            class="flex cursor-default items-center gap-[6px] text-sm md:cursor-pointer px-1"
          >
            <i class="fa-solid fa-circle-${btn} text-lg pointer-events-none"></i>
          </button>
        </article>
        <!-- Description -->
        <section class="max-w-[400px] text-sm text-desc dark:text-desc-dark overflow-hidden text-ellipsis h-[100px]">
          <p class="">
            ${plot}
          </p>
        </section>
      </section>
    </section>
      `;
    })
    .join("");
}

function renderMovies() {
  // call getMoviesHtml with moviesArr and render it's returned value into main
  main.innerHTML = getMoviesHtml(moviesArr, "plus");
}

// Seperate functions for each mode - might refactor in the future
function lightMode() {
  localStorage.setItem("mode", "light");
  document.querySelector("html").classList.remove("dark");
  document.querySelector("#toggle > i").classList.add("fa-sun");
  document.querySelector("#toggle > i").classList.remove("fa-moon");
}
function darkMode() {
  localStorage.setItem("mode", "dark");
  document.querySelector("html").classList.add("dark");
  document.querySelector("#toggle > i").classList.add("fa-moon");
  document.querySelector("#toggle > i").classList.remove("fa-sun");
}
function handleToggle() {
  document.querySelector("html").classList.contains("dark")
    ? lightMode()
    : darkMode();
}

export {
  fetchMoviesTitles,
  getMoviesHtml,
  moviesArr,
  titlesArr,
  handleToggle,
  darkMode,
  lightMode,
};
