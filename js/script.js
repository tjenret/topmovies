// Add all index page funcyionality in this object
indexPg = {
  searchbox: document.querySelector(".search-box"),
  cards: document.querySelector(".cards"),
  sortOptions: document.querySelectorAll(".sort-opt"),
  sortDropdown: document.querySelector(".sort-dropdown"),
  loadEvents: () => {
    indexPg.searchbox.addEventListener("input", function () {
      indexPg.searchMovies(this.value)
    })

    indexPg.sortOptions.forEach(option => {
      option.addEventListener("click", function() {
        localStorage.setItem("sort", this.value)
        indexPg.sortMovies()
        indexPg.loadMovies(movies)
      })
    })

    indexPg.sortDropdown.addEventListener("change", function() {
      localStorage.setItem("sort", this.value)
        indexPg.sortMovies()
        indexPg.loadMovies(movies)
    })
  },

  addMovieCard: (movie) => {
    elem = document.createElement("div")
    elem.classList.add("card")
    elem.innerHTML = `<div class="rank">${movie.rank}</div>
      <img class="poster" src="${movie.image}" alt="${movie.title} Poster"/>
      <div class="overlay"></div>
      <div class="metadata">
        <div class="title">${movie.title}</div>
        <div class="year">${movie.year}</div>
        <div class="crew">${movie.crew}</div>
      </div>`

    indexPg.cards.appendChild(elem)
  },
  loadMovies: (movielist) => {
    indexPg.cards.innerHTML = ""
    for (i in movielist) {
      indexPg.addMovieCard(movielist[i])
    }
  },

  sortMovies: () => {
    sort = localStorage.getItem("sort")

    if (!sort ){
      localStorage.setItem("sort", "rank_asc")
      sort = "rank_asc"
    }

    indexPg.sortDropdown.querySelector(`option[value="${sort}"]`).selected = true
    document.querySelector(`.sorting-radio input[value="${sort}"]`).checked = true

    switch (sort) {
      case "rank_asc":
        movies.sort((a, b) => a.rank > b.rank)
        break
      case "rank_desc":
        movies.sort((a, b) => a.rank < b.rank)
        break
        case "year_asc":
          movies.sort((a, b) => a.year > b.year)
          break
        case "year_desc":
          movies.sort((a, b) => a.year < b.year)
          break
      case "title_atoz":
        movies.sort((a, b) => a.title > b.title)
        break
      case "title_ztoa":
        movies.sort((a, b) => a.title < b.title)
        break
      default:
        movies.sort((a, b) => a.rank > b.rank)
        break
    }
  },

  searchMovies: (data) => {

    results = movies.filter((movie) => movie.title.toLowerCase().includes(data.toLowerCase()) ||
      movie.crew.toLowerCase().includes(data.toLowerCase()) || movie.year.toString().toLowerCase().includes(data) || movie.rank == data
    )
    indexPg.loadMovies(results)
  },
}


function main() {
  if (document.body.classList.contains("indexPg")) {
    indexPg.sortMovies()
    indexPg.loadMovies(movies)
    indexPg.loadEvents()
  }
}

(function () {
  main()
})()
