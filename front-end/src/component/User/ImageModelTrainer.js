import React, { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const ImageModelTrainer = () => {

    useEffect(() => {
        // Define the model architecture
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    
        // Compile the model
        model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
    
        // Generate some training data
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
        const ys = tf.tensor2d([2, 4, 6, 8], [4, 1]);
    
        // Train the model
        model.fit(xs, ys, {epochs: 10}).then(() => {
          // Use the model to make predictions
          const output = model.predict(tf.tensor2d([5], [1, 1]));
          console.log(output.dataSync()[0]);
        });
      }, []);

  return (
    <div>ImageModelTrainer</div>
  )
}

export default ImageModelTrainer