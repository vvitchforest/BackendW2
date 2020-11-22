'use strict';
const {validationResult} = require('express-validator');
const catModel = require('../models/catModel');
const {makeThumbnail} = require('../utils/resize');
const {getCoordinates} = require('../utils/imageMeta');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = async (req, res) => {
  const id = req.params.id;
  const cat = await catModel.getCat(id);
  res.json(cat);
};

const cat_create_post = async (req, res) => {
  console.log('cat_create_post', req.body, req.file);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  let coords = [];
  try {
    coords = await getCoordinates(req.file.path);
  } catch (e) {
    console.log(e);
    coords = [60, 20]
  }
  console.log('coords', coords);
  //object destructuring
  const {name, age, weight, owner} = req.body;
  const params = [name, age, weight, owner, req.file.filename, coords];
  const cat = await catModel.addCat(params);
  res.json({message: 'Upload ok'});

};

const cat_update_put = async (req, res) => {
  console.log('cat_update_put', req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});

  }
  //object destructuring
  const {name, age, weight, owner, id} = req.body;
  const params = [name, age, weight, owner, id];
  const cat = await catModel.updateCat(params);
  res.json({message: 'Update ok'});
};

const cat_delete = async (req, res) => {
  const id = req.params.id;
  const cat = await catModel.deleteCat(id);
  res.json(cat);
};

const make_thumbnail = async (req, res, next) => {
  //Kutsu makeThumbnail
  try {
    const kuvake = await makeThumbnail(req.file.path, req.file.filename);
    console.log('kuvake', kuvake);
    if (kuvake) {
      next();
    }
  } catch (e) {
    res.status(400).json({errors: e.message});
  }
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_create_post,
  cat_update_put,
  cat_delete,
  make_thumbnail,
};