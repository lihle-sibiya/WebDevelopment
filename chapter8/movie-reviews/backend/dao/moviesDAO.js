let movies
export default class MoviesDAO {
    static async injectDB(conn) {
        if (movies) {//if moviews reference exists
            return
        }
        try {//if datatabase exists: return movies data
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies');
                console.log('Connected to MoviesDAO')
        }
        catch (e) {//error handling if movies reference does not exist
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }


    static async getMovies({
        filters = null, //default filter has no filters: movie rating “rated” (e.g. ‘G’, ‘PG,’ ‘R’).
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query 
        if (filters) {//filters object
            if ("title" in filters) {//check if title filter
                query = { $text: { $search: filters['title'] } }//query variable will be empty unless user specifies filter
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } }
            }
        }

        let cursor //all movies found in query: assign to cursor to reduce bandwith and memory consumption
        try {
            cursor = await movies
                .find(query)

                .limit(moviesPerPage)//limit method: cap nunber of movies returned(documents)
                .skip(moviesPerPage * page)//help get specific page result in fornt end: eg page 1
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)//gets total number of movies
            return { moviesList, totalNumMovies }//return moviesList and total num of movies into object
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }//if error: retunr empty movies and 0 numbers
        }
    }

}
