import MoviesDAO from '../dao/moviesDAO.js';

export default class MoviesController {
    static async apiGetMovies(req, res, next) {//query string with key-value pairs: eg:title:"dragon"
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20; //if moviesPerPage exists,parse into integer
        const page = req.query.page ? parseInt(req.query.page) : 0; //parse into integer

        let filters = {}; //no filters are applied at first
        if (req.query.rated) {//check if the rated query string exists
            filters.rated = req.query.rated;//add to the filters object
        }
        else if (req.query.title) {//check if the title query string exists
            filters.title = req.query.title;//add to the filters object
        }

        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({ filters, page, moviesPerPage })//call getMovies in MoviesDAO
        let response = {//jason response object to a user whoc calls the URL
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };
        res.json(response);
    }

    static async apiGetMovieById(req, res, next) {//apiGetMovieById
        try {
            let id = req.params.id || {};//for an id parameter in URL eg: localhost:5000/api/v1/movies/id/12345
            let movie = await MoviesDAO.getMovieById(id);//return specific movie in JSON
            if (!movie) {//if no movie
                res.status(404).json({ error: "not found" })//return erro
                return;
            }
            res.json(movie);
        }
        catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }


    static async apiGetRatings(req, res, next) {//apiGetRatings
        try {
            let propertyTypes = await MoviesDAO.getRatings();//call MoviesDAO
            res.json(propertyTypes)
        }
        catch (e) {
            console.log(`api,${e}`);
            res.status(500).json({ error: e });
        }
    }
}
