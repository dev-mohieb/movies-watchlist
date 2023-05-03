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
const KEY = "ff27a997";
const main = document.querySelector("main");
const searchBtn = document.querySelector('#search-btn')

async function fetchMoviesTitles(search, num) {
  main.innerHTML = loading
  main.classList.add('h-[75vh]')
  // fetch 10 movie titles using the ' ?s= ' query
  const res = await fetch(
    `https://www.omdbapi.com/?s=${search}&apikey=${KEY}&page=${num}`
  );
  const movies = await res.json();
  // push titles into array of titles
  if (movies.Response === "False") {
    main.innerHTML = errorEl;
    main.classList.add('h-[75vh]')
    searchBtn.disabled = false;
  } else {
    main.innerHTML = ''
    main.classList.remove('h-[75vh]')
    searchBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-lg pointer-events-none"></i>`
    for (let movie of movies.Search) {
      // fetch movie details using the URI version of the titles
      // to avoid any issues while searching
      fetchMoviesDetails(encodeURIComponent(movie.Title));
    }
  }
}

async function fetchMoviesDetails(movieTitle) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"))
        ? JSON.parse(localStorage.getItem("watchlist"))
        : [];

    const res = await fetch(
      `https://www.omdbapi.com/?t=${movieTitle}&apikey=${KEY}`
    );
    const detailedMovie = await res.json();
    if (detailedMovie.Response === 'True'
      && !moviesArr.find(prevMovie => prevMovie.Title === detailedMovie.Title)) {
        const newMovie = new Movie(detailedMovie)
        // use the getHtml method to render each movie as it gets fetched
        main.innerHTML += newMovie.getHtml('plus')

        watchlist.find(prevMovie => prevMovie.Title === newMovie.Title)
        ? addCheckToMovie(newMovie)
        : ''
        moviesArr.push(newMovie)
    }
  enableSearchBtn()
}
function enableSearchBtn() {
  searchBtn.innerHTML = 'Search'
  searchBtn.disabled = false;
}

// add class with getHtml method to render movies immediatly
class Movie{
  constructor(data){
    Object.assign(this, data)
  }
  getHtml(btn) {
    const {
      Title: title,
      Runtime: runtime,
      Genre: genre,
      Plot: plot,
      Poster: poster,
      imdbRating: rating,
      imdbID,
    } = this;
    return `
      <section
      class="flex w-full h-[340px] justify-center items-center gap-3 border-b border-[#E5E7EB] py-3 text-subtitles dark:border-[#2C2C2C] dark:text-white mt-4 pb-8 px-2 sm:px-4 lg:w-1/2"
      >
      <img
        class="h-full w-[90%] aspect-[10/15] max-w-[200px] rounded-md object-cover"
        src="${poster === "N/A" ? "/images/no-image-placeholder.png" : poster}"
        width="200"
        height="295"
        alt=""
      />
      <!-- Movie info -->
      <section class="relative h-full max-w-[400px] w-[90%] overflow-y-auto space-y-1 scrollbar">
        <!-- Rating -->
        <article class="absolute right-0 top-0 flex items-center ml-auto gap-2 mr-2 text-sm">
            <i class="fa-solid fa-star text-star"></i>
            <p class="text-[15px]">${rating}</p>
          </article>
        <!-- Title -->
        <article class="flex items-center text-xs md:text-sm lg:text-base">
          <h2
            class="text-lg font-medium mt-4 text-black dark:text-white md:text-xl lg:text-2xl max-w-[260px]"
          >
            ${title}
          </h2>
        </article>
        <!-- Genre + Add to watchlist -->
        <article class="flex items-center gap-2 text-xs">
          <p class="">${runtime}</p>
          <p class="">${genre}</p>
          <button
            data-imdb-id="${imdbID}"
            class="ml-auto mr-2 flex cursor-default items-center gap-[6px] text-sm md:cursor-pointer px-1 active:scale-95 hover:scale-105 transition-transform disabled:active:scale-100 disabled:hover:scale-100"
          >
            <i class="fa-solid fa-circle-${btn} text-lg pointer-events-none"></i>
          </button>
        </article>
        <!-- Description -->
        <section class="max-w-[400px] h-fit mt-2 text-sm text-desc dark:text-desc-dark">
          <p>
            ${plot}
          </p>
        </section>
      </section>
    </section>
      `
  }
}

// will refactor later - for watchlist only
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
      class="flex w-full h-[340px] justify-center items-center gap-3 border-b border-[#E5E7EB] py-3 text-subtitles dark:border-[#2C2C2C] dark:text-white mt-4 pb-8 px-2 sm:px-4 lg:w-1/2"
      >
      <img
        class="h-full w-[90%] aspect-[10/15] max-w-[200px] rounded-md object-cover"
        src="${poster === "N/A" ? "/images/no-image-placeholder.png" : poster}"
        width="200"
        height="295"
        alt=""
      />
      <!-- Movie info -->
      <section class="relative h-full max-w-[400px] w-[90%] overflow-y-auto space-y-1 scrollbar">
        <!-- Rating -->
        <article class="absolute right-0 top-0 flex items-center ml-auto gap-2 mr-2 text-sm">
            <i class="fa-solid fa-star text-star"></i>
            <p class="text-[15px]">${rating}</p>
          </article>
        <!-- Title -->
        <article class="flex items-center text-xs md:text-sm lg:text-base">
          <h2
            class="text-lg font-medium mt-4 text-black dark:text-white md:text-xl lg:text-2xl max-w-[260px]"
          >
            ${title}
          </h2>
        </article>
        <!-- Genre + Add to watchlist -->
        <article class="flex items-center gap-2 text-xs">
          <p class="">${runtime}</p>
          <p class="">${genre}</p>
          <button
            data-imdb-id="${imdbID}"
            class="ml-auto mr-2 flex cursor-default items-center gap-[6px] text-sm md:cursor-pointer px-1 active:scale-95 hover:scale-105 transition-transform disabled:active:scale-100 disabled:hover:scale-100"
          >
            <i class="fa-solid fa-circle-${btn} text-lg pointer-events-none"></i>
          </button>
        </article>
        <!-- Description -->
        <section class="max-w-[400px] h-fit mt-2 text-sm text-desc dark:text-desc-dark">
          <p>
            ${plot}
          </p>
        </section>
      </section>
    </section>
      `;
    })
    .join("");
}

// add a check icon on the button for movies that are
// already in the watchlist

function addCheckToMovie(movie) {
        const button =  document.querySelector(`button[data-imdb-id=${movie.imdbID}]`)
        const buttonIcon = button.children[0]
          buttonIcon.classList.replace('fa-circle-plus', 'fa-circle-check');
          buttonIcon.style.color = '#24f820';
          button.disabled = true;
}

// Seperate functions for each mode - might refactor in the future
function lightMode() {
  localStorage.setItem("mode", "light");
  document.querySelector("html").classList.remove("dark");
  document.querySelector("#toggle > i").classList.replace("fa-moon", "fa-sun");
}
function darkMode() {
  localStorage.setItem("mode", "dark");
  document.querySelector("html").classList.add("dark");
  document.querySelector("#toggle > i").classList.replace("fa-sun", "fa-moon");
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
  handleToggle,
  darkMode,
  lightMode,
};
