

import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Missing Token" });
    }

    // Extract Bearer Token
    token = token.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;

    next(); // Move to the next middleware if authentication is successful
  } catch (error) {
    console.error(`Authentication failed: ${error.message}`);
    return res.status(401).json({ error: "Unauthorized User" });
  }
};

// DB Change
export default authenticateUser;
