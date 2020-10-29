'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    console.log('rows', rows);
    return rows;
  } catch(e) {
    console.log('catModel error', e.message);
    return {error: 'DB Error'};
  }
};

const getCat = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id = ?',
        [id]);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('catModel error', e.message);
    return {error: 'DB Error'};
  }
};

const addCat = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_cat (name, age, weight, owner, filename) VALUES (?, ?, ?, ?, ?)',
        params
    );
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('catModel error', e.message);
    return {error: 'DB Error'};
  }
};

module.exports = {
  getAllCats, getCat, addCat,
};
