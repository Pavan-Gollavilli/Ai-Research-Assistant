const auth = require("../config/firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing.",
      });
    }

    const idToken = authHeader.split(" ")[1];

    const decodedToken = await auth.verifyIdToken(idToken);

    req.firebaseUser = decodedToken;

    next();
    } catch (error) {

    console.log("\n========== FIREBASE AUTH ERROR ==========");
    console.log("Message :", error.message);
    console.log("Code    :", error.code);
    console.log("Error   :", error);
    console.log("=========================================\n");

    return res.status(401).json({
        success: false,
        message: "Invalid or expired Firebase token.",
    });

    }
};

module.exports = verifyFirebaseToken;