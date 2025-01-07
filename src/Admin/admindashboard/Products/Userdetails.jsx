
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Userdetails.module.scss';  // Correct import path
import { Outlet, useNavigate } from 'react-router-dom';

function UserDetails() {
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 
  const [editingUserId, setEditingUserId] = useState(null); 
  const [editedUser, setEditedUser] = useState({}); // State for storing edited user details
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name
  const [filterBlocked, setFilterBlocked] = useState(false); // Toggle to show blocked users
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users
    axios.get('http://localhost:3000/user')
      .then((response) => {
        console.log(response.data); // Log the fetched data for debugging
        setUsers(response.data);  // Set the fetched users
        setLoading(false);  // Set loading to false
      })
      .catch((error) => {
        setError('Failed to load users');  // Handle error
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    // Delete a user by ID
    axios.delete(`http://localhost:3000/user/${userId}`)
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));  // Remove deleted user from state
      })
      .catch(() => {
        setError('Failed to delete user');
      });
  };

  const handleUpdateUser = () => {
    if (editedUser && editedUser.id) {
      axios.put(`http://localhost:3000/user/${editedUser.id}`, editedUser)
        .then((response) => {
          // Update the users state with the updated user
          setUsers(prevUsers => prevUsers.map(user => 
            user.id === editedUser.id ? response.data : user
          ));
          setEditingUserId(null);  // Stop editing
        })
        .catch(() => {
          setError('Failed to update user details');
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = (user) => {
    // Set the user to be edited
    setEditingUserId(user.id);
    setEditedUser({ ...user }); // Populate the edited user state with the current user’s data
  };

  const toggleBlockUser = (userId) => {
    // Find the user to toggle their block status
    const userToUpdate = users.find(user => user.id === userId);
    if (userToUpdate) {
      const updatedUser = { ...userToUpdate, blocked: !userToUpdate.blocked };
      axios.put(`http://localhost:3000/user/${userId}`, updatedUser)
        .then((response) => {
          setUsers(prevUsers => prevUsers.map(user => 
            user.id === userId ? response.data : user
          ));
        })
        .catch(() => {
          setError('Failed to update user status');
        });
    }
  };

  const handleSort = (criteria) => {
  
    const sortedUsers = [...users].sort((a, b) => {
      if (criteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (criteria === 'email') {
        return a.email.localeCompare(b.email);
      } else if (criteria === 'blocked') {
        return a.blocked === b.blocked ? 0 : a.blocked ? 1 : -1;
      }
      return 0;
    });
    setUsers(sortedUsers);
    setSortBy(criteria);
  };

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredUsers = filterBlocked ? users.filter(user => user.blocked) : users;

  return (
    <div className={classes.userDetailsContainer}>
      
      <h2>User Details</h2>
      <div className={classes.filters}>
        <button onClick={() => setFilterBlocked(!filterBlocked)}>
          {filterBlocked ? 'Show All Users' : 'Show Blocked Users'}
        </button>
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('email')}>Sort by Email</button>
        <button onClick={() => handleSort('blocked')}>Sort by Blocked Status</button>
      </div>

      {filteredUsers.length > 0 ? (
        <div className={classes.userCard}>
          {filteredUsers.map((user) => (
            <div key={user.id} className={classes.userInfo}>
              {editingUserId === user.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name || ''}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone || ''}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="address"
                    value={editedUser.address || ''}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleUpdateUser}>Save Changes</button>
                </>
              ) : (
                <>
                  <h3>{user.name || 'N/A'} {user.blocked && <span>(Blocked)</span>}</h3>
                  <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                  <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                </>
              )}

              <div className={classes.adminControls}>
                {editingUserId === user.id ? (
                  <button onClick={() => setEditingUserId(null)}>Cancel Edit</button>
                ) : (
                  <button onClick={() => handleEditClick(user)}>Edit User</button>
                )}
                <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                <button onClick={() => toggleBlockUser(user.id)}>
                  {user.blocked ? 'Unblock User' : 'Block User'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found</p>
      )}
      <Outlet /> {/* This renders child routes if any */}
    </div>
  );
}

export default UserDetails;
