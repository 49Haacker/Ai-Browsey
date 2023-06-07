import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs";
// import '@tensorflow/tfjs-node';
import * as mobilenet from "@tensorflow-models/mobilenet";
import { categoricalCrossentropy } from '@tensorflow/tfjs-layers/dist/exports_metrics';

const imageList1 = [
  'apple-1.jpg',
  'apple-2.jpg',
  'apple-3.jpg',
  'apple-4.jpg',
  'apple-5.jpg',
  'orange-1.jpg',
  'orange-2.jpg',
  'orange-3.jpg',
  'orange-4.jpg',
  'orange-5.jpg',
]

const label_x1 = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
const label_x2 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];

const imageList2 = [
  'orange-1.jpg',
  'orange-2.jpg',
  'orange-3.jpg',
  'orange-4.jpg',
  'orange-5.jpg',
]

const classes = ['apple', 'apple', 'apple', 'apple', 'apple', 'orange', 'orange', 'orange', 'orange', 'orange'];

const ImageModelTrainer = () => {

  const [batchSize, setBatchSize] = useState(5);

  const train = async () => {
    const { images, targets } = generateData();
    // this.ProgressBarValue=35;
    console.log("Images are loaded into the memory as tensor !", "Close");

    const mobilenetModified = await getModifiedMobilenet();
    // this.ProgressBarValue=50;
    console.log("Modefiled Mobilenet AI Model is loaded !", "Close");

    await fineTuneModifiedModel(mobilenetModified, images, targets);
    console.log("Model training is completed !", "Close");
    // this.ProgressBarValue=100;
  }

  const getModifiedMobilenet = async () => {
    const trainableLayers = [
      "denseModified",
      "conv_pw_13_bn",
      "conv_pw_13",
      "conv_dw_13_bn",
      "conv_dw_13",
    ];
    const mobilenet = await tf.loadLayersModel(
      "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
    );
    console.log("Mobilenet model is loaded");

    const x = mobilenet.getLayer("global_average_pooling2d_1");
    const predictions = tf.layers
      .dense({ units: 2, activation: "softmax", name: "denseModified" })
      .apply(x.output);
    let mobilenetModified = tf.model({
      inputs: mobilenet.input,
      outputs: predictions,
      name: "modelModified",
    });
    console.log("Mobilenet model is modified");

    mobilenetModified = freezeModelLayers(
      trainableLayers,
      mobilenetModified
    );
    console.log("ModifiedMobilenet model layers are freezed");

    mobilenetModified.compile({
      loss: categoricalCrossentropy,
      optimizer: tf.train.adam(1e-3),
      metrics: ["accuracy", "crossentropy"],
    });

    return mobilenetModified;
  };

  const loadImage = () => {
    const imgElement = document.getElementById("my-image");

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
  }

  const fineTuneModifiedModel = async (model, images, targets) => {
    function onBatchEnd(batch, logs) {
      console.log('Accuracy', logs.acc);
      console.log('CrossEntropy', logs.ce);
      console.log('All', logs);
    }
    console.log('Finetuning the model...');

    await model.fit(images, targets,
      {
        epochs: 5,
        batchSize: 24,
        validationSplit: 0.2,
        callbacks: { onBatchEnd }

      }).then(info => {
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
        model.dispose();
      });;

  }

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

      if (cols[0].split(csvSeparator_2)[1] == "png") {

        if (cols[1] == "Uninfected") {
          this.label_x1.push(Number('1'));
          this.label_x2.push(Number('0'));

          this.tableRows[i].ImageSrc = "../assets/" + cols[0];
          this.tableRows[i].LabelX1 = 1;
          this.tableRows[i].LabelX2 = 0;
          this.tableRows[i].Class = "Uninfected";
        }

        if (cols[1] == "Parasitized") {
          this.label_x1.push(Number('0'));
          this.label_x2.push(Number('1'));

          this.tableRows[i].ImageSrc = "../assets/" + cols[0];
          this.tableRows[i].LabelX1 = 0;
          this.tableRows[i].LabelX2 = 1;
          this.tableRows[i].Class = "Parasitized";
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

    // let allTextLines = this.csvContent.split(/\r|\n|\r/);

    // const csvSeparator = ',';
    // const csvSeparator_2 = '.';

    for (let i = 0; i < batchSize; i++) {
      const imageTensor = capture(imageList1[i]);
      let targetTensor = tf.tensor1d([label_x1[i], label_x2[i]]);

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

  function capture(imgId) {
    // Reads the image as a Tensor from the <image> element.
    const picture = document.getElementById(imgId);
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


  function onFileSelect(input) {
    const files = input.files;

    if (files && files.length) {
      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const textFromFileLoaded = fileReader.result;
        this.csvContent = textFromFileLoaded;
      }

      fileReader.readAsText(fileToRead, "UTF-8");

      console.log("Filename: " + files[0].name);
      console.log("Type: " + files[0].type);
      console.log("Size: " + files[0].size + " bytes");
    }
  }

  function getTotalUninfected() {
    return this.tableRows.map(t => t.LabelX1).reduce((acc, value) => acc + value, 0);
  };


  function getTotalPAratisized() {
    return this.tableRows.map(t => t.LabelX2).reduce((acc, value) => acc + value, 0);
  };


  useEffect(() => {
    // initClassifier();
    // getModifiedMobilenet();
    train();
  }, []);

  const predict = async (image) => {
    const model = await mobilenet.load();
    const imageTensor = tf.browser.fromPixels(image);
    const predictions = await model.classify(imageTensor);
    console.log(predictions);
  };

  useEffect(() => {
    // loadImage();
    // // Define the model architecture
    // const model = tf.sequential();
    // model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // // Compile the model
    // model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

    // // Generate some training data
    // const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    // const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]);

    // // Train the model
    // model.fit(xs, ys, { epochs: 10 }).then(() => {
    //   // Use the model to make predictions
    //   const output = model.predict(tf.tensor2d([5], [1, 1]));
    //   console.log(output.dataSync()[0]);
    // });
  }, []);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(URL + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
      }
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-1">
          {
            imageList1.map((image, index) => (
              <img
                src={`/traningImages/${image}`}
                id={image}
                width="224" height="224"
              />
            ))
          }
        </div>
        <div className="col-md-1">
          {
            imageList2.map((image, index) => (
              <img
                src={`/traningImages/${image}`}
                id={image}
                className="img-fluid"
              />
            ))
          }
        </div>
      </div>
      <div className="d-flex mt-5">
        <div className="row w-100 m-0">
          <div className="col-md-4">
            <div
              className="pb-3 text-center"
              style={{ backgroundColor: "blue" }}
            >
              <h2>Upload Image</h2>
            </div>
            <div className="pb-3 d-flex justify-content-center mt-2 w-100">
              <label for="formFileMultiple" className="form-label">
                Multiple files input example
              </label>
              <input
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              />
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Boat on Calm Water"
                />

                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Wintry Mountain Landscape"
                />
              </div>

              <div className="col-lg-4 mb-4 mb-lg-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Mountains in the Clouds"
                />

                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Boat on Calm Water"
                />
              </div>

              <div className="col-lg-4 mb-4 mb-lg-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Waves at Sea"
                />

                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
                  className="w-100 shadow-1-strong rounded mb-4"
                  alt="Yosemite National Park"
                />
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div
              className="col-lg-4 mb-4 mb-lg-0 text-center w-100 pb-3"
              style={{ backgroundColor: "red" }}
            >
              <h2>class</h2>
            </div>
            <div className="row row-cols-4 g-3 pt-2">
              <div className="col">
                <div className="card">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                    className="card-img-top"
                    alt="Hollywood Sign on The Hill"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
                    className="card-img-top"
                    alt="Palm Springs Road"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
                    className="card-img-top"
                    alt="Palm Springs Road"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/standard/city/050.webp"
                  className="card-img-top"
                  alt="Skyscrapers"
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <hr className="hr" />
            <div className="row">
              <div className="col text-center">
                <h2>Traning process</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageModelTrainer;
