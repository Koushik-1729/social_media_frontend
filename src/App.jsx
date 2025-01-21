import React, { useState } from 'react';
import UserForm from '../src/components/userSubbmissionaForm';
import AdminDashboard from '../src/components/AdminDashboard';
import './App.css';

function App() {
    const [submissions, setSubmissions] = useState([]);

    const handleFormSubmit = (formData) => {
        setSubmissions((prevSubmissions) => [...prevSubmissions, formData]);
    };

    return (
        <div className='app'>
            <h1>Social Media Task</h1>
            <UserForm onSubmit={handleFormSubmit} />
            <AdminDashboard submissions={submissions} />
        </div>
    );
}

export default App;
