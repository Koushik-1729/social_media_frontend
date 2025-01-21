import React, { useState } from 'react';
import '../App.css';

function UserForm() {
    const [formData, setFormData] = useState({
        name: '',
        handle: '',
        images: [],
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('socialMediaHandle', formData.handle);
        formData.images.forEach((image) => {
            data.append('images', image);
        });

        try {
            const response = await fetch('http://localhost:5000/api/submit', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                setMessage('Submission successful!');
                setFormData({ name: '', handle: '', images: [] }); 
                // const error = await response.json();
                // setMessage(`Error: ${error.message}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('Error submitting form.');
        }
    };

    return (
        <div className='form-container'>
            <h2>User Submission Form</h2>
            <form onSubmit={handleSubmit} className='submission-form'>
                <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type='text'
                    name='handle'
                    placeholder='Social Media Handle'
                    value={formData.handle}
                    onChange={handleChange}
                    required
                />
                <input
                    type='file'
                    name='images'
                    multiple
                    onChange={handleFileChange}
                    required
                />
                <button type='submit'>Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UserForm;
