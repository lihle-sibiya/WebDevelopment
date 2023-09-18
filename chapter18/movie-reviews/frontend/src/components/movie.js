import React, { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'
import { Card, Container, Media, Button, Row, Col, Image } from 'react-bootstrap';





const Movie = props => {

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    const getMovie = id => {
        MovieDataService.get(id)//this calls the API route to view movie by ID
            .then(response => {
                setMovie(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {//getMoive will be called by useEffect
        getMovie(props.match.params.id)//holds the movie id changes
    }, [props.match.params.id])//so that it is called only once when movie id changes



    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />{/*shows movie poster*/}
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>{/*shows movie details*/}
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {props.user && //if user is lgged in: will get link to add review
                                    <Link to={"/movies/" + props.match.params.id + "/review"}>Add Review</Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Movie;