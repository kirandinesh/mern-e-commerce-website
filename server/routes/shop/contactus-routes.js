const express = require("express");
const {
  addNewMessage,
  getAllInboxMessage,
} = require("../../controllers/shop/contactUs-controller");
const router = express.Router();

router.post("/addnewmessage", addNewMessage);
router.get("/getallinboxmessage", getAllInboxMessage);

module.exports = router;
