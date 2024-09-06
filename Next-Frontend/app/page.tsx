"use client";

import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<{ name: string; email: string }>({
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:44358/api/Users');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('Invalid JSON data');
        }
      } catch (error: any) {
        console.error('Error fetching users:', error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://localhost:44358/api/Users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error: any) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setUpdatedUser({ ...user });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsAddUserModalOpen(false); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedUser) {
      setUpdatedUser({ ...updatedUser, [name]: value });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedUser) {
      try {
        const response = await fetch(`https://localhost:44358/api/Users/${updatedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
          throw new Error('Failed to update user');
        }

        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setIsModalOpen(false);
      } catch (error: any) {
        console.error('Error updating user:', error);
        setError(error.message);
      }
    }
  };

  const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:44358/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setIsAddUserModalOpen(false);
    } catch (error: any) {
      console.error('Error adding user:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => setIsAddUserModalOpen(true)} className="add-user-button">
        Add User
      </button>
      {error && <p>Error: {error}</p>}
      
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(user)} 
                    className="action-button edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="action-button delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit User Modal Pop Up*/}
      {isModalOpen && selectedUser && updatedUser && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Edit User</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedUser.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUser.email || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Update User
              </button>
              <button type="button" onClick={handleModalClose} className="cancel-button">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal Pop Up*/}
      {isAddUserModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Add User</h2>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleAddUserChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleAddUserChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Add User
              </button>
              <button type="button" onClick={handleModalClose} className="cancel-button">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
