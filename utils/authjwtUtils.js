const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


function generateToken(user) {

    const token = jwt.sign({ id: user.id ,name: user.name }, process.env.JWT_SECRET,);
    return token;

}

module.exports = { generateToken };
    