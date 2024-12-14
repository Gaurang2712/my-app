import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    axios.get('https://my-app-hfgn.onrender.com/api/users')
      .then(response => setUsers(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email };

    // Send new user data to the backend
    await axios.post('https://my-app-hfgn.onrender.com/api/users', newUser);

    // Clear input fields
    setName('');
    setEmail('');

    // Refresh the list of users
    axios.get('https://my-app-hfgn.onrender.com/api/users')
      .then(response => setUsers(response.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h3>User List</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
