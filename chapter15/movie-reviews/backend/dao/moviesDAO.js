import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let movies;

export default class MoviesDAO {
    static async injectDB(conn) {
        if (movies) {//if moviews reference exists
            return
        }
        try {//if datatabase exists: return movies data
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies')
        }
        catch (e) {//error handling if movies reference does not exist
            console.error(`unable to connect in MoviesDAO: ${e}`);
        }
    }


    static async getMovies({
        filters = null, //default filter has no filters: movie rating “rated” (e.g. ‘G’, ‘PG,’ ‘R’).
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query;
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
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);//gets total number of movies
            return { moviesList, totalNumMovies }//return moviesList and total num of movies into object
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }//if error: retunr empty movies and 0 numbers
        }
    }

    static async getRatings() {//getRatings
        let ratings = [];
        try {
            ratings = await movies.distinct("rated");//movies.distinct to get all the distinct rated values from the movies collection
            return ratings;//return results in ratings array
        }
        catch (e) {
            console.error(`unable to get ratings, $(e)`);
            return ratings;
        }
    }

    static async getMovieById(id) {//getMovieById
        try {
            return await movies.aggregate([//aggregate to provide a sequence of data aggregation operations
                {
                    $match: {//first operation
                        _id: new ObjectId(id),//look for the movie document that matches the specified id
                    }
                },
                {//$lookup: finds all the reviews with the specific movie id and returns the specific movie together with the
                    //reviews in an array.
                    $lookup://$lookup operator to perform an equality join
                    {
                        from: 'reviews',
                        localField: '_id',//using _id field from the movie document
                        foreignField: 'movie_id',//using movie_id field from reviews collection
                        as: 'reviews',
                    }
                }
            ]).next()
        }
        catch (e) {
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }

}
