import axios from 'axios'

export default axios.create({
    baseURL: "https://service-film.herokuapp.com"
})