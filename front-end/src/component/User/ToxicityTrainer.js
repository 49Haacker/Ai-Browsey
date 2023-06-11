import React, { useState } from 'react';

const ToxicityTrainer = () => {
  const [inputText, setInputText] = useState('');
  const [genResult, setGenResult] = useState([]);

  const [trainingLabels, setTrainingLabels] = useState([{ label: 'Untitled - 1', selImages: [] }]);

  const getToxicity = (text, cb) => {
    const threshold = 0.9;
    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.
    window.toxicity.load(threshold).then((model) => {
      const sentences = [text];

      model
        .classify(sentences)
        .then(async (result) => {
          // console.log(result);
          await cb(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const analyzeText = async () => {
    console.log('analyzing ... ');
    await getToxicity(inputText, (result) => {
      console.log(result);
      const isToxic = result.filter((obj) => obj.results[0].match);
      console.log(isToxic);
      setGenResult(result);
    });
  };

  const addNewLabel = () => {
    setTrainingLabels([...trainingLabels, { label: `Untitled - ${trainingLabels.length + 1}`, selImages: [] }]);
  };

  const displayToxicityResult = () => {
    return genResult.map((obj, index) => (
      <li className="d-flex">
        <p>{obj.label}</p>
        <p>{obj.results[0].probabilities[1]}</p>
      </li>
    ));
  };

  return (
    <div className="mt-5">
      <h1 className="display-4 fw-bold my-4 text-center">Toxicity Model Trainer</h1>
      <div className="row w-100 m-0">
        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <h4>Add Your Labels here for Classification</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <textarea className="form-control" onChange={(e) => setInputText(e.target.value)}></textarea>
                <button className="btn btn-primary mt-3" onClick={analyzeText}>
                  Analyze
                </button>
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h4>Result</h4>
              {displayToxicityResult()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToxicityTrainer;
