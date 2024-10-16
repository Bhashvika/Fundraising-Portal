import jwt from 'jsonwebtoken';

// Middleware to authenticate user
export const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

  if (!token) {
    return res.status(403).json({ success: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token.' });
    }
    req.user = user; // Attach user to the request
    next(); // Proceed to the next middleware/route handler
  });
};
