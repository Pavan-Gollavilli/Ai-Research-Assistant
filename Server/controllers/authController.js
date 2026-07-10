const User = require("../models/User");
const auth = require("../config/firebaseAdmin");

/**
 * ==========================================
 * Sync Firebase User
 * POST /api/auth/sync-user
 * ==========================================
 */
const syncUser = async (req, res) => {
  try {
    const firebaseUser = req.firebaseUser;

    let user = await User.findOne({
      firebaseUID: firebaseUser.uid,
    });

    // First Login
    if (!user) {
      user = await User.create({
        firebaseUID: firebaseUser.uid,
        name: firebaseUser.name || "User",
        email: firebaseUser.email,
        photoURL: firebaseUser.picture || "",
        provider: firebaseUser.firebase.sign_in_provider,
        emailVerified: firebaseUser.email_verified,
        lastLogin: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: user,
      });
    }

    // Existing User
    user.name = firebaseUser.name || user.name;
    user.email = firebaseUser.email || user.email;
    user.photoURL = firebaseUser.picture || user.photoURL;
    user.provider = firebaseUser.firebase.sign_in_provider;
    user.emailVerified = firebaseUser.email_verified;
    user.lastLogin = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User synchronized successfully.",
      data: user,
    });

  } catch (error) {
    console.error("Sync User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to synchronize user.",
    });
  }
};

/**
 * ==========================================
 * Get Current User Profile
 * GET /api/auth/profile
 * ==========================================
 */
const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};

/**
 * ==========================================
 * Update Profile
 * PUT /api/auth/profile
 * ==========================================
 */
const updateProfile = async (req, res) => {
  try {
    const { name, photoURL } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (name) user.name = name;
    if (photoURL) user.photoURL = photoURL;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: user,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};

/**
 * ==========================================
 * Delete Account
 * DELETE /api/auth/profile
 * ==========================================
 */
const deleteAccount = async (req, res) => {
  try {
    // Delete MongoDB user
    await User.findByIdAndDelete(req.user._id);

    // Delete Firebase account
    await auth.deleteUser(req.firebaseUser.uid);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete account.",
    });
  }
};

module.exports = {
  syncUser,
  getProfile,
  updateProfile,
  deleteAccount,
};