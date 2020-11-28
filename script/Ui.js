class Ui {
    constructor() {
        this.favoriteJokesArr = [];
    }
    
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
        }
    }

    renderJokes = arr => {
        favoriteJokesPlaceholder.innerHTML = ''
        arr.forEach(el => {
            const template = `
            <div class="container">
            <li data-key="${el.id}" class="list-group-item">
            <div class="favJokeLi">${el.content}</div>
            <button type="button" class="btn btn-outline-danger deleteBtn">Delete</button>
            </li>
            </div>
            `
            favoriteJokesPlaceholder.innerHTML += template
        });
    }

    getFromLocalStorage = () => {
        const reference = localStorage.getItem('favJokes');
        if (reference) {
            this.favoriteJokesArr = JSON.parse(reference);
            this.renderJokes(this.favoriteJokesArr);
        }
    }
}