import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Lightbox from 'react-image-lightbox';
import { Container, Row, Col, Image, Button} from 'react-bootstrap';
import InteractiveModel from './InteractiveModel'
import $ from 'jquery';

const overviewlist = require.context("./images/datasetfirst100/overview", true, /^\.\/.*\.png$/);
const buidingfplist = require.context("./images/datasetfirst100/buildingfootprint", true, /^\.\/.*\.png$/);
const blockfplist = require.context("./images/datasetfirst100/blockfootprint", true, /^\.\/.*\.png$/);
const depthmaplist = require.context("./images/datasetfirst100/depthmap", true, /^\.\/.*\.png$/);

// const imagesov = overviewlist.keys();
const imagesov = [
    {fname: 'datasetfirst100/overview/overview1.png', hasmodel: 0},
    {fname: 'datasetfirst100/overview/overview2.png', hasmodel: 0},
    {fname: 'datasetfirst100/overview/overview3.png', hasmodel: 0},
    {fname: 'datasetfirst100/overview/overview4.png', hasmodel: 0}
];
const imagesbufp = buidingfplist.keys();
const imagesblfp = blockfplist.keys();
const imagesdpmp = depthmaplist.keys();

const modeldict = {
    "6":0,
    "15":1,
    "30":2,
    "65":3,
    "78":4
}

const modelidlist = ["378849fe-b1c3-4ffc-9989-1ea5c14ffecf",
    "69dabceb-4a41-4614-bbd0-be480e042c90",
    "fae532d1-f79e-4255-9d28-b05eed016aa7",
    "8ecea3f4-f38b-4ec8-b5ca-99487f218cd8",
    "c9d49bf5-7bd4-4614-b887-b5b566222fe2",
    ]
const modelsrclist = ["https://www.vectary.com/viewer/v1/?model=378849fe-b1c3-4ffc-9989-1ea5c14ffecf&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=69dabceb-4a41-4614-bbd0-be480e042c90&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=fae532d1-f79e-4255-9d28-b05eed016aa7&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=8ecea3f4-f38b-4ec8-b5ca-99487f218cd8&env=studio3",
    "https://www.vectary.com/viewer/v1/?model=c9d49bf5-7bd4-4614-b887-b5b566222fe2&env=studio3",
    ]


class Dataset extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            currentSubset: 'bufp',
            isModelOpen: false,
            midxlist:[6, 15, 30, 65, 78] //Index start at 1
        };

        this.selectClickFn = this.selectClickFn.bind(this);
        this.constructFilelist = this.constructFilelist.bind(this);
        this.switchDataMode = this.switchDataMode.bind(this);
        this.checkModelExist = this.checkModelExist.bind(this);
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
        var prepend = "datasetfirst100/buildingfootprint/";
        if (mode=='dpmp')
            prepend = "datasetfirst100/depthmap/";
        else if (mode=='blfp')
            prepend = "datasetfirst100/blockfootprint/";
        else
            prepend = "datasetfirst100/buildingfootprint/";

        for (var i=0;i<namelist.length;i++) {
            var hasim = false;
            if (this.checkModelExist(i+1, this.state.midxlist)) {
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

    selectClickFn(actiontype, imgidx) {
        // console.log(imgidx)
        if (actiontype == 0) { //Type 0: open lightbox normally
            this.setState({ 
                isOpen: true, 
                photoIndex: imgidx
            });      
        }
    }

    switchDataMode(mode) {
        this.setState({ 
            currentSubset: mode
        }); 
    }

    render () {
        const { photoIndex, isOpen, currentSubset } = this.state;
        var imgset = [];
        if (currentSubset=='dpmp')
            imgset = imagesdpmp;
        else if (currentSubset=='blfp')
            imgset = imagesblfp;
        else
            imgset = imagesbufp;

        var images = this.constructFilelist(currentSubset, imgset);
        images = imagesov.concat(images);

        var classType = "border border-white img-item";
        var displaymodelbuttonclass = "notdisplaymodel-class";
        if (images[photoIndex].hasmodel == 1) {
            displaymodelbuttonclass = "displaymodel-class"
        }

        var imgrow = images.map((filenames, idx) => {
            if (filenames.hasmodel == 0) {
                classType = "border border-white img-item"
            } else if (filenames.hasmodel == 1) {
                classType = "border border-warning img-item img-item-hasmodel"
            }

            return <Image
            key = {idx}
            src={require('./images/'+filenames.fname)}
            className={classType} 
            onClick={this.selectClickFn.bind(this, 0, idx)}
            /> ;
        });

        var overviewimgrow = imgrow.slice(0,4);
        var dsimgrow = imgrow.slice(4);

        return (
            <div>
                <Container className="gallery-container">
                    <hr />
                    {overviewimgrow}
                    <Image
                        src={require('./images/bufp.png')}
                        className="border border-white img-item"
                        onClick={this.switchDataMode.bind(this, 'bufp')}
                    /> 
                    <Image
                        src={require('./images/blfp.png')}
                        className="border border-white img-item"
                        onClick={this.switchDataMode.bind(this, 'blfp')}
                    /> 
                    <Image
                        src={require('./images/dpmp.png')}
                        className="border border-white img-item"
                        onClick={this.switchDataMode.bind(this, 'dpmp')}
                    />
                    {dsimgrow}
                    <a href="https://github.com/jassiay/recreate-manhattan/tree/master/dataset" target="blank">
                        <Image
                            src={require('./images/downloadset.png')}
                            className="border border-white img-item"
                        />
                    </a>

                    <hr />
                </Container>



                {isOpen && (
                <Lightbox
                    mainSrc={require('./images/'+ images[photoIndex].fname)}
                    nextSrc={require('./images/'+ images[(photoIndex + 1) % images.length].fname)}
                    prevSrc={require('./images/'+ images[(photoIndex + images.length - 1) % images.length].fname)}
                    onCloseRequest={() => {
                        this.setState({ isOpen: false });
                        }}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length
                    })}
                    onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % images.length,
                    })}
                    toolbarButtons = {[
                        <InteractiveModel idlist={modelidlist} srclist={modelsrclist} i={modeldict[(photoIndex-4+1).toString()]}
                                displaymodelbuttonclass={displaymodelbuttonclass}
                                show={this.checkModelExist(photoIndex-4+1, this.state.midxlist)}>
                        </InteractiveModel>
                    ]}
                /> )}

            </div>
        );
    }
}

export default Dataset;
