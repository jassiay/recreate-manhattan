import React from 'react';
import Home from './Home';
import About from './About';
import Model from './Model';
import Results from './Results';
import Dataset from './Dataset';
import InteractiveModel from './InteractiveModel';
import { BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';


function App() {
  return (
    <Router className="router" basename={`${process.env.PUBLIC_URL}/`}>
    <Container>
      <Navbar collapseOnSelect expand="lg" className="nav-bar-custom">
      <Navbar.Brand className="brand-custom" href="/">Recreate-Manhattan</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavLink className="nav-link" activeClassName="active" to="/dataset">Dataset</NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/model">Model</NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/results">Results</NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>
        </Nav>
      </Navbar.Collapse>
      </Navbar>


      <Switch>
        <Route path="/about" render={(props) => <About {...props} />} />
        <Route path="/dataset" render={(props) => <Dataset {...props} />} />
        <Route path="/model" render={(props) => <Model {...props} />} />
        <Route path="/results" render={(props) => <Results {...props} />} />
        <Route path="/" render={(props) => <Home {...props} />} />
      </Switch>
    </Container>
  </Router>
  );
}

export default App;
