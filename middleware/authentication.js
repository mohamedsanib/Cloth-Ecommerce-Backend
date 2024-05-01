const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const Authentication = (req, res, next)=>{
    const header = req.headers.authorization;

    if(!header || !header.startsWith('Bearer')){
        return res.json({
            msg : "Invalid"
        })
    }

    const token = header.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        req.UserId= decoded.UserId;
        next();

    }catch(err){
        return res.json({
            msg : "Invalid"
        })
    }
}

module.exports = {
    Authentication
}