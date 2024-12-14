const getUsers = async (pool) => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  };
  
  const createUser = async (pool, userData) => {
    const { name, email } = userData;
    const result = await pool.query('INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', [name, email]);
    return result.rows[0];
  };
  
  module.exports = { getUsers, createUser };
  