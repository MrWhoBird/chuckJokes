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
})

searchCategoryForm.addEventListener('submit', e => {
    e.preventDefault()
    const queryValue = searchCategoryInput.value
    chuck.getInput(queryValue)
        .then(data => {
            data.result.forEach(el => {
                jokePlaceholder.innerText += el.value
            })
        })
        .catch(err => jokePlaceholder.innerText = err + ' Connection error. Check your connection or try again later.')
})