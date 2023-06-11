import React, { useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import Canvas from './Canavas';

const TeachablePoseNet = () => {
  const [poses, setPoses] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [poseNet, setPoseNet] = useState(null);

  const handleGestureCapture = (gestureData) => {
    if (isTraining) {
      setPoses((prevPoses) => [...prevPoses, gestureData]);
    } else {
      performInference(gestureData);
    }
  };

  const performInference = async (gestureData) => {
    const poses = await poseNet.estimateMultiplePoses(gestureData);
    console.log('Inference Result:', poses);
    // Perform actions based on the inferred poses
  };

  const trainModel = async () => {
    setIsTraining(true);
    setPoses([]);

    // Load the PoseNet model
    const net = await posenet.load();

    // Update state once the model is loaded
    setPoseNet(net);
    setIsModelReady(true);
  };

  return (
    <div>
      <h1>Teachable PoseNet</h1>
      {!isTraining && isModelReady && (
        <button onClick={trainModel}>Train Model</button>
      )}
      <Canvas onGestureCaptured={handleGestureCapture} />
    </div>
  );
};

export default TeachablePoseNet;
