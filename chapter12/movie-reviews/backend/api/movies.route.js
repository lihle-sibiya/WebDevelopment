import express from 'express'
import MoviesController from './movies.controller.js'
import ReviewsController from './reviews.controller.js'


const router = express.Router() // get access to express router
router.route('/').get(MoviesController.apiGetMovies)//moviesContorller called
router.route("/id/:id").get(MoviesController.apiGetMovieById)//retrieves a specific movie and all reviews associated for that movie
router.route("/ratings").get(MoviesController.apiGetRatings)//returns us a list of movie ratings (e.g. ‘G’, ‘PG’, ‘R’)


router
    .route("/review")//route revies handles post, put and delete
    .post(ReviewsController.apiPostReview)//post request:call apiPostReview
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)


export default router