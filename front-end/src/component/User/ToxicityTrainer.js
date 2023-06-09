import React from 'react'

const ToxicityTrainer = () => {

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

  return (
    <div>ToxicityTrainer</div>
  )
}

export default ToxicityTrainer