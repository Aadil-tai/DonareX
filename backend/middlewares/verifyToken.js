const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.adminToken

    if (!token) {
        return res.status(401).json({ message: "Unauthorized : No token" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = verifyToken