const API_KEY = "6c47ad6a"

function getMovies(searchString, type = "movie", currentPage = 1) {
    renderLoader()
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchString}&type=${type}&page=${currentPage}`)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(err => reject(err))
        }, 1000)
    })
}



// // getMovies("Fast", 12).then((result) => {
// //     console.log(result);
// // })

// var page = 1

// var moviesRow = document.querySelector(".movies")
// var searchFormEl = document.querySelector(".search-form")
// var searchInput = document.querySelector(".search-input")

// searchFormEl.addEventListener('submit', event => {
//     event.preventDefault()
//     getMovies(searchInput.value, page).then(result => {
//         renderMovies(result.Search)
//     })
// })

// getMovies(searchInput.value).then(result => {
//     renderMovies(result.Search)
// })

// function renderMovies(movies) {
//     moviesRow.innerHTML = null
//     let fragment = new DocumentFragment()
//     movies.forEach(movie => {
//         fragment.appendChild(creatMvieEl(movie))
//     });
//     moviesRow.appendChild(fragment)
// }

// function creatMvieEl(){
//     let movieTemplate = document.querySelector("#movie-item")
//     let movieEl = movieTemplate.content.cloneNode(true)

//     movieEl.querySelector(".movie-title").textContent = movie.Title
//     movieEl.querySelector(".movie-description").textContent = movie.Year

//     return movieEl
// }