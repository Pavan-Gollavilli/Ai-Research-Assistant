const User = require("../models/User");

const loadUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      firebaseUID: req.firebaseUser.uid,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sync your account first.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Load User Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to load user.",
    });
  }
};

module.exports = loadUser;