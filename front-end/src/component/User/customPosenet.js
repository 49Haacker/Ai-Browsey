/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as tf from "@tensorflow/tfjs"
import * as posenet from "@tensorflow-models/posenet"
import {
  padAndResizeTo,
  scaleAndFlipPoses,
  getInputTensorDimensions,
  toTensorBuffers3D
} from "@tensorflow-models/posenet/dist/util"
import { version } from "./version"
import { decodeMultiplePoses } from "@tensorflow-models/posenet"

const MAX_PREDICTIONS = 3
/**
 * Receives a Metadata object and fills in the optional fields such as timeStamp
 * @param data a Metadata object
 */
const fillMetadata = data => {
  // util.assert(
  // 	typeof data.tfjsVersion === "string",
  // 	() => `metadata.tfjsVersion is invalid`
  // );
  data.packageVersion = data.packageVersion || version
  data.packageName = "@teachablemachine/pose"
  data.timeStamp = data.timeStamp || new Date().toISOString()
  data.userMetadata = data.userMetadata || {}
  data.modelName = data.modelName || "untitled"
  data.labels = data.labels || []
  data.modelSettings = fillConfig(data.modelSettings)
  return data
}
// tslint:disable-next-line:no-any
const isMetadata = c => !!c && Array.isArray(c.labels)

/**
 * process either a URL string or a Metadata object
 * @param metadata a url to load metadata or a Metadata object
 */
const processMetadata = async metadata => {
  let metadataJSON
  if (typeof metadata === "string") {
    const metadataResponse = await fetch(metadata)
    metadataJSON = await metadataResponse.json()
  } else if (isMetadata(metadata)) {
    metadataJSON = metadata
  } else {
    throw new Error("Invalid Metadata provided")
  }
  return fillMetadata(metadataJSON)
}

/**
 * process posenet configuration options
 * @param config a ModelSettings object
 */
const fillConfig = (config = {}) => {
  if (!config.posenet) {
    config.posenet = {}
  }

  config.posenet.architecture = config.posenet.architecture || "MobileNetV1"
  config.posenet.outputStride = config.posenet.outputStride || 16
  config.posenet.inputResolution = config.posenet.inputResolution || 257
  config.posenet.multiplier = config.posenet.multiplier || 0.75

  return config
}

/**
 * Computes the probabilities of the topK classes given logits by computing
 * softmax to get probabilities and then sorting the probabilities.
 * @param logits Tensor representing the logits from MobileNet.
 * @param topK The number of top predictions to show.
 */
export async function getTopKClasses(labels, logits, topK = 3) {
  const values = await logits.data()
  return tf.tidy(() => {
    topK = Math.min(topK, values.length)
    const valuesAndIndices = []
    for (let i = 0; i < values.length; i++) {
      valuesAndIndices.push({ value: values[i], index: i })
    }
    valuesAndIndices.sort((a, b) => {
      return b.value - a.value
    })
    const topkValues = new Float32Array(topK)
    const topkIndices = new Int32Array(topK)
    for (let i = 0; i < topK; i++) {
      topkValues[i] = valuesAndIndices[i].value
      topkIndices[i] = valuesAndIndices[i].index
    }
    const topClassesAndProbs = []
    for (let i = 0; i < topkIndices.length; i++) {
      topClassesAndProbs.push({
        className: labels[topkIndices[i]], //IMAGENET_CLASSES[topkIndices[i]],
        probability: topkValues[i]
      })
    }
    return topClassesAndProbs
  })
}
export class CustomPoseNet {
  // public model: tf.LayersModel;

  getMetadata() {
    return this._metadata
  }

  constructor(model, posenetModel, metadata) {
    this.model = model
    this.posenetModel = posenetModel
    this._metadata = fillMetadata(metadata)
  }

  /**
   * get the model labels
   */
  getClassLabels() {
    return this._metadata.labels
  }

  /**
   * get the total number of classes existing within model
   */
  getTotalClasses() {
    const output = this.model.output
    const totalClasses = output.shape[1]
    return totalClasses
  }

  async estimatePose(sample, flipHorizontal = false) {
    const {
      heatmapScores,
      offsets,
      displacementFwd,
      displacementBwd,
      padding
    } = await this.estimatePoseOutputs(sample)

    const posenetOutput = this.poseOutputsToAray(
      heatmapScores,
      offsets,
      displacementFwd,
      displacementBwd
    )

    const pose = await this.poseOutputsToKeypoints(
      sample,
      heatmapScores,
      offsets,
      displacementFwd,
      displacementBwd,
      padding,
      flipHorizontal
    )

    return { pose, posenetOutput }
  }

  // for multi pose
  // taken from: https://github.com/tensorflow/tfjs-models/blob/master/posenet/src/posenet_model.ts
  async estimatePoseOutputs(sample) {
    const inputResolution = this.posenetModel.inputResolution

    const { resized, padding } = padAndResizeTo(sample, inputResolution)

    const {
      heatmapScores,
      offsets,
      displacementFwd,
      displacementBwd
    } = await this.posenetModel.baseModel.predict(resized)

    resized.dispose()

    return { heatmapScores, offsets, displacementFwd, displacementBwd, padding }
  }

  poseOutputsToAray(heatmapScores, offsets, displacementFwd, displacementBwd) {
    const axis = 2
    const concat = tf.concat([heatmapScores, offsets], axis)
    const concatArray = concat.dataSync()

    concat.dispose()

    return concatArray
  }

  async poseOutputsToKeypoints(
    input,
    heatmapScores,
    offsets,
    displacementFwd,
    displacementBwd,
    padding,
    flipHorizontal = false
  ) {
    const config = {
      maxDetections: MAX_PREDICTIONS,
      scoreThreshold: 0.5,
      nmsRadius: 20
    }

    const [height, width] = getInputTensorDimensions(input)

    const outputStride = this.posenetModel.baseModel.outputStride
    const inputResolution = this.posenetModel.inputResolution

    const [
      scoresBuffer,
      offsetsBuffer,
      displacementsFwdBuffer,
      displacementsBwdBuffer
    ] = await toTensorBuffers3D([
      heatmapScores,
      offsets,
      displacementFwd,
      displacementBwd
    ])

    const poses = await decodeMultiplePoses(
      scoresBuffer,
      offsetsBuffer,
      displacementsFwdBuffer,
      displacementsBwdBuffer,
      outputStride,
      config.maxDetections,
      config.scoreThreshold,
      config.nmsRadius
    )

    const resultPoses = scaleAndFlipPoses(
      poses,
      [height, width],
      inputResolution,
      padding,
      flipHorizontal
    )

    heatmapScores.dispose()
    offsets.dispose()
    displacementFwd.dispose()
    displacementBwd.dispose()

    return resultPoses[0]
  }

  /**
   * Given an image element, makes a prediction through posenet returning the
   * probabilities for ALL classes.
   * @param image the image to classify
   * @param flipped whether to flip the image on X
   */
  async predict(poseOutput) {
    const embeddings = tf.tensor([poseOutput])
    const logits = this.model.predict(embeddings)

    const values = await logits.data()

    const classes = []
    for (let i = 0; i < values.length; i++) {
      classes.push({
        className: this._metadata.labels[i],
        probability: values[i]
      })
    }

    embeddings.dispose()
    logits.dispose()

    return classes
  }

  /**
   * Given an image element, makes a prediction through posenet returning the
   * probabilities of the top K classes.
   * @param image the image to classify
   * @param maxPredictions the maximum number of classification predictions
   */
  async predictTopK(poseOutput, maxPredictions = MAX_PREDICTIONS) {
    // const embeddingsArray = await this.predictPosenet(image);
    // let embeddings = tf.tensor([embeddingsArray]);
    const embeddings = tf.tensor([poseOutput])
    const logits = this.model.predict(embeddings)

    const topKClasses = await getTopKClasses(
      this._metadata.labels,
      logits,
      maxPredictions
    )

    embeddings.dispose()
    logits.dispose()

    return topKClasses
  }

  dispose() {
    this.posenetModel.dispose()
  }
}

export async function loadPoseNet(config = {}) {
  config = fillConfig(config)

  const posenetModel = await posenet.load({
    architecture: config.posenet.architecture,
    outputStride: config.posenet.outputStride,
    inputResolution: config.posenet.inputResolution,
    multiplier: config.posenet.multiplier
  })
  return posenetModel
}

export async function load(checkpoint, metadata) {
  const customModel = await tf.loadLayersModel(checkpoint)
  const metadataJSON = metadata ? await processMetadata(metadata) : null
  const posenetModel = await loadPoseNet(metadataJSON.modelSettings)
  return new CustomPoseNet(customModel, posenetModel, metadataJSON)
}

export async function loadFromFiles(json, weights, metadata) {
  const customModel = await tf.loadLayersModel(
    tf.io.browserFiles([json, weights])
  )
  const metadataFile = await new Response(metadata).json()
  const metadataJSON = metadata ? await processMetadata(metadataFile) : null
  const posenetModel = await loadPoseNet(metadataJSON.modelSettings)
  return new CustomPoseNet(customModel, posenetModel, metadataJSON)
}
