const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../config');



const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message : 'Unauthorized - Missing or invalid token'});
    } 

    const token = authHeader.split(' ')[1];
       

    try {
        console.log("before: " , token, JWT_SECRET);
        const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
        // console.log("after: " , decoded);

        if(decoded.userId){
            req.userId = decoded.userId; 
            next();
        }
        else{
            return res.status(403).json();
        }

    } catch (error) {
        // console.log("error verfying token: ", error);
        res.status(403).json({message : "Unable to decode the jwt"});
    }
}

module.exports = authMiddleware;

