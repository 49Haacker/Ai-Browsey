import React, { useEffect, useRef } from 'react';

const Canvas = ({ onGestureCaptured }) => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasContext = canvasElement.getContext('2d');

    const startCapture = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing the camera: ', error);
        });
    };

    const stopCapture = () => {
      const stream = videoElement.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
        videoElement.srcObject = null;
      }
    };

    const captureGesture = () => {
      // Get the current frame from the video
      canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      
      // Extract and normalize image data
      const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const normalizedData = normalizeImageData(imageData);
      
      // Pass normalized data to the callback function
      onGestureCaptured(normalizedData);
    };

    const normalizeImageData = (imageData) => {
      // Normalize pixel values to the range [0, 1]
      const { width, height, data } = imageData;
      const normalizedData = new Float32Array(width * height * 3);

      for (let i = 0; i < width * height; i++) {
        normalizedData[i * 3] = data[i * 4] / 255; // Red channel
        normalizedData[i * 3 + 1] = data[i * 4 + 1] / 255; // Green channel
        normalizedData[i * 3 + 2] = data[i * 4 + 2] / 255; // Blue channel
      }

      return normalizedData;
    };

    startCapture();

    // Clean up resources when component unmounts
    return () => {
      stopCapture();
    };
  }, [onGestureCaptured]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
