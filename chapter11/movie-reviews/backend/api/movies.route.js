import express from 'express'
import MoviesController from './movies.controller.js'
import ReviewsController from './reviews.controller.js'

const router = express.Router() // get access to express router
router.route('/').get(MoviesController.apiGetMovies)//moviesContorller called

router
    .route("/review")//route revies handles post, put and delete
    .post(ReviewsController.apiPostReview)//post request:call apiPostReview
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)


export default router