const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

function authMiddleware(req, res, next) {


  
  jwt.verify(req.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = decoded; 
    next();             
  });
}

module.exports = { authMiddleware };
