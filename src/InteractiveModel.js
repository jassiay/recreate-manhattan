import React from 'react';
import {Overlay, Button} from 'react-bootstrap';
import $ from 'jquery'

function InteractiveModel(props) {
  
  const [show, setShow] = React.useState(false);

  const target = React.useRef(null);
  // console.log(show);
  // console.log(props.i);

  return (
    <div>
      <Button variant="warning" ref={target} className={props.displaymodelbuttonclass} onClick={() => {
        $(".ReactModal__Overlay").css("z-index", "1");
        if (!show)
          setShow(!show);
        }}>
        Play with 3D Model
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props2) => (
            <div className="holder-overlay" onClick={() => {
              // if (show)
                setShow(!show);
            }}>
              <iframe 
                  title="3dtesting" 
                  id={props.idlist[props.i]} 
                  src={props.srclist[props.i]} 
                  frameBorder="0"
                  className="interactive-model-main">
              </iframe>
              <Button className="close-overlay-btn" variant="warning" ref={target} onClick={() => {
                // if (show)
                  setShow(!show);
              }}>
                Quit 3D Model Playground
              </Button>
            </div>
        )}
      </Overlay>
    </div>
  );
}

export default InteractiveModel;
