class Chuck {
    constructor(){
        this.url = 'https://api.chucknorris.io/jokes/random'
        this.search = 'https://api.chucknorris.io/jokes/search'
    }
    async getRandomJoke(){
        const response = await fetch(this.url)
        const data = await response.json()
        return data
    }
    async getSelectedCategory(category){
        const query = `?category=${category}`
        const response = await fetch(this.url + query)
        const data = await response.json()
        return data
    }
    async getInput(input){
        const query = `?query=${input}`
        const response = await fetch(this.search + query)
        const data = await response.json()
        return data
    }
}