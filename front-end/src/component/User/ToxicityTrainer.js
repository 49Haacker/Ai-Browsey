import React, { useState } from 'react'

const ToxicityTrainer = () => {

  const [inputText, setInputText] = useState('');

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
        await getToxicity(inputText, (result) => {
          console.log(result);
        });
      }

  return (
    <div>
      <header>
        <div className='container'>
          <h1>Toxicity Model Trainer</h1>
        </div>
      </header>
      <div>
        <textarea onChange={e => setInputText(e.target.value)} value={inputText}>

        </textarea>

        <button className='btn btn-primary' onClick={analyzeText}>Check</button>
      </div>
    </div>
  )
}

export default ToxicityTrainer