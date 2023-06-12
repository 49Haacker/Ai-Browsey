import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';

const TextClassifier = () => {
  const [classes, setClasses] = useState([
    {
      name: 'Untitled 1',
      textArray: []
    }
  ]);

  const [predictionResult, setPredictionResult] = useState(null);

  const [trainedModel, setTrainedModel] = useState(null);

  const [testText, setTestText] = useState('');

  const [selEpoch, setSelEpoch] = useState(200);

  const [modelTraining, setModelTraining] = useState(false);

  const encodeData = (data) => {
    const sentences = data.map((comment) => comment.text.toLowerCase());
    const trainingData = use
      .load()
      .then((model) => {
        return model.embed(sentences).then((embeddings) => {
          return embeddings;
        });
      })
      .catch((err) => console.error('Fit Error:', err));

    return trainingData;
  };

  const arr1 = [
    {
      text: 'buy',
      intent: 'buy'
    },
    {
      text: 'buying',
      intent: 'buy'
    },
    {
      text: 'purchase',
      intent: 'buy'
    },
    {
      text: 'buy that',
      intent: 'buy'
    },
    {
      text: 'buy this',
      intent: 'buy'
    },
    {
      text: 'buy it',
      intent: 'buy'
    },
    {
      text: 'where to buy',
      intent: 'buy'
    },
    {
      text: 'where can I buy that',
      intent: 'buy'
    },
    {
      text: 'how much',
      intent: 'buy'
    },
    {
      text: 'Woah yess❤️❤️',
      intent: 'none'
    },
    {
      text: 'Happy birthday to the most beautiful woman on Instagram ! 💗💗',
      intent: 'none'
    },
    {
      text: 'Your body 😍',
      intent: 'none'
    },
    {
      text: 'Angel',
      intent: 'none'
    },
    {
      text: 'I saw this swimsuit on a website and wasn’t convinced, but you rock it and now I want to buy it',
      intent: 'buy'
    },
    {
      text: 'So cute..sexy, sexy',
      intent: 'none'
    },
    {
      text: 'Ooo i need to look like u girl!! Gonna hit the gym now',
      intent: 'none'
    },
    {
      text: 'Beautiful👍💜',
      intent: 'none'
    },
    {
      text: '😱😱💖💖',
      intent: 'none'
    },
    {
      text: 'What is your workout routine? It would be lovely if you could share 😍😍😍',
      intent: 'none'
    }
  ];

  const test = [
    {
      text: 'where can I buy your dress?',
      intent: 'buy'
    },
    {
      text: 'how much was that dress?',
      intent: 'buy'
    },
    {
      text: 'You look so beautiful in that dress',
      intent: 'none'
    },
    {
      text: 'I love you, you are gorgeous',
      intent: 'none'
    }
  ];

  const [modelTrained, setModelTrained] = useState(false);

  const testModel = () => {
    encodeData([
      {
        text: testText,
        intent: 'buy'
      }
    ]).then((data) => {
      const res = trainedModel.predict(data);
      setPredictionResult(res.dataSync().toString().split(','));
    });
  };

  const trainModel = () => {
    setModelTraining(true);
    const model = tf.sequential();

    // Add layers to the model
    model.add(
      tf.layers.dense({
        inputShape: [512],
        activation: 'sigmoid',
        units: 2
      })
    );

    model.add(
      tf.layers.dense({
        inputShape: [2],
        activation: 'sigmoid',
        units: 2
      })
    );

    model.add(
      tf.layers.dense({
        inputShape: [2],
        activation: 'sigmoid',
        units: 2
      })
    );

    // Compile the model
    model.compile({
      loss: 'meanSquaredError',
      optimizer: tf.train.adam(0.06) // This is a standard compile config
    });

    let allText1 = classes[0].textArray.map((text) => ({ text, intent: classes[0].name }));
    let allText2 = classes[1].textArray.map((text) => ({ text, intent: classes[1].name }));
    console.log([...allText1, ...allText2]);
    const outputData = tf.tensor2d([...allText1, ...allText2].map((comment) => [comment.intent === classes[0].name ? 1 : 0, comment.intent === classes[0].name ? 1 : 0]));
    Promise.all([encodeData([...allText1, ...allText2]), encodeData(test)])
      .then((data) => {
        const { 0: training_data, 1: testing_data } = data;

        model.fit(training_data, outputData, { epochs: selEpoch }).then((history) => {
          setTrainedModel(model);
          setModelTrained(true);
          // model.predict(testing_data).print();
          setModelTraining(false);
        });
      })
      .catch((err) => console.log('Prom Err:', err));
  };

  const addText = (index) => {
    const temp = [...classes];
    temp[index].textArray.push('');
    setClasses(temp);
  };

  const addClass = () => {
    const temp = [...classes];
    temp.push({
      name: `Untitled ${classes.length + 1}`,
      textArray: []
    });
    setClasses(temp);
  };

  const changeText = (index, value) => {
    const temp = [...classes];
    temp[index].name = value;
    setClasses(temp);
  };

  const updateArrayText = (index, textIndex, value) => {
    const temp = [...classes];
    temp[index].textArray[textIndex] = value;
    setClasses(temp);
  };

  const removeText = (index, textIndex) => {
    const temp = [...classes];
    temp[index].textArray.splice(textIndex, 1);
    setClasses(temp);
  };

  const removeClass = (index) => {
    const temp = [...classes];
    temp.splice(index, 1);
    setClasses(temp);
  };

  const getTextFromClipboard = (index) => {
    console.log(index);
    navigator.clipboard.readText().then((clipText) => {
      console.log(clipText);
      const temp = classes[index];
      console.log(temp);
      temp.textArray = [...temp.textArray, ...clipText.split('\n').map(t => t.trim()).slice(0, -1)];
      console.log(temp);
      if(index === 0) {
        setClasses([temp, ...classes.slice(index + 1)]);
      }else{
        setClasses([...classes.slice(0, index), temp, ...classes.slice(index+1)]);
      }
      // temp[0].textArray.push(clipText);
      // setClasses(temp);
    });
  }

  return (
    <div style={{ backgroundImage: `url('https://wallpapers.com/images/hd/minimalist-abstract-ibin54chkget0go9.jpg')` }}>
      <div className="container py-5">
        <div className="card">
          <div className="card-body">
            <p className="display-4 text-center fw-bold">Text Classifier</p>
            <hr />

            <div className="row my-3">
              <div className="col-md-4">
                <label>Selected Epochs</label>
                <input type="number" className="form-control" value={selEpoch} onChange={(e) => setSelEpoch(parseInt(e.target.value))} />
              </div>
            </div>

            <h3>Custom Text Classes</h3>
            <div className="row">
              {classes.map((obj, index) => (
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-header">
                      {/* <h3>{obj.name}</h3> */}
                      <div className="input-group">
                        <span className="input-group-text">Class Name</span>
                        <input onChange={(e) => changeText(index, e.target.value)} className="form-control" />
                      </div>
                    </div>
                    <div className="card-body" style={{height: 300, overflow: 'auto'}}>
                      {obj.textArray && obj.textArray.map((text, tindex) => (
                        <div className="row my-3">
                          <div className="col">
                            <input className="form-control" value={text} onChange={(e) => updateArrayText(index, tindex, e.target.value)} />
                          </div>
                          <div className="col-2">
                            <button className="btn btn-danger" onClick={(e) => removeText(index, tindex)}>
                              <i class="fas fa-trash    "></i>
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="d-flex mt-3">
                        <div className="col-4">
                          <button className="btn btn-primary" onClick={(e) => addText(index)}>
                            Add Text
                          </button>
                        </div>
                        <div className="col-4">
                          <button className="btn btn-primary" onClick={e => getTextFromClipboard(index)}>
                            Clipboard
                          </button>
                        </div>
                        <div className="col-4">
                          <button className="btn btn-outline-danger" onClick={(e) => removeClass(index)}>
                            <i class="fas fa-trash-alt    "></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-md-3">
                <button className="btn btn-success" onClick={addClass}>
                  Add New Class
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <button disabled={modelTraining && (classes.length < 2)} className="btn btn-primary btn-lg w-100 my-4" onClick={trainModel}>
              <i class="fas fa-rocket"></i> {modelTraining ? 'Training Model...' : 'Train Model'}
            </button>
            <h3 className="text-success text-center">{modelTrained && 'Model has been Trained Successfully!!'}</h3>
            <label className="mt-3 h2">Test Model</label>
            <input className="form-control" onChange={(e) => setTestText(e.target.value)} placeholder="Enter Text to Classify" />
            <button className="btn btn-primary mt-4" onClick={testModel} disabled={classes.length < 2}>
              Test Model
            </button>
            <h1 className="my-4">Result</h1>
            <hr />
            {/* {predictionResult} */}
            {predictionResult &&
              predictionResult.map((res, index) => (
                <div className="row">
                  <div className="col">
                    <h3>{classes[index].name}</h3>
                  </div>
                  <div className="col">
                    <h3>{res}</h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextClassifier;
