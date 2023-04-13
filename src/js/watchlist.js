const main = document.querySelector("main");
let moviesArr = JSON.parse(localStorage.getItem("watchlist"))
  ? JSON.parse(localStorage.getItem("watchlist"))
  : [];

const explore = `
    <article
    class="text-center text-lg text-accent m-auto dark:text-accent-dark md:text-xl lg:text-2xl">
    <p class="font-bold">Your watchlist is looking a little empty...</p>
    <a href="index.html" class="font-bold text-[#363636] dark:text-white">
      <i
        class="fa-solid fa-circle-plus mb-3 text-xl dark:text-[#787878]"></i>
      Let’s add some movies!
    </a>
    </article>
    `;

checkMoviesNum(moviesArr);

function checkMoviesNum(arr) {
  if (arr.length === 0) {
    main.classList.add("h-screen");
    main.innerHTML = explore;
  } else {
    main.classList.remove("h-screen");
    renderMovieCards(arr);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.dataset.uuid) {
    handleRemoveBtn(e.target.dataset.uuid);
  }
});

function handleRemoveBtn(uuid) {
  const newMoviesArr = moviesArr.filter((movie) => {
    return movie.uuid !== uuid;
  });

  localStorage.setItem("watchlist", JSON.stringify(newMoviesArr));
  moviesArr = JSON.parse(localStorage.getItem("watchlist"));
  checkMoviesNum(moviesArr);
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
              Remove
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

function renderMovieCards(arr) {
  main.innerHTML = getMoviesHtml(arr, "minus");
}
