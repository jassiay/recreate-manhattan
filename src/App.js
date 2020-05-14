import React from 'react';
import About from './About';
import Model from './Model';
import Results from './Results';
import Dataset from './Dataset';
import InteractiveModel from './InteractiveModel';
import { BrowserRouter as Router, Switch, Route, NavLink, Link} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Container, Image} from 'react-bootstrap';


function App() {
  return (
    <Router className="router" basename={`${process.env.PUBLIC_URL}/`}>
    <Container>
      <Navbar collapseOnSelect expand="lg" className="nav-bar-custom">
      <Navbar.Brand className="brand-custom" href="./">Recreate-Manhattan</Navbar.Brand>
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


function Home(props) {
  return (
    <div>
      <Container>
        <hr />
        <div className="thumbnail-holder">
          <h3 className="thumbnail-text">Recreate-Manhattan: <br/>Reimagine a City using Deep Learning</h3>
          <Image className="thumbnail"
              src={require('./images/thumbnail.png')}
          /> 
        </div>
        <hr />
        <div className="bl-lk-holder">
          <Link to="/dataset">
            <Image className="thumbnail-sub"
                  src={require('./images/ds-tb.png')}/>
          </Link>
          <Link to="/model">
            <Image className="thumbnail-sub"
                  src={require('./images/md-tb.png')}/>
          </Link>
          <Link to="/results">
            <Image className="thumbnail-sub"
                  src={require('./images/pj-tb.png')}/>
          </Link>
        </div>
      </Container>
    </div>

  );
}

export default App;
