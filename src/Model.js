import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Lightbox from 'react-image-lightbox';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import InteractiveModel from './InteractiveModel'
import $ from 'jquery';

const test1list = require.context("./images/model/test1", true, /^\.\/.*\.png$/);
const test2list = require.context("./images/model/test2", true, /^\.\/.*\.png$/);



const modeldict = {
  "7":0,
  "20":1,
  "26":2,
  "49":3,
  "65":4
}

const imagestest1 = test1list.keys();
const imagestest2 = test2list.keys();
const imagesetworkflow = [
    {fname: 'model/workflow/gan01.png', hasmodel: 0},
    {fname: 'model/workflow/gan02.png', hasmodel: 0},
    {fname: 'model/workflow/gan03.png', hasmodel: 0},
    {fname: 'model/workflow/gan04.png', hasmodel: 0}
  ];

const modelidlist = ["9795e1c6-b0fd-4c9f-8c21-1f9899870d22",
    "78ec2535-c163-4416-8053-a3a8fff1faff",
    "56374a5f-c4c0-4f14-8d68-a463ce6ae0a9",
    "d55db3d7-76e5-4e36-a959-0ee9f113d501",
    "73203bdc-794b-4b38-aa56-427f0d9fc0e6"]
const modelsrclist = ["https://www.vectary.com/viewer/v1/?model=9795e1c6-b0fd-4c9f-8c21-1f9899870d22&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=78ec2535-c163-4416-8053-a3a8fff1faff&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=56374a5f-c4c0-4f14-8d68-a463ce6ae0a9&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=d55db3d7-76e5-4e36-a959-0ee9f113d501&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=73203bdc-794b-4b38-aa56-427f0d9fc0e6&env=studio3"]


class Model extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            isModelOpen: false,
            midxlist1:[7, 20, 26],
            midxlist2:[21, 37] //Index start at 1
        };

        this.selectClickFn = this.selectClickFn.bind(this);
        this.constructFilelist = this.constructFilelist.bind(this);
        this.checkModelExist = this.checkModelExist.bind(this);
        this.hideText = this.hideText.bind(this);
    }

    hideText() {
        $(".hide-text").toggle();
    }

    checkModelExist(idx, idxlist) {
        if (idxlist.includes(idx)) {
            return true;
        }
        else
            return false;
    }

    constructFilelist(mode, namelist) {
        var filelist = [];
        var midxlist_temp = this.state.midxlist1;
        var prepend = "model/test1/";
        if (mode=='test2') {
            prepend = "model/test2/";
            midxlist_temp = this.state.midxlist2
        }
        else if (mode=='workflow')
            prepend = "model/workflow/";
        else
            prepend = "model/test1/";

        for (var i=0;i<namelist.length;i++) {
            var hasim = false;
            if (this.checkModelExist(i+1, midxlist_temp)) {
                hasim = true;
            }
            var listobj = {
                fname: prepend + namelist[i].slice(2),
                hasmodel: hasim
            }
            filelist.push(listobj);
            // console.log(filelist)
        }
        
        return filelist;
    }

    selectClickFn(actiontype, imgidx) {
        if (actiontype == 0) { //Type 0: open lightbox normally
            this.setState({ 
                isOpen: true, 
                photoIndex: imgidx
            });      
        }
    }


    render () {
        const { photoIndex, isOpen} = this.state;

        var imageset1 = this.constructFilelist('test1', imagestest1);
        var imageset2 = this.constructFilelist('test2', imagestest2);
        // var imagesetwf = this.constructFilelist('workflow', imagesworkflow);

        var imageset = imagesetworkflow.concat(imageset1).concat(imageset2);

        // console.log(imageset);

        var classType = "border border-white img-item";
        var displaymodelbuttonclass = "notdisplaymodel-class";
        if (imageset[photoIndex].hasmodel == 1) {
            displaymodelbuttonclass = "displaymodel-class"
        }

        var imgrow = imageset.map((filenames, idx) => {
            if (filenames.hasmodel == 0) {
                classType = "border border-white img-item"
            } else if (filenames.hasmodel == 1) {
                classType = "border border-warning img-item img-item-hasmodel"
            }

            if (filenames.fname.length==17||filenames.fname.length==18) {
                classType += " progress-7"
            }

            if (filenames.fname[6]=='w') {
                classType = "border border-white workflow-sect"
            }

            return <Image
            key = {idx}
            src={require('./images/'+filenames.fname)}
            className={classType} 
            onClick={this.selectClickFn.bind(this, 0, idx)}
            /> ;
        });
        var imgrowwf = imgrow.slice(0,4);
        var imgrow1 = imgrow.slice(4,32);
        var imgrow2 = imgrow.slice(32);

        return (
            <div>
                <Container className="gallery-container">
                    <hr />
                    <h3 className="hide-text">Deep Learning Model</h3>
                    <p className="hide-text">We chose <a href="https://phillipi.github.io/pix2pix/" target="blank"><b>Pix2Pix</b></a> as 
                    our Deep Learning model. Pix2Pix
                    has a conditional General Adversarial Networks architecture that enables 
                    image-to-image translation. We trained two mappings using our dataset. 
                    The first one is <b>buidling-footprint-to-depth model</b>, which translates the footprints with building inlines to depth maps.
                    The second one is <b>block-footprint-to-depth model</b>, which translates the block-outline-only footprints to depth maps. 
                    We trained each model for 100 epochs.</p>

                    <br className="hide-text" />
                    {imgrowwf}
                    <hr />
                    
                    <h3 className="hide-text">Test Input 1</h3>
                    <p className="hide-text">After training the model, we first tested it with some 
                    random images we drawn. We found that the model produced relatively good results
                    when we drew closed-line shapes at the center of the image. For open-line shapes and lines at the
                    edge of the input, the model produced relatively unorganized distribution of greyscale on the infered depth maps. 
                    This behavior was expected, since it corresponds with the characteristics of our dataset.</p>
                    <p className="hide-text"> The gallery below shows some of the examples in our Test 1. All depth maps in Test 1 were
                        infered using the buidling-footprint-to-depth model. We built 3D models for some of the data for showcase, which are indicated with  
                        <span className="text-color-border"> colored borders</span>.
                     You can play with them by clicking at "Play with 3D model" button after clicking the images. </p>

                    <br className="hide-text" />
                    {imgrow1}
                    <hr />
                    <h3 className="hide-text">Test Input 2</h3>
                    <p className="hide-text">We built a small animation to show the transition between the open-line
                    shapes and closed-line shapes, and their corresponding inference using our models. The 
                    inference on the left used the buidling-footprint-to-depth model, while the inference on the right
                    used the block-footprint-to-depth model. 
                    We used abstract shapes to test the models so the results would not look like city blocks, but the abstract inputs in a way
                    better shows the difference of the behaviors of the two models.</p>

                    <br className="hide-text" />
                    <Image
                        src={require('./images/model/test2gif/1.gif')}
                        className="border border-white gif-item"
                    /> 
                    <Image
                        src={require('./images/model/test2gif/2.gif')}
                        className="border border-white gif-item"
                    /> 
                    <Image
                        src={require('./images/model/test2gif/3.gif')}
                        className="border border-white gif-item"
                    />
                    {imgrow2}
                    <Image
                        src={require('./images/hidetext.png')}
                        className="border border-white img-item"
                        onClick={this.hideText.bind()}
                    /> 

                </Container>


                {isOpen && (
                <Lightbox
                    mainSrc={require('./images/'+ imageset[photoIndex].fname)}
                    nextSrc={require('./images/'+ imageset[(photoIndex + 1) % imageset.length].fname)}
                    prevSrc={require('./images/'+ imageset[(photoIndex + imageset.length - 1) % imageset.length].fname)}
                    onCloseRequest={() => {
                        this.setState({ isOpen: false });
                        }}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + imageset.length - 1) % imageset.length
                    })}
                    onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % imageset.length,
                    })}
                    toolbarButtons = {[
                        <InteractiveModel idlist={modelidlist} srclist={modelsrclist} i={modeldict[(photoIndex-4+1).toString()]}
                                displaymodelbuttonclass={displaymodelbuttonclass}
                                show={this.checkModelExist(photoIndex-4+1, this.state.midxlist1)}>
                        </InteractiveModel>
                    ]}
                /> )}

            </div>
        );
    }
}

export default Model;
