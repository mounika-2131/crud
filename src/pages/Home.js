import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

const Home = () => {
  const [users, setUsers] = useState([]);

  // Fetch Users from JSONPlaceholder
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // Add User
  const addUser = (newUser) => {
    axios.post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(response => setUsers([...users, response.data]));
  };

  // Update User
  const updateUser = (id, updatedUser) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then(response => {
        setUsers(users.map(user => (user.id === id ? response.data : user)));
      });
  };

  // Delete User
  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)));
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm addUser={addUser} />
      <UserList users={users} updateUser={updateUser} deleteUser={deleteUser} />
    </div>
  );
};

export default Home;
