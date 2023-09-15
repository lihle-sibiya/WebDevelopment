// import React from 'react';

// function Movie() {
//     return (
//         <div className="App">
//             Movie
//         </div>
//     );
// }

// export default Movie;

import React, { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'
import {Card, Container, Media, Button, Row, Col, Image }from 'react-bootstrap';





const Movie = props => {

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    const getMovie = id => {
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getMovie(props.match.params.id)
    }, [props.match.params.id])

    const deleteReview = (reviewId, index) => {// need index of the review from the reviews array
        MovieDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1)
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {props.user &&
                                    <Link to={"/movies/" + props.match.params.id + "/review"}>Add Review</Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        <br></br>
                        {movie.reviews.map((review, index) => {
                            return (
                                <Media key={index}>
                                    <Media.Body>
                                        <h5>{review.name + " reviewed on " + review.date}</h5>
                                        <p>
                                            {review.review}
                                        </p>
                                        {props.user && props.user.id === review.user_id &&
                                            <Row>
                                                <Col><Link to={{
                                                    pathname: "/movies/" + props.match.params.id + "/review",
                                                    state: {
                                                        currentReview: review
                                                    }
                                                }}>Edit</Link></Col>
                                                <Col><Button variant="link" onClick={() => deleteReview(review._id, index)}>Delete</Button></Col>
                                            </Row>
                                        }
                                    </Media.Body>
                                </Media>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Movie;