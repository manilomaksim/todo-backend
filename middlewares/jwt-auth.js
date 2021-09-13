const jwt = require("express-jwt");
require("dotenv").config();

module.exports = jwt({
    secret: process.env.RSA_PRIVATE_KEY,
    algorithms: ['HS256'],
    getToken: (req) => {
        const { authorization } = req.headers;
        const [type, token] = (authorization || []).split(' ');

        return authorization && type === 'Bearer' ? token : null;
    }
})


