require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  const { username, email, password } = JSON.parse(event.body);
  const adminUsername = username || email;

  if (
    adminUsername === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate a JWT token
    const token = jwt.sign(
      { username: adminUsername, role: "admin" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful",
        token,
      }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }
};
