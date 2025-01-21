import React, { useState, useEffect } from 'react';
import '../App.css';

function AdminDashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                console.log(data); 
                setSubmissions(data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSubmissions();
    }, []);

    return (
        <div className='dashboard-container'>
            <h2>Admin Dashboard</h2>
            {loading ? (
                <p>Loading submissions...</p>
            ) : (
                <div className='submissions'>
                    {submissions.length === 0 ? (
                        <p>No submissions yet.</p>
                    ) : (
                        submissions.map((submission, index) => (
                            <div key={index} className='submission-card'>
                                <p><strong>Name:</strong> {submission.name}</p>
                                <p><strong>Handle:</strong> {submission.socialMediaHandle}</p> {/* Updated handle field */}
                                <div className='images'>
                                    {submission.images.map((image, idx) => (
                                        <img
                                            key={idx}
                                            src={`http://localhost:5000${image}`} // Corrected src URL
                                            alt={`Uploaded by ${submission.name}`}
                                            className='thumbnail'
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
