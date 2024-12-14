const express = require('express');
const { getUsersHandler, createUserHandler } = require('../controllers/userController');

const userRoutes = (pool) => {
  const router = express.Router();
  router.get('/', (req, res) => getUsersHandler({ ...req, pool }, res));
  router.post('/', (req, res) => createUserHandler({ ...req, pool }, res));
  return router;
};

module.exports = userRoutes;
