class Ui {
    constructor() {

    }
    addFavoriteJoke = item => {
        if (item) {
            const joke = {
                id: Date.now(),
                content: item,
            };

            favoriteJokesArr.push(joke);

            localStorage.setItem('favJokes', JSON.stringify(favoriteJokesArr))
            let arr = localStorage.getItem('favJokes')

            this.renderTodos(JSON.parse(arr));
        }
    }
    renderTodos = arr => {
        console.log(arr)
        favoriteJokesPlaceholder.innerHTML = '';
        arr.forEach(el => {
            const li = document.createElement('li');
            li.setAttribute('data-key', el.id);
            li.innerHTML = `
            ${el.content}
            <button class="delete-button">X</button>
          `;
            favoriteJokesPlaceholder.append(li);
        });
    }
    getFromLocalStorage = () => {
        const reference = localStorage.getItem('favJokes');
        if (reference) {
            favoriteJokesArr = JSON.parse(reference);
            this.renderTodos(favoriteJokesArr);
        }
    }
}