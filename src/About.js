import React from 'react';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import $ from 'jquery';

function About() {
  return (
    <div>
      <Container className="gallery-container">
        <hr />
        <h3>About This Project</h3>
        <p>This website is a students' final presentation of <b>The Cooper Union's 
          Machine Learning+Architecture Studio/Independent Study</b> in Fall 2020.
        </p>
        <p>Remember to check out our Instagram <a href="https://www.instagram.com/machine_learning_architecture/?hl=en" target="blank">@machine_learning_architecture</a> for more exploration we did in this course!
        </p>
        <h3>Instructors</h3>
        <p>&#127897; Benjamin Aranda (Irwin S. Chanin School of Architecture)</p>
        <p>&#127913; Sam Keene (Albert Nerken School of Engineering)</p>
        <h3>Students</h3>
        <p>&#127928; Eli Kim (Irwin S. Chanin School of Architecture)</p>
        <p>&#127911; Matthew Chan (Irwin S. Chanin School of Architecture)</p>
        <p>&#127929; Jing Jiang (Albert Nerken School of Engineering)</p>
        <h3>Dataset Download</h3>
        <p>Download our 3x400 Footprint2Depth dataset <a href="https://github.com/jassiay/manhattan-recreate/tree/master/dataset" target="blank"> here</a>.</p>
        <h3>References</h3>
        <p>Pix2Pix project website: <a href="https://phillipi.github.io/pix2pix/" target="blank">https://phillipi.github.io/pix2pix/</a></p>
        <p>Pix2Pix implementation repo we used: <a href="https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix" target="blank">https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix</a></p>
        <p>Curated our dataset based on: <a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-nyc-3d-model-download.page" target="blank">https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-nyc-3d-model-download.page</a></p>


        
      </Container>
    </div>
  );
}

export default About;
