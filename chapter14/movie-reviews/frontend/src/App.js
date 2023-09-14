// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import React from 'react';
// eslint-disable-next-line
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import AddReview from "./components/add-review";
// eslint-disable-next-line
import MoviesList from "./components/movies-list";
// eslint-disable-next-line
import Movie from "./components/movie";
// eslint-disable-next-line
import Login from "./components/login";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function App() {
  const [user, setUser] = React.useState(null);//Hook that lets us add some local state to functional components

  // eslint-disable-next-line
  async function login(user = null) {// default user to null
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>{/*route to movies component*/}
            </Nav.Link>
            <Nav.Link>{/*if logged in show logout: or show log in if not*/}
              {user ? (<button onClick={logout}>Logout User</button>) : (<Link to={"/login"}>Login</Link>)}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
