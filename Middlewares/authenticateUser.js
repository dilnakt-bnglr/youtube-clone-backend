import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  // Getting the authorization header from request
  const authHeader = req.headers["authorization"];
  // Taking the token from the Authorization header
  const token = authHeader && authHeader.split(" ")[1];
  // Verify token using the secret key  appending the data object to request
  jwt.verify(token, "secretKey", (err, data) => {
    // Error handling if jwt token invalid
    if (err) {
      return res.status(401).json({ message: "Inavlid JWT Token" });
    }
    // Appending the user data object to request
    req.user = data;
    next();
  });
}
