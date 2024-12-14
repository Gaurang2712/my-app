const { getUsers, createUser } = require('../models/userModel');

const getUsersHandler = async (req, res) => {
  try {
    const users = await getUsers(req.pool);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const createUserHandler = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await createUser(req.pool, userData);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = { getUsersHandler, createUserHandler };
