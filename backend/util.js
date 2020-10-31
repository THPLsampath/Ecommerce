import jwt, { decode } from 'jsonwebtoken';
import config from './config';


const getToken = (user) => {
    return jwt.sign({ user }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}
if (getToken) {
    console.log("getToken successfull");
} else {
    console.log("wede hikuwa");
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: 'invalid token' });
            }
            req.user = token;
            next()
            return
        });
    }
    return res.status(401).send({ msg: "token is not supplied" })
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: 'admin token is not valid' });
}
export {
    getToken, isAuth, isAdmin
}