import React, { useState } from "react";

const UserForm = ({ addUser }) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(user);
    setUser({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
