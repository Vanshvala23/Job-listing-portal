const express = require("express");
const { getAllUsers, deleteUser, promoteUser, getStats } = require("../controller/adminController");
const adminProtect = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/users", adminProtect, getAllUsers);
router.delete("/user/:id", adminProtect, deleteUser);
router.put("/user/:id/promote", adminProtect, promoteUser);
router.get("/stats", adminProtect, getStats);

module.exports = router;
