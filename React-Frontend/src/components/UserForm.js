import React, { useState, useEffect } from 'react';
import { createUser, updateUser, getUsers } from '../api/api';
import './style.css';
const UserForm = ({ userId, onUserUpdated }) => {
    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                const response = await getUsers(userId);
                setUser(response.data);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userId) {
                await updateUser(userId, user);
            } else {
                await createUser(user);
            }
            onUserUpdated();
            setUser({ name: '', email: '' });
        } catch (error) {
            console.error('Error saving user', error);
        }
    };

    return (
        <div className="update-form">
            <div className="container">
             
                        <form onSubmit={handleSubmit}>
                            <h1>Add User Detail</h1>
                            <div className="input-group">
                                <input
                                   type="text"
                                   name="name"
                                   value={user.name}
                                   onChange={handleChange}
                                   placeholder="Name"
                                    required="required"
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required="required"
                                />
                            </div>
                            <button type="submit">submit</button>
                        </form>
                        
                    </div>
                </div>
             
        
    );
    };
export default UserForm;
