import React from "react";

const Utils = () => {
  const multer = require("multer");
  const router = require("express").Router();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./static/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const myStorage = multer({ storage: storage });

  router.post("/uploadfile", myStorage.single("myfile"), (req, res) => {
    res.status(200).json({ status: "success" });
  });

  module.exports = router;

  return (
    <div>
      <h2>this is utls.js page</h2>
    </div>
  );
};

export default Utils;
