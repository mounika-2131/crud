import React, { useState } from "react";
import "./App.css";

const CrudApp = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editing, setEditing] = useState(null);
  const [editUser, setEditUser] = useState({ name: "", email: "" });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { id: Date.now(), ...newUser }]);
      setNewUser({ name: "", email: "" });
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (id) => {
    const user = users.find((user) => user.id === id);
    setEditing(id);
    setEditUser(user);
  };

  const handleUpdateUser = () => {
    setUsers(users.map((user) => (user.id === editing ? editUser : user)));
    setEditing(null);
    setEditUser({ name: "", email: "" });
  };

  return (
    <div className="container" style={{ width: "80%" }}>
      <h2>User Management</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          style={{ width: "90%" }}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ width: "90%" }}
        />
        <button onClick={handleAddUser} style={{ width: "70%" }}>Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editing === user.id ? (
                  <input
                    type="text"
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                    style={{ width: "90%" }}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editing === user.id ? (
                  <input
                    type="email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    style={{ width: "90%" }}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editing === user.id ? (
                  <button className="update-btn" onClick={handleUpdateUser}>Save</button>
                ) : (
                  <button className="update-btn" onClick={() => handleEditUser(user.id)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudApp;
