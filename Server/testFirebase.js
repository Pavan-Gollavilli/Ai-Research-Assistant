const { getApp } = require("firebase-admin/app");

require("./config/firebaseAdmin");

const app = getApp();

console.log("✅ Firebase Project:", app.options.credential.projectId);