
import axios from 'axios';

const API_URL = 'https://localhost:44358/api/Users';  

// Fetch all users
export const getUsers = async () => {
    return await axios.get(API_URL);
};

// Add a new user
export const createUser = async (user) => {
    return await axios.post(API_URL, user);
};

// Delete a user
export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

// Update a user
export const updateUser = async (id, updatedUserData) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
