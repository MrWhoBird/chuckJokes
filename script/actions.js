const collapseOne = document.querySelector('#collapseOne')
const srchBtn = document.querySelector('.srchBtn')
const favoriteBtn = document.querySelector('.favoriteBtn')
const favoriteJokesPlaceholder = document.querySelector('.favoriteJokesPlaceholder')
const randomJokeForm = document.querySelector('.randomJokeForm')
const categorySelectForm = document.querySelector('.categorySelectForm')
const searchCategoryForm = document.querySelector('.searchCategoryForm')
const searchCategoryInput = document.querySelector('.searchCategoryInput')
const jokePlaceholder = document.querySelector('.jokePlaceholder')

//import classes
const chuck = new Chuck()
const ui = new Ui()

//load favorite jokes from local storage
ui.getFromLocalStorage();

//user pick a random joke
randomJokeForm.addEventListener('submit', e => {
    e.preventDefault()
    chuck.getRandomJoke()
        .then(data => {
            jokePlaceholder.innerText = data.value
        })
        .catch(err => jokePlaceholder.innerText = err + ' Connection error. Check your connection or try again later.')
})

//user select category
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

//user input search
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

//add to favorites
favoriteBtn.addEventListener('click', e => {
    e.preventDefault()
    ui.addFavoriteJoke(jokePlaceholder.innerText);
})

const deleteTodo = todo => todo.parentElement.remove()

//delete favorite joke
favoriteJokesPlaceholder.addEventListener('click', e => {
    e.target.classList.contains('deleteBtn') ? deleteTodo(e.target) : true
    const target = e.target.parentElement.getAttribute('data-key')
    console.log(target)
    
    let oldJokesArray = JSON.parse(localStorage.getItem('favJokes'))
    let newJokesArray = oldJokesArray.filter(el => {
        return el.id != target
    })
    localStorage.setItem('favJokes', JSON.stringify(newJokesArray))
})