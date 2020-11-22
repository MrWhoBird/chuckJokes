const collapseOne = document.querySelector('#collapseOne')
const srchBtn = document.querySelector('.srchBtn')
const favoriteBtn = document.querySelector('.favoriteBtn')
const favoriteJokesPlaceholder = document.querySelector('.favoriteJokesPlaceholder')
let favoriteJokesArr = [];
//random joke data
const randomJokeForm = document.querySelector('.randomJokeForm')
//category select data
const categorySelectForm = document.querySelector('.categorySelectForm')
//searchCategoryForm
const searchCategoryForm = document.querySelector('.searchCategoryForm')
const searchCategoryInput = document.querySelector('.searchCategoryInput')
//jokes placeholder
const jokePlaceholder = document.querySelector('.jokePlaceholder')
//import chuck class
const chuck = new Chuck()
const ui = new Ui()

randomJokeForm.addEventListener('submit', e => {
    e.preventDefault()
    chuck.getRandomJoke()
        .then(data => {
            jokePlaceholder.innerText = data.value
        })
        .catch(err => jokePlaceholder.innerText = err + ' Connection error. Check your connection or try again later.')
})

categorySelectForm.addEventListener('submit', e => {
    e.preventDefault()
    const queryValue = categorySelectForm.categoryName.value
    chuck.getSelectedCategory(queryValue)
        .then(data => {
            jokePlaceholder.innerText = data.value

        })
        .catch(err => jokePlaceholder.innerText = err + ' Connection error. Check your connection or try again later.')
    if(collapseOne.classList.contains('show')){
        srchBtn.click()
    }
})

searchCategoryForm.addEventListener('submit', e => {
    e.preventDefault()
    const queryValue = searchCategoryInput.value
    chuck.getInput(queryValue)
        .then(data => {
            data.result.forEach(el => {
                jokePlaceholder.innerText = el.value
                console.log(el)
            })
        })
        .catch(err => jokePlaceholder.innerText = err + ' Connection error. Check your connection or try again later.')
})

favoriteBtn.addEventListener('click', e => {
    e.preventDefault()
    ui.addFavoriteJoke(jokePlaceholder.innerText);
})

ui.getFromLocalStorage();