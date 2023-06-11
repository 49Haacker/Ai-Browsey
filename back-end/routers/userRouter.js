const { Router } = require('express');
const router = Router();
const Model = require('../models/userModel');

router.post('/add', (req, res) => {
  //get data from client
  console.log(req.body);

  new Model(req.body)
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get('/getall', (req, res) => {
  Model.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/auth', (req, res) => {
  // console.log(req.body);
  Model.findOne(req.body)
    .then((result) => {
      if (result) return res.json({ status: 'success', result });
      else return res.status(401).json({ status: 'failed' });
    })
    .catch((err) => {
      console.error('Error authenticating user', err);
      res.status(502).json({ status: 'failed' });
    });
});

router.put('/update/:id', (req, res) => {
  console.log(req.body);

  //to save the data
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.delete('/delete/:id', (req, res) => {
  console.log(req.body);

  //to save the data
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
