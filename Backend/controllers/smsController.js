const twilio = require("twilio");

// Load environment variables
const accountSid = process.env.accountSid; // No quotes, fetch from .env
const authToken = process.env.authToken;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

const sendMessBill = async (req, res) => {
    const { phoneNumber, message } = req.body;  // Make sure these are correctly extracted from the request

    try {
        // Send the SMS using Twilio API
        const messageSent = await client.messages.create({
            body: message,       // The message content
            from: +15417597911 , // Replace with your Twilio phone number
            to: phoneNumber      // Ensure this is passed correctly
        });

        console.log('SMS sent:', messageSent.sid);
        return res.json({ success: true });
    } catch (error) {
        console.error('Error sending SMS:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = { sendMessBill };