import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentAttendance.css"; // Importing the CSS file for styling

const StudentAttendance = () => {
  const [studentId, setStudentId] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPresents, setTotalPresents] = useState(0);
  const [messBill, setMessBill] = useState(0);

  // Fetch attendance for the student
  const fetchAttendance = async () => {
    if (!studentId) {
      setError("Please enter a valid Student ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/attendence/${studentId}`);
      const attendanceData = res.data; // Set fetched attendance data

      // Filter out only "Present" status and count them
      const presentCount = attendanceData.filter(record => record.status === 'Present').length;
      setTotalPresents(presentCount);

      // Calculate mess bill (total present days * 80)
      const calculatedMessBill = presentCount * 80;
      setMessBill(calculatedMessBill);

      setAttendance(attendanceData); // Set full attendance data
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Error fetching attendance records. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (studentId) {
      fetchAttendance(); // Fetch attendance when studentId is available
    }
  }, [studentId]);

  return (
    <div className="background-container-attendance">
    <div className="attendance-container">
      <h2 className="title">Student Attendance</h2>

      {/* Input for Student ID */}
      <div className="input-section">
        <label className="input-label">
          Enter Student ID:
          <input
            className="input-field"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <button className="fetch-button" onClick={fetchAttendance} disabled={loading}>
          {loading ? "Loading..." : "Fetch Attendance"}
        </button>
      </div>

      {/* Error handling */}
      {error && <p className="error-text">{error}</p>}

      {/* Displaying Total Presents */}
      {attendance.length > 0 && !loading && (
        <div className="attendance-summary">
          <p>Total Presents: <strong>{totalPresents}</strong></p>
          <p>Total Mess Bill: <strong>₹{messBill}</strong></p>
        </div>
      )}

      {/* If no records found */}
      {attendance.length === 0 && !loading && <p className="no-records">No attendance records found.</p>}
    </div>
    </div>
  );
};

export default StudentAttendance;
