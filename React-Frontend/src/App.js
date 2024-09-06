import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleUserUpdated = () => {
        setSelectedUserId(null);
    };

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">User List</Link>
                        </li>
                        <li>
                            <Link to="/create">Create User</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route
                        path="/"
                        element={<UserList setSelectedUserId={setSelectedUserId} />}
                    />
                    <Route
                        path="/create"
                        element={<UserForm userId={selectedUserId} onUserUpdated={handleUserUpdated} />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<UserForm userId={selectedUserId} onUserUpdated={handleUserUpdated} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
