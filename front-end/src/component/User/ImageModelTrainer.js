import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs';
// import '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { categoricalCrossentropy } from '@tensorflow/tfjs-layers/dist/exports_metrics';
// import { save } from '@tensorflow/tfjs-node';

const imageList1 = ['apple-1.jpg', 'apple-2.jpg', 'apple-3.jpg', 'apple-4.jpg', 'apple-5.jpg', 'orange-1.jpg', 'orange-2.jpg', 'orange-3.jpg', 'orange-4.jpg', 'orange-5.jpg'];

const label_x1 = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
const label_x2 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];

const imageList2 = ['orange-1.jpg', 'orange-2.jpg', 'orange-3.jpg', 'orange-4.jpg', 'orange-5.jpg'];

const classes = ['apple', 'apple', 'apple', 'apple', 'apple', 'orange', 'orange', 'orange', 'orange', 'orange'];



const ImageModelTrainer = () => {
  const [tic, setTic] = useState(false);
  const [selLabel, setSelLabel] = useState(null);
  const [trainedModel, setTrainedModel] = useState(null);
  const [trainingLabels, setTrainingLabels] = useState([{ label: 'Untitled - 1', selImages: [] }]);

  const [imagesSelecting, setImagesSelecting] = useState(false);
  const [batchSize, setBatchSize] = useState(5);
  const [selImages, setSelImages] = useState([]);

  const [loadedImages, setLoadedImages] = useState([]);

  const loadClientImages = (e) => {
    const files = e.target.files;
    console.log(files);
    if (files && files.length) {
      for (let file in files) {
        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const blob = new Blob([reader.result]);

            // Use the blob object as needed
            // For example, you can upload it to a server or perform other operations

            console.log(blob);
            const imageDataUrl = e.target.result;
            setSelImages([...selImages, imageDataUrl]);
            console.log(imageDataUrl);
            // Do something with the image data URL (e.g., display it, process it, etc.)
          };

          reader.readAsArrayBuffer(file);
        }
      }
    }
  };

  const train = async () => {
    const { images, targets } = generateData();
    // this.ProgressBarValue=35;
    console.log('Images are loaded into the memory as tensor !', 'Close');

    const mobilenetModified = await getModifiedMobilenet();
    // this.ProgressBarValue=50;
    console.log('Modefiled Mobilenet AI Model is loaded !', 'Close');

    await fineTuneModifiedModel(mobilenetModified, images, targets);
    console.log('Model training is completed !', 'Close');
    // this.ProgressBarValue=100;
  };

  const getModifiedMobilenet = async () => {
    const trainableLayers = ['denseModified', 'conv_pw_13_bn', 'conv_pw_13', 'conv_dw_13_bn', 'conv_dw_13'];
    const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    console.log('Mobilenet model is loaded');

    const x = mobilenet.getLayer('global_average_pooling2d_1');
    const predictions = tf.layers.dense({ units: 2, activation: 'softmax', name: 'denseModified' }).apply(x.output);
    let mobilenetModified = tf.model({
      inputs: mobilenet.input,
      outputs: predictions,
      name: 'modelModified'
    });
    console.log('Mobilenet model is modified');

    mobilenetModified = freezeModelLayers(trainableLayers, mobilenetModified);
    console.log('ModifiedMobilenet model layers are freezed');

    mobilenetModified.compile({
      loss: categoricalCrossentropy,
      optimizer: tf.train.adam(1e-3),
      metrics: ['accuracy', 'crossentropy']
    });

    return mobilenetModified;
  };

  const loadImage = () => {
    const imgElement = document.getElementById('my-image');

    // Create the image tensor
    const imageTensor = tf.browser.fromPixels(imgElement);

    // Print the shape of the image tensor
    console.log(imageTensor.shape);
    return imageTensor;
  };

  const freezeModelLayers = (trainableLayers, mobilenetModified) => {
    for (const layer of mobilenetModified.layers) {
      layer.trainable = false;
      for (const tobeTrained of trainableLayers) {
        if (layer.name.indexOf(tobeTrained) === 0) {
          layer.trainable = true;
          break;
        }
      }
    }
    return mobilenetModified;
  };

  const fineTuneModifiedModel = async (model, images, targets) => {
    function onBatchEnd(batch, logs) {
      console.log('Accuracy', logs.acc);
      console.log('CrossEntropy', logs.ce);
      console.log('All', logs);
    }
    console.log('Finetuning the model...');

    await model
      .fit(images, targets, {
        epochs: 5,
        batchSize: 24,
        validationSplit: 0.2,
        callbacks: { onBatchEnd }
      })
      .then((info) => {
        // console.log
        console.log('Final accuracy', info.history.acc);
        console.log('Cross entropy', info.ce);
        console.log('All', info);
        console.log('All', info.history['acc'][0]);

        for (let k = 0; k < 5; k++) {
          console.log({ acc: 0, ce: 0, loss: 0 });

          console.log('acc', info.history['acc'][k]);
          console.log('ce', info.history['ce'][k]);
          console.log('loss', info.history['loss'][k]);
          // this.traningMetrics.push({acc: 0, ce: 0 , loss: 0});

          // this.traningMetrics[k].acc=info.history['acc'][k];
          // this.traningMetrics[k].ce=info.history['ce'][k];
          // this.traningMetrics[k].loss=info.history['loss'][k];
        }
        images.dispose();
        targets.dispose();
        model.save('mymodel.json');
        setTrainedModel(model);
        // model.dispose();
      });
  };

  function parseImages(batchSize) {
    if (this.isImagesListed) {
      this.isImagesListPerformed = false;
      return;
    }

    let allTextLines = this.csvContent.split(/\r|\n|\r/);

    const csvSeparator = ',';
    const csvSeparator_2 = '.';

    for (let i = 0; i < batchSize; i++) {
      // split content based on comma
      const cols = allTextLines[i].split(csvSeparator);

      this.tableRows.push({ ImageSrc: '', LabelX1: 0, LabelX2: 0, Class: '' });

      if (cols[0].split(csvSeparator_2)[1] == 'png') {
        if (cols[1] == 'Uninfected') {
          this.label_x1.push(Number('1'));
          this.label_x2.push(Number('0'));

          this.tableRows[i].ImageSrc = '../assets/' + cols[0];
          this.tableRows[i].LabelX1 = 1;
          this.tableRows[i].LabelX2 = 0;
          this.tableRows[i].Class = 'Uninfected';
        }

        if (cols[1] == 'Parasitized') {
          this.label_x1.push(Number('0'));
          this.label_x2.push(Number('1'));

          this.tableRows[i].ImageSrc = '../assets/' + cols[0];
          this.tableRows[i].LabelX1 = 0;
          this.tableRows[i].LabelX2 = 1;
          this.tableRows[i].Class = 'Parasitized';
        }
      }
    }
    this.table.renderRows();
    this.dataSource.paginator = this.paginator;

    this.isImagesListed = true;
    this.isImagesListPerformed = true;
  }

  function generateData() {
    const imageTensors = [];
    const targetTensors = [];

    let all_labels = [[], []]
    all_labels[0].push(...Array(trainingLabels[0].selImages.length).fill(0));
    all_labels[1].push(...Array(trainingLabels[1].selImages.length).fill(1));
    all_labels[0].push(...Array(trainingLabels[0].selImages.length).fill(1));
    all_labels[1].push(...Array(trainingLabels[1].selImages.length).fill(0));
      // for(let i=0; i<trainingLabels.length; i++) {
      // }

      // for(let i=0; i<trainingLabels.length; i++) {
      // }

    // let allTextLines = this.csvContent.split(/\r|\n|\r/);

    // const csvSeparator = ',';
    // const csvSeparator_2 = '.';

    for (let i = 0; i < batchSize; i++) {
      
      console.log(all_labels);
      const imageTensor = capture(trainingLabels[0].selImages[i]);
      let targetTensor = tf.tensor1d([all_labels[0][i], all_labels[1][i]]);

      targetTensor.print();
      imageTensors.push(imageTensor);
      targetTensors.push(targetTensor);

      imageTensor.print(true);
    }

    const images = tf.stack(imageTensors);
    const targets = tf.stack(targetTensors);

    return { images, targets };

    // for ( let i = 0; i < batchSize; i++)
    // {
    //   // split content based on comma
    //   const cols = allTextLines[i].split(csvSeparator);
    //   console.log(cols[0].split(csvSeparator_2)[0])

    //   if (cols[0].split(csvSeparator_2)[1]=="png")
    //   {
    //     console.log(i)
    //     const imageTensor = this.capture(i);
    //     let targetTensor =tf.tensor1d([this.label_x1[i],this.label_x2[i]]);

    //     targetTensor.print();
    //     imageTensors.push(imageTensor);
    //     targetTensors.push(targetTensor);

    //     imageTensor.print(true);
    //   }
    // }
    // const images = tf.stack(imageTensors);
    // const targets = tf.stack(targetTensors);

    // return {images, targets};
  }

  function capture(imgData) {
    // Reads the image as a Tensor from the <image> element.
    const picture = new Image();
    picture.src = imgData;
    picture.width = 224;
    picture.height = 224;
    // const picture = document.getElementById(img);
    const trainImage = tf.browser.fromPixels(picture);

    // Normalize the image between -1 and 1. The image comes in between 0-255,
    // so we divide by 127 and subtract 1.
    const trainim = trainImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));

    return trainim;
  }

  function onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
  }

  const updateLabelName = ( e, index ) => {
    console.log(e.target.value);
    let temp = trainingLabels[index];
    temp.label = e.target.value;
    setTrainingLabels([...trainingLabels.slice(0, index), temp, ...trainingLabels.slice(index + 1)]);
  }

  function onFileSelect(e) {
    const files = e.target.files;
    console.log(files.length, 'files loaded');
    let temp = [];
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const fileToRead = files[0];

        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          console.log(event.target.result);
          // temp.push(event.target.result);
          console.log(loadedImages);
          setLoadedImages([event.target.result]);
          // if (selImages.length + 1 >= files.length) {
          //   setImagesSelecting(true);
          // }
        };

        fileReader.readAsDataURL(fileToRead, 'UTF-8');

        console.log('Filename: ' + files[0].name);
        console.log('Type: ' + files[0].type);
        console.log('Size: ' + files[0].size + ' bytes');
      }
      // console.log(temp);
      // setLoadedImages([...temp]);
      // console.log(trainingLabels);
      // setTrainingLabels([...trainingLabels.slice(0, selLabel), temp, ...trainingLabels.slice(selLabel + 1)]);
    }
    // console.log(selImages);
  }

  const loadImagesTemp = () => {
    console.log(loadedImages);
    let temp = trainingLabels[selLabel];
    temp.selImages.push(loadedImages[0]);
    console.log(temp);
    setTrainingLabels([...trainingLabels.slice(0, selLabel), temp, ...trainingLabels.slice(selLabel + 1)]);
  }

  function getTotalUninfected() {
    return this.tableRows.map((t) => t.LabelX1).reduce((acc, value) => acc + value, 0);
  }

  function getTotalPAratisized() {
    return this.tableRows.map((t) => t.LabelX2).reduce((acc, value) => acc + value, 0);
  }

  useEffect(() => {
    // initClassifier();
    // getModifiedMobilenet();
    // train();
  }, []);

  const predict = async (image) => {
    // const model = await mobilenet.load();
    // const imageTensor = tf.browser.fromPixels(image);
    // const predictions = await model.classify(imageTensor);
    // console.log(predictions);
    console.log(trainedModel);
    window.mobilenet.load(trainedModel)
    // const mod = await tf.loadLayersModel(trainedModel);
    const testTensor = capture('test-img');
    // const testTensor = tf.browser
    //   .fromPixels(document.getElementById('test-img'))
    //   .resizeNearestNeighbor([224, 224]) // Resize to match the model's input shape
    //   .toFloat()
    //   .div(255)
    //   .expandDims();
    const prediction = trainedModel.classify(testTensor);
    console.log(prediction);
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('myfile', file);
    fetch(URL + '/util/uploadfile', {
      method: 'POST',
      body: fd
    }).then((res) => {
      if (res.status === 200) {
        console.log('file uploaded');
      }
    });
  };

  const addNewLabel = () => {
    setTrainingLabels([...trainingLabels, { label: `Untitled - ${trainingLabels.length + 1}`, selImages: [] }]);
  };

  const handleDownload = () => {
    const url = '/AImodels/model.json'; // Replace with the actual file URL
    const link = document.createElement('a');
    link.href = url;
    link.download = 'model.json'; // Specify the desired file name
    link.click();
  };

  return (
    <>
      {/* <img src="/test.png" id="test-img" width={224} height={224} /> */}
      <div className="d-flex mt-5">
        <div className="row w-100 m-0">
          {/* <div className='col-md-1'> */}
          {/* {
              imageList1.map((image, index) => (
                <img src={'/traningImages/'+image} id={image} width="224" height="224" alt=""  />
              ))
            } */}
          {/* </div> */}
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">
                <h3>Selected Image Class</h3>
              </div>
              <div className="card-body" style={{ height: '90vh', overflow: 'auto' }}>
                {selLabel}
                {selLabel !==null ? (
                  <>
                    <label>Select Images for Label {trainingLabels[selLabel].label}</label>
                    <input type="file" className="form-control" multiple onChange={onFileSelect} />
                    <button onClick={loadImagesTemp} className="btn btn-primary mt-3">Load Images</button>
                    <div className="row mt-4">
                      <div className="col-md-6">{trainingLabels[selLabel].selImages.length && trainingLabels[selLabel].selImages.map((image, index) => <img src={image} id={image} width="224" height="224" alt="" />)}</div>
                    </div>
                  </>
                ) : (
                  <h2>Select a Label to Continue</h2>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="card">
              <div className="card-header">
                <h4>Add Your Labels here for Classification</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  {trainingLabels.map((label, index) => (
                    <div className="col-md-3 mb-3">
                      <div className="card" style={{ border: selLabel === index ? '2px solid blue' : '' }} onClick={(e) => setSelLabel(index)}>
                        <img
                          className="card-img-top"
                          alt=""
                          src="https://i0.wp.com/aiiseasy.com/wp-content/uploads/sites/6/2019/05/text-classification-featured-image.png?resize=394%2C218&ssl=1"
                        />
                        <div className="card-body">
                          <label>Label Name</label>
                          <input className="form-control" value={label.label} onChange={e => updateLabelName(e, index)} />
                          {/* {label.selImages.map((image, index) => (
                            <img src={image} id={image} width="124" height="124" alt="" />
                          ))} */}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-2">
                    <div
                      onClick={addNewLabel}
                      className="p-3 d-flex align-items-center justify-content-center flex-column"
                      style={{ cursor: 'pointer', border: '3px solid grey', height: '100%', borderRadius: 10 }}
                    >
                      <i className="fa fa-plus fa-2x"></i>
                      <h3 className="text-muted text-center">Add New Label</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
            <hr className="hr" />
            <div className="row">
              <div className="col text-center">
                <h2>Training process</h2>
                <button onClick={train} className="btn btn-primary btn-lg mt-4">
                  Start Training
                </button>
                <button disabled={trainedModel === null} onClick={predict} className="btn btn-danger btn-lg mt-4">
                  Predict
                </button>
                <button disabled={trainedModel === null} onClick={handleDownload} className="btn btn-danger btn-lg mt-4">
                  Download Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageModelTrainer;
