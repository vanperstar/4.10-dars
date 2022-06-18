
const ITEMS_PER_PAGE = 12;
var currentPage = 1;



function renderModal(modal) {
    let contenEL = document.querySelector(".modal")    
    let contenModalEL = document.querySelector(".modal-content")
    contenModalEL.innerHTML = null
    contenModalEL.appendChild(modal);
    contenEL.classList.add("my-modal-active")
    return contenEL    
}


// Render Pagination 

// function renderPagination(totalResults) {
//     let paginationContainer = document.querySelector(".pagination")
//     paginationContainer.innerHTML = null

//     let templatePageItem = document.querySelector("#pagination-item")
//     let paginationFragment = new DocumentFragment()
//     for(let i = 1; i <= Math.ceil(totalResults / ITEMS_PER_PAGE); i++){
//         let pageEl = templatePageItem.content.cloneNode(true)
//         let pageItemEl = pageEl.querySelector(".page-item")
//         let pageLinkEl = pageEl.querySelector('.page-link')

//         if (currentPage == i) pageItemEl.classList.add("active")
//         pageLinkEl.dataset.pageId = i;
//         pageLinkEl.dataset.task = 'pagination-item';
//         pageLinkEl.textContent = i;


//         paginationFragment.appendChild(pageEl)
//     }

//     paginationContainer.appendChild(paginationFragment)
// }

// document.body.addEventListener("click", (event) => {
//     if(event.target.dataset.task = 'pagination-item'){
//         currentPage = event.target.dataset.pageId
//         getMovies(searchInput.value, searchTypeSelect.value, currentPage).then(result => {
//             films.push(result.Search)
//             renderMovies(result.Search, result.totalResults)
//         })
//     }
// })

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