import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {//injectDB function
        if (reviews) {
            return
        }
        try {
            reviews = await
                conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')//access database reviews
        }
        catch (e) {
            console.error(`unable to establish connection handle in
reviewDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review, date) {//creating a review
        try {
            const reviewDoc = {//create a reviewDoc document object
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId)//convert movieId string to a MongoDB object id
            }
            return await reviews.insertOne(reviewDoc)
        }
        catch (e) {
            console.error(`unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, review, date) {//editing a review
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },//filter for an existing review created by userId and with reviewId
                { $set: { review: review, date: date } }//if review exits: filter with new review text and date
            )
            return updateResponse
        }
        catch (e) {
            console.error(`unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {//deleting a review:
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),//specify ObjectId(reviewId)
                user_id: userId, //to check reviewId and created by userId 
            })
            return deleteResponse//and delete it if it exists
        }
        catch (e) {
            console.error(`unable to delete review: ${e}`)
            return { error: e }
        }
    }

}