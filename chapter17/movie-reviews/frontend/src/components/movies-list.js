import React, { useState, useEffect } from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


const MoviesList = props => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, []);//empty array so that useEffect is called only once

    const retrieveMovies = () => {
        MovieDataService.getAll()//returns a promise with the movies retrieved
            .then(response => {
                console.log(response.data);
                setMovies(response.data.movies);//set all movies to movies state variable
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveRatings = () => {
        MovieDataService.getRatings()//gets list of ratings from database
            .then(response => {
                console.log(response.data);
                //start with 'All ratings' if user doesn't specify any ratings
                setRatings(["All Ratings"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChangeSearchTitle = e => {//called when user types into search title field
        const searchTitle = e.target.value;//will take entered value to component state
        setSearchTitle(searchTitle);
    };

    const onChangeSearchRating = e => {//called when user types into search rating field
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    };

    const find = (query, by) => {//gives search value entered by user: title/rated
        MovieDataService.find(query, by)//find() calls backsend API
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const findByTitle = () => {
        find(searchTitle, "title");
    }

    const findByRating = () => {
        if (searchRating === "All Ratings") {
            retrieveMovies();
        }
        else {
            find(searchRating, "rated");
        }
    };


    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle} 
                                    onChange={onChangeSearchTitle} 
                                    />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={findByTitle}>Search</Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select" onChange={onChangeSearchRating} >
                                    {ratings.map(rating => { //ratings drop down
                                        return (
                                            <option value={rating}>{rating}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={findByRating}>Search</Button>
                        </Col>{/*col and row to for search fields*/}
                    </Row>
                </Form>
                <Row>
                    {movies.map((movie) => {
                        return (
                            <Col key={movie._id}>{/*key - Reaact to update list of movies*/}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img src={movie.poster + "/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>Rating: {movie.rated}</Card.Text>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        <Link to={"/movies/" + movie._id}>View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div >
    );


};

export default MoviesList;


