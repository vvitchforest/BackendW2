'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT user_id, name, email FROM wop_user');
    console.log('rows', rows);
    return rows;
  } catch(e) {
    console.log('userModel error', e.message);
    return {error: 'DB Error'};
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT user_id, name, email FROM wop_user WHERE user_id = ?',
        [id]);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('userModel error', e.message);
    return {error: 'DB Error'};
  }
};

const addUser = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?)',
        params
    );
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('userModel error', e.message);
    return {error: 'DB Error'};
  }
};

module.exports = {
  getAllUsers, getUser, addUser,
};

