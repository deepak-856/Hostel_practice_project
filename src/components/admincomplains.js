// import React from 'react'

// export const Admincomplains = () => {
//   return (
//     <div>Admincomplains
//       {/* <h1>Admin Dashboard</h1>
//       <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 {user.attendance.map((record, index) => (
//                   <div key={index}>
//                     {record.date.split('T')[0]}: {record.status}
//                   </div>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//     </div>
//   )
// }
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noteContext from '../context/noteContext'

export const Admincomplains = () => {
  const [complaints, setComplaints] = useState([]);

  // useEffect(() => {
  //   const fetchComplaints = async () => {
  //     try {
  //       console.log("Fetching")
  //       const res = await axios.get("http://localhost:5000/api/ad/allcomplains");
  //       setComplaints(res.data);
  //       console.log(`Complains: ${complaints}`)
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchComplaints();
  // }, []);

  const { state, dispatch } = useContext(noteContext);


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
    const response = await fetch(`http://${state.backend}:${state.port}/api/ad/allcomplains`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('admintoken')
      },

    });
    let data = await response.json();
    console.log('Data', data.allcomps)
    setComplaints(data.allcomps)
  }


  return (
    <div className="background-container">
    <div className="bg-white p-4 rounded-lg">
      <h1>Admin Complaint Dashboard</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Room Number</th>
            <th>Category</th>
            <th>Status</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.name}</td>
              <td>{complaint.room_no}</td>
              <td>{complaint.catagory}</td>
              <td>{complaint.status}</td>
              <td>{complaint.description}</td>
              <td>{new Date(complaint.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Admincomplains;
