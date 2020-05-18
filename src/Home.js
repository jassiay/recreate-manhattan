import React from 'react';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import { Link} from "react-router-dom";
import $ from 'jquery';

function Home(props) {

  // console.log(props.location.pathname);

  return (
    <div>
      <Container className="gallery-container">
        <hr />
        <div className="thumbnail-holder">
          <h3 className="thumbnail-text">Recreate-Manhattan: <br/>Reimagine a City using Deep Learning</h3>
          <Image className="thumbnail"
              src={require('./images/thumbnail.png')}
          /> 
        </div>
        <hr />
        <div className="bl-lk-holder">
          <a href="/dataset">
            <Image className="thumbnail-sub"
                src={require('./images/ds-tb.png')}
            /></a>
          <a href="/model">
            <Image className="thumbnail-sub"
                src={require('./images/md-tb.png')}
            /></a>
          <a href="/results">
            <Image className="thumbnail-sub"
                src={require('./images/pj-tb.png')}
            /></a>
        </div>
      </Container>
    </div>
  );
}

export default Home;
