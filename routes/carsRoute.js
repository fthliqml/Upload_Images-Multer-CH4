const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");
const upload = require("../middlewares/uploader");

// Cars API

// Upload with file max to 4 file
router.post("/", upload.array("images", 4), carController.createCar);
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.delete("/:id", carController.deleteCarById);
router.patch("/:id", carController.updateCar);

module.exports = router;
