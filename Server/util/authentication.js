const jwt = require("jsonwebtoken");
const User = require("../models/profile.model");
require("dotenv").config();
const KEY = process.env.HASHKEY;
const TOKEN_EXPIRATION_TIME = process.env.EXPIRATION;
const jwtHeader = { algorithm: "HS256" };

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        let expirationTime = Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXPIRATION_TIME);

        try {
            const decodedToken = jwt.verify(token, KEY, jwtHeader);
            let userCheck = await User.findOne({
                name: decodedToken.username,
            });
            if (userCheck !== null) {
                let payload = {
                    username: decodedToken.username,
                    exp: expirationTime,
                };
                const newToken = jwt.sign(payload, KEY, jwtHeader);
                res.setHeader("Authorization", `Bearer ${newToken}`);
                req.newToken = newToken;
                req.recipecreator = { _id: userCheck._id, name: userCheck.name }
                req.user = decodedToken.username;

                next();
            } else {
                res.status(401).json({ message: "Nutzer nicht erkannt" });
            }
        } catch (error) {
            console.error("Token-Überprüfung fehlgeschlagen:", error.message);
            res.status(401).json({ message: "Kein gültiger Token / Session abgelaufen" });
        }
    } else {
        res.status(401).json({ message: "Nicht eingeloggt" });
    }
};

module.exports = {
    authenticateJWT,
};