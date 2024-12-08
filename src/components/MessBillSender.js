import React, { useState } from "react";

const MessBillSender = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [messBill, setMessBill] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const sendMessBill = async () => {
        try {
            // Create a formatted message with the mess bill
            const message = `Your mess bill is: ${messBill} INR.`;

            const response = await fetch("http://localhost:5000/api/send-mess-bill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber, message }), // Send message instead of messBill
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.error || "Failed to send mess bill");
            }
        } catch (error) {
            setResponseMessage("Error sending mess bill");
        }
    };

    return (
        <div className="center-container">
  <div className="mess-bill-container">
    <h2 className="mess-bill-title">Send Mess Bill</h2>
    <div className="mess-bill-input-group">
      <label>Phone Number:</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
        className="mess-bill-input"
      />
    </div>
    <div className="mess-bill-input-group">
      <label>Mess Bill Amount:</label>
      <input
        type="number"
        value={messBill}
        onChange={(e) => setMessBill(e.target.value)}
        placeholder="Enter mess bill amount"
        className="mess-bill-input"
      />
    </div>
    <button className="mess-bill-button" onClick={sendMessBill}>
      Send Mess Bill
    </button>
    {responseMessage && (
      <p className="mess-bill-response">{responseMessage}</p>
    )}
  </div>
</div>

      
    );
};

export default MessBillSender;