import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../api/api';
import './style.css';  

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleUpdate = (user) => {
        setEditingUser(user);
        setUpdatedName(user.name);
        setUpdatedEmail(user.email);
    };

    const handleSubmitUpdate = async () => {
        try {
            const updatedUser = {
                ...editingUser,
                name: updatedName,
                email: updatedEmail
            };
            await updateUser(editingUser.id, updatedUser);
            fetchUsers();
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    return (
        <div className="container">
            <h2>All Users</h2>
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <table className="table">
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
                                        className="button button-delete"
                                        onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </button>
                                    <button
                                        className="button button-update"
                                        onClick={() => handleUpdate(user)}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingUser && (
                <div className="update-form">
                    <h3>Update User</h3>
                    <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <button onClick={handleSubmitUpdate}>Submit Update</button>
                </div>
            )}
        </div>
    );
};

export default UserList;
