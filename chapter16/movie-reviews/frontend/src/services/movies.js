import axios from "axios"; //library for sending get, post, put and delete request

class MovieDataService { //has functions making API calls to the backend endpoints
    getAll(page = 0) {
        return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`);
    }

    get(id) {
        return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`);
    }

    find(query, by = "title", page = 0) {
        return axios.get(`http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return axios.post("http://localhost:5000/api/v1/movies/review", data);
    }

    updateReview(data) {
        return axios.put("http://localhost:5000/api/v1/movies/review", data);
    }

    deleteReview(id, userId) {
        return axios.delete(
            "http://localhost:5000/api/v1/movies/review",
            { data: { review_id: id, user_id: userId } }
        );
    }

    getRatings() {
        return axios.get("http://localhost:5000/api/v1/movies/ratings");
    }
}

const movieDataService = new MovieDataService();//Warning: Assign instance to a variable before exporting as module default
export default movieDataService;