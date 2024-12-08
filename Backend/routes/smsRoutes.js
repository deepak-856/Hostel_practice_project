const express = require("express");
const { sendMessBill } = require("../controllers/smsController");

const router = express.Router();

router.post("/send-mess-bill", sendMessBill);

module.exports = router;