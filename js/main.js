


const films = []

var moviesRow = document.querySelector(".movies")
var searchForm = document.querySelector(".search-form")
var searchTypeSelect = document.querySelector(".movie-type-select")
var searchInput = document.querySelector(".search-input")
searchForm.addEventListener('submit', event => {
    event.preventDefault()

    getMovies(searchInput.value, searchTypeSelect.value, currentPage).then(result => {
        // films.push(result.Search)
        renderMovies(result.Search, result.totalResults)
    })
})


getMovies(searchInput.value).then(result => {
    renderMovies(result.Search, result.totalResults)
})


function renderLoader() {
    let loaderTemplete = document.querySelector("#loader")
    moviesRow.innerHTML = null

    let loaderEL = loaderTemplete.content.cloneNode(true)
    moviesRow.appendChild(loaderEL)
}


function renderMovies(movies, totalResults = 0) {
    document.querySelector(".results").textContent = totalResults
    renderPagination(totalResults);
    moviesRow.innerHTML = null
    if(!movies || movies.length <= 0) {
        moviesRow.innerHTML = "Movies not found"
        moviesRow.classList.add("text-white")
    } else{
        let fragment = new DocumentFragment()
        movies.forEach(movie => {
            fragment.appendChild(createMovieEl(movie))
        });
    
        moviesRow.appendChild(fragment)
    }
}

function createMovieEl(movie) {
    let movieTemplate = document.querySelector("#movie-item")
    let movieEl = movieTemplate.content.cloneNode(true)

    movieEl.querySelector(".movie-title").textContent = movie.Title
    movieEl.querySelector(".movie-description").textContent = movie.Year
    // movieEl.querySelector(".movie-img").src = movie.Poster
    let imgPosterEL =  movieEl.querySelector(".movie-img")
    imgPosterEL.src = movie.Poster
    imgPosterEL.addEventListener('error', () => {
            imgPosterEL.src = 'http://picsum.photos/200/200';
        })
    // movieEl.querySelector(".movie-type").textContent = movie.Type
    let moreInfoEL = movieEl.querySelector(".more-info")
    moreInfoEL.dataset.moreId = movie.imdbID
    moreInfoEL.dataset.task = "more-info"
    return movieEl 
}


function creatModal(movie) {
    let modalTemplete = document.querySelector("#modal-templet")
    let modalEL = modalTemplete.content.cloneNode(true)
    let imageEl = modalEL.querySelector("modal-img")
    imageEl.src = movie.Poster
    modalEL.querySelector("modal-title").textContent = movie.Title
    modalEL.querySelector("modal-description").textContent = movie.Year
    modalEL.querySelector("modal-type").textContent = movie.Type
    let closeEL = modalEL.querySelector(".modal-close")
    closeEL.dataset.closeId = movie.imdbID
    closeEL.dataset.task = "delete"
    return modalEL
}

document.body.addEventListener("click", (event) => {
    let clicked = event.target
    if(clicked.dataset.task === "more-info"){
        let todoId = clicked.dataset.moreId
        let todo = films.find((todo) =>{
            todo.imdbID == todoId
        })
        let content = creatModal(todo)
        let modal = renderModal(content);
        document.appendChild(modal)
    }

    if(clicked.dataset.task = "delete") {
        let modalEL = document.querySelector(".modal");
        modalEL.classList.remove("my-modal--active")
    }
})


