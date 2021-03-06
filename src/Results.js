import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Lightbox from 'react-image-lightbox';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import InteractiveModel from './InteractiveModel'
import $ from 'jquery';

const projlist = require.context("./images/project", true, /^\.\/.*\.png$/);
const wflist = require.context("./images/model/workflow", true, /^\.\/.*\.png$/);

const modeldict = {
  "21":0,
  "47":1,
  "51":2
}

const imagesres = [
  {fname: 'projresults/1.png', hasmodel: 0},
  {fname: 'projresults/0002.png', hasmodel: 0},
  {fname: 'projresults/0003.png', hasmodel: 0}
];

const imagesproj = projlist.keys();
const imagesworkflow = wflist.keys();

const modelidlist = ["034c92c6-6cd1-4d8d-97ef-43950ec6ca32" ,
    "09cf2053-3083-4767-9f7b-b3867ef826cd",
    "7d6f61ea-5b09-45f2-b2f8-298a23f10c59"]
const modelsrclist = ["https://www.vectary.com/viewer/v1/?model=034c92c6-6cd1-4d8d-97ef-43950ec6ca32&env=studio3" ,
    "https://www.vectary.com/viewer/v1/?model=09cf2053-3083-4767-9f7b-b3867ef826cd&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=7d6f61ea-5b09-45f2-b2f8-298a23f10c59&env=studio3"]


class Results extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            isModelOpen: false,
            midxlist1:[21, 47, 51]
        };

        this.selectClickFn = this.selectClickFn.bind(this);
        this.constructFilelist = this.constructFilelist.bind(this);
        this.checkModelExist = this.checkModelExist.bind(this);
        this.hideText = this.hideText.bind(this);
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
        var prepend = "project/";
        // if (mode=='workflow')
        //     prepend = "model/workflow/";
        // else
        //     prepend = "model/test1/";

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
        }
        
        return filelist;
    }


    hideText() {
        $(".hide-text").toggle();
    }


    selectClickFn(actiontype, imgidx) {
        // console.log(imgidx)
        if (actiontype == 0) { //Type 0: open lightbox normally
            this.setState({ 
                isOpen: true, 
                photoIndex: imgidx
            });      
        }
    }


    render () {
        const { photoIndex, isOpen} = this.state;

        var imageset = this.constructFilelist('test1', imagesproj);
        var imagesetwf = this.constructFilelist('workflow', imagesworkflow);

        imageset = imagesres.concat(imageset);


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

            if (filenames.fname.length==17) {
              classType += " progress-1";
            } else if (filenames.fname.length==20){
              classType += " progress-2";
            }

            // console.log(filenames.fname.length);

            return <Image
            key = {idx}
            src={require('./images/'+filenames.fname)}
            className={classType} 
            onClick={this.selectClickFn.bind(this, 0, idx)}
            /> ;
        });


        var overviewimgrow = imgrow.slice(0,3);
        var imgrow2 = imgrow.slice(3);

        return (
            <div>
                <Container className="gallery-container">
                    <hr />
                    <h3 className="hide-text">We Built a New Manhattan!</h3>
                    <p className="hide-text">We drew 151 block-like images as our input, and order them to create 
                    a footprint for a city, as shown at the left side of the second row. After the model infered their depth maps, we ordered them in the same way. Thus, a 
                    depth map for a city was created, as shown at the right side of the second row. From that, we rendered our <b>New Manhattan.</b></p>

                    <br className="hide-text" />
                    {overviewimgrow}
                    <hr className="hide-text" />
                    <h3 className="hide-text">A Community in the City</h3>
                    <p className="hide-text">We made a 3D model playground for a small community in our machine-learned city.</p>

                    <br className="hide-text" />
                    <div>
                    <iframe className="result-model" title="communityexample" id="739b8415-3703-4394-83cd-fb394f6465f8"
                      src="https://www.vectary.com/viewer/v1/?model=739b8415-3703-4394-83cd-fb394f6465f8&env=studio3" 
                      frameBorder="0">
                    </iframe>
                    </div>
                    <hr className="hide-text"/>
                    <h3 className="hide-text">Some Blocks in the City</h3>
                    <p className="hide-text">The gallery below shows the inputs and their corresponding depth map outputs
                    for the blocks we re-drew. We used the results from the block-footprint-to-depth model to re-construct our city. We built 
                    3D models for some of the data for showcase, which are indicated with  
                        <span className="text-color-border"> colored borders</span>.
                     You can play with them by clicking at "Play with 3D model" button after clicking the images.</p>

                    <br className="hide-text" />
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
                        <InteractiveModel idlist={modelidlist} srclist={modelsrclist} i={modeldict[(photoIndex-3+1).toString()]}
                                displaymodelbuttonclass={displaymodelbuttonclass}
                                show={this.checkModelExist(photoIndex-3+1, this.state.midxlist1)}>
                        </InteractiveModel>
                    ]}
                /> )}

            </div>
        );
    }
}

export default Results;
