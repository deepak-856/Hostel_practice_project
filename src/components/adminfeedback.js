import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/noteContext'


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
        <div>Feedback</div>
    )
}

export default AdminFeedback