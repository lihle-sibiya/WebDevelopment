import MoviesDAO from '../dao/moviesDAO.js'

export default class MoviesController {
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ?//query string with key-value pairs: eg:title:"dragon"
            parseInt(req.query.moviesPerPage) : 20 //if moviesPerPage exists,parse into integer
        const page = req.query.page ? parseInt(req.query.page) : 0 //parse into integer

        let filters = {} //no filters are applied at first
        if (req.query.rated) {//check if the rated query string exists
            filters.rated = req.query.rated//add to the filters object
        }
        else if (req.query.title) {//check if the title query string exists
            filters.title = req.query.title//add to the filters object
        }

        const { moviesList, totalNumMovies } = await //
            MoviesDAO.getMovies({ filters, page, moviesPerPage })//call getMovies in MoviesDAO
        let response = {//jason response object to a user whoc calls the URL
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response)
    }
}