import React, { useState } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';



const AddReview = props => {
    let editing = false;//we are in adding mode. True if editing mode
    let initialReviewState = "";

    //check if a state is passed into AddReview and contains a currentReview property
    if (props.location.state && props.location.state.currentReview) {
        editing = true;//if so: editing true
        initialReviewState = props.location.state.currentReview.review;//and initialReviewState to currentReview’s review
    }

    const [review, setReview] = useState(initialReviewState);
    // keeps track if review is submitted
    const [submitted, setSubmitted] = useState(false);

    const onChangeReview = e => {
        const review = e.target.value;//keeps track - review value by user
        setReview(review);
    };

    const saveReview = () => {
        var data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id, movie_id: props.match.params.id // get movie id direct from url
        };

        if (editing) {//if editing is true
            //we get existing review id
            data.review_id = props.location.state.currentReview._id
            MovieDataService.updateReview(data)//and cll updateReview in MovieDataService
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            MovieDataService.createReview(data)
                .then(response => {
                    setSubmitted(true);
                })
                .catch(e => {
                    console.log(e);
                });
        };
    };

        return (
            <div>
                {submitted ? (
                    <div>
                        <h4>Review submitted successfully</h4>
                        <Link to={"/movies/" + props.match.params.id}>
                            Back to Movie
                        </Link>
                    </div>
                ) : (
                    <Form>
                        <Form.Group>
                            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={review}
                                onChange={onChangeReview}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={saveReview}>
                            Submit
                        </Button>
                    </Form>
                )}
            </div>
        );
    };

    export default AddReview;