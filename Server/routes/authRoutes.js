const express = require("express");

const router = express.Router();

const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");
const loadUser = require("../middleware/loadUser");

const {
  syncUser,
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controllers/authController");

/**
 * ===========================================
 * Authentication Routes
 * ===========================================
 */

// Sync Firebase User (First Login)
router.post(
  "/sync-user",
  verifyFirebaseToken,
  syncUser
);

// Get Current User
router.get(
  "/profile",
  verifyFirebaseToken,
  loadUser,
  getProfile
);

// Update Profile
router.put(
  "/profile",
  verifyFirebaseToken,
  loadUser,
  updateProfile
);

// Delete Account
router.delete(
  "/profile",
  verifyFirebaseToken,
  loadUser,
  deleteAccount
);

module.exports = router;