import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { moviesArr, titlesArr } from "../index.js";

const KEY = "ff27a997";
const main = document.querySelector("main");
const errorEl = `
    <article
      id="start-exploring"
      class="text-center m-auto text-lg text-accent dark:text-accent-dark md:text-xl lg:text-2xl">
      <p class="font-bold">
        Unable to find what you’re looking for.<br> Please try another search.
      </p>
    </article>
    `;

async function fetchMoviesTitles(search, num) {
  // fetch 10 movie titles using the ' ?s= ' query
  const res = await fetch(
    `http://www.omdbapi.com/?s=${search}&apikey=${KEY}&page=${num}`
  );
  const movies = await res.json();
  // push titles into array of titles
  if (movies.Response === "False") {
    main.classList.add("justify-center");
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
    const res = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${KEY}`);
    const movieWithDetails = await res.json();
    // create new movie objects based on the recieved movies to add two
    // properties: a uuid, and a isInWatchlist boolean
    const newMovieObj = new Movie(movieWithDetails);
    // push newly made movie objects to moviesArr
    moviesArr.push(newMovieObj);
  }
  // render movies using moviesArr
  renderMovies(moviesArr);
}

class Movie {
  constructor(data) {
    Object.assign(this, data);
    // add two proprties to each movie
    this.uuid = uuidv4();
    this.isInWatchlist = false;
  }
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
        uuid,
      } = movie;

      return `
      <section
      class="flex h-[212px] items-center gap-6 border-b border-[#E5E7EB] py-8 text-subtitles dark:border-[#2C2C2C] dark:text-white px-2 sm:px-4 sm:h-[234px] md:h-[254px] lg:h-[274px]"
      >
      <img
        class="h-full w-[105px] rounded object-cover sm:w-[125px] md:w-[145px] lg:w-[160px]"
        src="${poster}"
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
            data-uuid="${uuid}"
            class="flex cursor-default items-center gap-[6px] text-sm md:cursor-pointer"
          >
            <i class="fa-solid fa-circle-${btn} text-lg"></i>
            Watchlist
          </button>
        </article>
        <!-- Description -->
        <p class="max-w-[400px] text-sm text-desc dark:text-desc-dark">
          ${plot}
        </p>
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

export { fetchMoviesTitles, getMoviesHtml };
