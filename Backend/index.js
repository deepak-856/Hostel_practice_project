require('dotenv').config()
const connectToMongo = require('./db')
const express = require('express')
const multer = require('multer')
const nodemailer = require('nodemailer')
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const smsRoutes = require("./routes/smsRoutes");



connectToMongo();
const app = express()
var cors = require('cors');
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const attendanceRouter = require('./routes/attendence');

app.use(cors({ origin:true, credentials:true }));
app.use(cookieParser());
app.use(bodyParser.json());

// app.use(cors());
const port = 5000
app.use(express.json())

// // Simulate a database
// const users = []; // Replace with your database (e.g., MongoDB)

// // Create a transporter for sending emails
// const transporter = nodemailer.createTransport({
//   service: "Gmail", // Or use another email service
//   auth: {
//       user: "your_email@gmail.com",
//       pass: "your_email_password",
//   },
// });

// // Route to handle forgot password
// app.post("/api/auth/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   // Find user in the database
//   const user = users.find((user) => user.email === email);
//   if (!user) {
//       return res.status(404).json({ message: "User not found." });
//   }

//   // Generate a reset token
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   const hashedToken = await bcrypt.hash(resetToken, 12);
//   user.resetToken = hashedToken;
//   user.tokenExpiry = Date.now() + 3600000; // 1 hour expiry

//   // Send the reset email
//   const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
//   const mailOptions = {
//       from: "your_email@gmail.com",
//       to: user.email,
//       subject: "Password Reset",
//       text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
//   };

//   try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: "Password reset link sent to your email." });
//   } catch (error) {
//       res.status(500).json({ message: "Error sending email. Please try again later." });
//   }
// });

// // Route to handle reset password
// app.post("/api/auth/reset-password/:token", async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   // Find the user with the reset token
//   const user = users.find((user) => bcrypt.compareSync(token, user.resetToken));
//   if (!user || user.tokenExpiry < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired token." });
//   }

//   // Update the user's password
//   user.password = await bcrypt.hash(password, 12);
//   user.resetToken = null;
//   user.tokenExpiry = null;

//   res.status(200).json({ message: "Password updated successfully." });
// });



app.use("/api", smsRoutes);

app.use('/api/auth',require('./routes/auth'))
// app.use('/api/g',require('./routes/gate_stoken'))
app.use('/api/c',require('./routes/complains_route'))
app.use('/api/b',require('./routes/room_allot'))
// app.use('/api/a',require('./routes/attendence'))
app.use('/api/f',require('./routes/feedback'))



app.use('/api/admin_auth',require('./routes/admin_routes/admin_auth'))
app.use('/api/ad',require('./routes/admin_routes/getallusers'))
app.use('/api/ud',require('./routes/admin_routes/updates'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Mess Off Routes
app.use('/api/mess-off', require('./routes/mess-off')); // Add this line
app.use('/api/attendence', attendanceRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');


});


app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})
