'use strict';
const express = require('express');
const router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: './uploads/' });
const catController = require('../controllers/catController');


router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'),(req, res) => {
  console.log(req.body, req.file);
  res.send('From this endpoint you can add cats.');
});

router.put('/', (req, res) => {
  res.send('From this endpoint you can edit cats.')
});

router.delete('/', (req, res) => {
  res.send('From this endpoint you can delete cats.')
});

module.exports = router;