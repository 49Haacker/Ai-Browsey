import React, { useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";

const PoseTrainer = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function init() {
      const net = await loadPoseNetModel();
      setModel(net);
    }
    init();
  }, []);

  async function loadPoseNetModel() {
    const net = await posenet.load();
    return net;
  }

  return <div>PoseTrainer</div>;
};

export default PoseTrainer;
