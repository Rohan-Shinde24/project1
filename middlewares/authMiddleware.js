const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

function authMiddleware(req, res, next) {
 try{
     const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded; 
    next();
  });
}
 catch (error) {
  return res.status(500).json({ message: "Internal server error", error });
}
}

function adminMiddleware(req, res, next) {
  try{
      
    const role = req.user.role;

    if ( role !== 'admin') {
      return res.status(401).json({ message: "only admin can access " });
    }
      next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }

}

module.exports = {
  authMiddleware,
  adminMiddleware
};
