import React, { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs";
// import '@tensorflow/tfjs-node';
import * as mobilenet from "@tensorflow-models/mobilenet";
import {categoricalCrossentropy} from '@tensorflow/tfjs-layers/dist/exports_metrics';

const ImageModelTrainer = () => {
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

  const initClassifier = async () => {
    const model = await mobilenet.load();

    // Prepare your image dataset and labels
    const images = [document.getElementById("my-image")]; // Array of image tensors
    const labels = ["apple"]; // Array of corresponding labels

    // Convert images and labels into tensors
    const imageTensors = images.map((img) => tf.browser.fromPixels(img));
    const labelTensors = tf.tensor(labels);

    // Train the model
    await model.fit(tf.stack(imageTensors), labelTensors);
  };

  const freezeModelLayers = (trainableLayers,mobilenetModified) =>
  {
    for (const layer of mobilenetModified.layers) 
    {
      layer.trainable = false;
      for (const tobeTrained of trainableLayers) 
      {
        if (layer.name.indexOf(tobeTrained) === 0) 
        {
          layer.trainable = true;
          break;
        }
      }
    }
    return mobilenetModified;
  }

  useEffect(() => {
    // initClassifier();
    getModifiedMobilenet();
    const img = document.getElementById("my-image");

    // Load the model.
    window.mobilenet.load().then((model) => {
      // Classify the image.
      model.classify(img).then((predictions) => {
        console.log("Predictions: ");
        console.log(predictions);
      });
    });
  }, []);

  const predict = async (image) => {
    const model = await mobilenet.load();
    const imageTensor = tf.browser.fromPixels(image);
    const predictions = await model.classify(imageTensor);
    console.log(predictions);
  };

  useEffect(() => {
    loadImage();
    // Define the model architecture
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Compile the model
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

    // Generate some training data
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]);

    // Train the model
    model.fit(xs, ys, { epochs: 10 }).then(() => {
      // Use the model to make predictions
      const output = model.predict(tf.tensor2d([5], [1, 1]));
      console.log(output.dataSync()[0]);
    });
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
      <img
        style={{ width: "100px" }}
        src="/traningImages/apple-1.png"
        id="my-image"
      />
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
