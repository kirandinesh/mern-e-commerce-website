const express = require("express");
const AddressController = require("../../controllers/shop/address-controllers");
const router = express.Router();

router.post("/add", AddressController.addAddress);
router.get("/get/:userId", AddressController.fetchAllAddress);
router.delete("/delete/:userId/:addressId", AddressController.deleteAddress);
router.put("/update/:userId/:addressId", AddressController.editAddress);

module.exports = router;
