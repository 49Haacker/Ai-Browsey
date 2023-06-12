import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [userList, setUserList] = useState([]);

  const fetchUserData = async () => {
    const res = await fetch('http://localhost:5000/user/getall');
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setUserList(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div style={{ minHeight: '80vh' }}>
      <div className="container">
        <p className="display-4 text-center">Manage User Data</p>
        <hr />

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
