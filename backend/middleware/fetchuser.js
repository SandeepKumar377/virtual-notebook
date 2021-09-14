let jwt = require('jsonwebtoken');
const JWT_SECRET = 'sandeepkumar$sk';

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate valid token" })
    }
}

module.exports = fetchuser;