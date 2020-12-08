class Ui {
    constructor() {
        this.favoriteJokesArr = [];
    }

    //show / hide 'add to favorite' btn
    toggleFavBtn = () => {
        jokePlaceholder.innerText ? favoriteBtn.classList.remove('d-none') : favoriteBtn.classList.add('d-none')
    }
    //add joke to local storage and call rendering function
    addFavoriteJoke = item => {
        if (item) {
            const joke = {
                id: Date.now(),
                content: item,
            };

            this.favoriteJokesArr.push(joke);

            localStorage.setItem('favJokes', JSON.stringify(this.favoriteJokesArr))
            let arr = localStorage.getItem('favJokes')

            this.renderJokes(JSON.parse(arr));
            //show the modal with hidden btn
            modalBtn.click()
        }
    }
    //render the list
    renderJokes = arr => {
            favoriteJokesPlaceholder.innerHTML = ''
            arr.forEach(el => {
                const template = `
                <div class="container">
                <li data-key="${el.id}" class="list-group-item my-2">
                <div class="favJokeLi">${el.content}</div>
                <button type="button" class="btn btn-outline-danger deleteBtn">Delete</button>
                </li>
                </div>
                `
                favoriteJokesPlaceholder.innerHTML += template
                jokePlaceholder.innerHTML = ''
                this.toggleFavBtn()
            });
    }
    getFromLocalStorage = () => {
        const reference = localStorage.getItem('favJokes');
        if(!reference) {
            const template = '<h1 class="py-4 display-4 text-center">You don\'t have any jokes yet!</h1>'
            favoriteJokesPlaceholder.innerHTML += template
        }else{
            this.favoriteJokesArr = JSON.parse(reference);
            this.renderJokes(this.favoriteJokesArr);
        }
    }
    deleteFavJoke = e => {
        const dataKey = e.target.parentElement.getAttribute('data-key')
    
        const oldJokesArray = JSON.parse(localStorage.getItem('favJokes'))
        const newJokesArray = oldJokesArray.filter(el => {
            return el.id != dataKey
        })
        e.target.parentElement.remove()
        this.favoriteJokesArr = newJokesArray
        localStorage.setItem('favJokes', JSON.stringify(newJokesArray))
    }
}