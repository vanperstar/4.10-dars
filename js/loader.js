const API_KEY = "6c47ad6a"
const ITEMS_PER_PAGE = 10;
var currentPage = 1;

function getMovies(searchString, type = "movie", page = 1) {
    renderLoader()
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchString}&type=${type}&page=${page}`)
                .then(response => response.json())
                .then(result => resolve(result))
                .catch(err => reject(err))
        }, 1000)
    })
}


// getMovies("Fast", 12).then((result) => {
//     console.log(result);
// })


var moviesRow = document.querySelector(".movies")
var searchForm = document.querySelector(".search-form")
var searchTypeSelect = document.querySelector(".movie-type-select")
var searchInput = document.querySelector(".search-input")
searchForm.addEventListener('submit', event => {
    event.preventDefault()

    getMovies(searchInput.value, searchTypeSelect.value, currentPage).then(result => {
        renderMovies(result.Search, result.totalResults)
    })
})

getMovies(searchInput.value).then(result => {
    renderMovies(result.Search, result.totalResults)
})



function renderLoader() {
    let loaderTemplate = document.querySelector('#loader')
    moviesRow.innerHTML = null

    let loaderEl = loaderTemplate.content.cloneNode(true)
    moviesRow.appendChild(loaderEl)
}

function renderMovies(movies, totalResults = 0) {
    document.querySelector(".results").textContent = totalResults
    renderPagination(totalResults)
    moviesRow.innerHTML = null;
    if (!movies || movies.length <= 0) {
        moviesRow.innerHTML = "Movies Not Found"
    } else {
        let fragment = new DocumentFragment()
        movies.forEach(movie => {
            fragment.appendChild(createMovieEl(movie))
        });

        moviesRow.appendChild(fragment)
    }

}



function createMovieEl(movie) {
    console.log(movie)
    let movieTemplate = document.querySelector("#movie-item")
    let movieEl = movieTemplate.content.cloneNode(true)
    let movieImgEl = movieEl.querySelector(".movie-image")
    movieImgEl.src = movie.Poster

    movieImgEl.addEventListener('error', (event) => {
        event.target.src = "http://picsum.photos/200/200"
    })

    movieEl.querySelector(".movie-title").textContent = movie.Title
    movieEl.querySelector(".movie-description").textContent = movie.Year
    return movieEl
}


// Render pagination

function renderPagination(totalResults) {
    let paginationContainer = document.querySelector(".pagination")
    paginationContainer.innerHTML = null;

    let templatePageItem = document.querySelector("#pagination-item")
    let paginationFragment = new DocumentFragment()
    for (let i = 1; i <= Math.ceil(totalResults / ITEMS_PER_PAGE); i++) {
        let pageEl = templatePageItem.content.cloneNode(true)
        let pageItemEl = pageEl.querySelector(".page-item")
        let pageLinkEl = pageEl.querySelector('.page-link')

        if (currentPage == i) pageItemEl.classList.add("active")
        pageLinkEl.dataset.pageId = i;
        pageLinkEl.dataset.task = 'pagination-item';
        pageLinkEl.textContent = i;

        paginationFragment.appendChild(pageEl)
    }

    paginationContainer.appendChild(paginationFragment)
}


document.body.addEventListener('click', (event) => {
    if (event.target.dataset.task == 'pagination-item') {
        currentPage = event.target.dataset.pageId
        getMovies(searchInput.value, searchTypeSelect.value, currentPage).then(result => {
            renderMovies(result.Search, result.totalResults)
        })
    }
})