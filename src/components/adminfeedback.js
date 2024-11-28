import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/noteContext'
import './adminfeedback.css';


const AdminFeedback = () => {
    const { state, dispatch } = useContext(noteContext);
    const [feedback, setFeedback] = useState([]);


    const navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem('admintoken')) {
            dothis()
            getalldata()
        } else {
            dothis()
            navigate("/adminsignin")
        }

    }, []);
    function dothis() {
        dispatch({ type: 'UPDATE_VALUE', payload: false });
        dispatch({ type: 'UPDATE_AVALUE', payload: true });
    }
    const getalldata = async (e) => {
        const response = await fetch(`http://${state.backend}:${state.port}/api/f/feedback`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('admintoken')
            },

        });
        let data = await response.json();
        // console.log('Data', data.feedbacks)
        setFeedback(data.feedbacks)

    }

    return (
        <div className='body'>
            <div className="admin-feedbacks-container">
                <h2>User Feedbacks</h2>
                {/* {error && <p className="error-message">{error}</p>}
            {feedbacks.length === 0 && !error ? (
                <p>No feedbacks available.</p>
            ) : ( */}
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedback.map((feedback, index) => (
                            <tr key={feedback._id}>
                                <td>{index + 1}</td>
                                <td>{feedback.name}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.title || 'N/A'}</td>
                                <td>{feedback.message}</td>
                                <td>{new Date(feedback.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* )} */}
            </div>
        </div>

    )
}

export default AdminFeedback