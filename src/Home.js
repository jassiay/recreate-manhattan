import React from 'react';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import { Link} from "react-router-dom";
import $ from 'jquery';

function Home(props) {

  // console.log(props.location.pathname);

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
        {/* <h3>About This Project</h3>
        <p>This website is a students' final presentation of <b>The Cooper Union's 
          Machine Learning+Architecture Studio/Independent Study</b> in Fall 2020.
        </p>
        <p>Remember to check out our Instagram <a href="https://www.instagram.com/machine_learning_architecture/?hl=en" target="blank">@machine_learning_architecture</a> for more exploration we did in this course!
        </p> */}
        <div className="bl-lk-holder">
          <a href="/dataset">
            <Image className="thumbnail-sub"
                src={require('./images/ds-tb.png')}
            /></a>
          <a href="/model">
            <Image className="thumbnail-sub"
                src={require('./images/md-tb.png')}
            /></a>
          <a href="/project">
            <Image className="thumbnail-sub"
                src={require('./images/pj-tb.png')}
            /></a>
        </div>
      </Container>
    </div>
  );
}

export default Home;
