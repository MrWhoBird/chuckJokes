const categorySelectForm = document.querySelector('.categorySelectForm')
const searchCategoryForm = document.querySelector('.searchCategoryForm')
const searchCategoryInput = document.querySelector('.searchCategoryInput')
const collapseOne = document.querySelector('#collapseOne')
const srchBtn = document.querySelector('.srchBtn')
const favoriteBtn = document.querySelector('.favoriteBtn')
const favoriteJokesPlaceholder = document.querySelector('.favoriteJokesPlaceholder')
const randomJokeForm = document.querySelector('.randomJokeForm')
const jokePlaceholder = document.querySelector('.jokePlaceholder')
const modalBtn = document.querySelector('.modalBtn')

//import classes
const chuck = new Chuck()
const ui = new Ui()

//load favorite jokes from local storage at the page load
ui.getFromLocalStorage();

//user pick a random joke
randomJokeForm.addEventListener('submit', e => {
    e.preventDefault()
    chuck.getRandomJoke()
        .then(data => {
            jokePlaceholder.innerText = data.value
            //show the button
            ui.toggleFavBtn()
        })
        .catch( () => alert('Connection error. Check your connection or try again later.'))
})

//user select category
categorySelectForm.addEventListener('submit', e => {
    e.preventDefault()
    const queryValue = categorySelectForm.categoryName.value
    chuck.getSelectedCategory(queryValue)
        .then(data => {
            data.value === undefined ? alert('Data error. Check your input.') : jokePlaceholder.innerText = data.value
            //show the button
            ui.toggleFavBtn()
        })
        .catch( () => alert('Connection error. Check your connection or try again later.'))
    collapseOne.classList.contains('show') ? srchBtn.click() : true
})

//user input search
searchCategoryForm.addEventListener('submit', e => {
    e.preventDefault()
    const queryValue = searchCategoryInput.value
    chuck.getInput(queryValue)
        .then(data => {
            data.result.length === 0 ? alert('No results! Try with another input') : true
            data.result.forEach(el => {
                jokePlaceholder.innerText = el.value
                //show the button
                ui.toggleFavBtn()
            })
        })
        .catch( () => alert('Try with another input or check your connection'))
})

//add a jokes to favorites
favoriteBtn.addEventListener('click', e => {
    e.preventDefault()
    ui.addFavoriteJoke(jokePlaceholder.innerText)
})

//delete selected joke
favoriteJokesPlaceholder.addEventListener('click', e => {
    e.target.classList.contains('deleteBtn') ? ui.deleteFavJoke(e) : true
})