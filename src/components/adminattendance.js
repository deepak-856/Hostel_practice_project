// import React from 'react'

// export const Adminattendance = () => {
//   return (
//     <div>Adminattendance</div>
//   )
// }




import React, { useState, useEffect } from "react";
import axios from "axios";
// import './adminattendence.css';

const AdminAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const markAttendance = async () => {
    if (!studentId || !date || !status) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    try {
      const payload = { studentId, date, status };
      console.log('Sending payload:', payload); // Log the payload being sent
      await axios.post('http://localhost:5000/api/attendence/mark', payload);
      alert('Attendance marked successfully');
    } catch (err) {
      console.error('Error marking attendance:', err.response || err);
      alert(err.response?.data?.error || 'Error marking attendance');
    }
  };



  const fetchAttendance = async () => {
    const res = await axios.get(`http://localhost:5000/api/attendence/${studentId}`);
    setAttendance(res.data);
  };

  useEffect(() => {
    fetchAttendance();
  }, [studentId]);

  return (
    <div className="background-container-attendance">
    <div className="attend-main">
      <h2>Attendance</h2>
      <label>
        Student ID:
        <input value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      </label>
      <label>
        Date:
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Status:
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </label>
      <button className="mark-attend-button" onClick={markAttendance}>Mark Attendance</button>
      <ul>
        {attendance.map((record) => (
          <li key={record.id}>
            {record.date}: {record.status}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AdminAttendance;
