const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const verifyJWT = (req,res,next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jwt.verify(req.headers.authorization.split(' ')[1],process.env.API_SECRET,(err,decoded)=>{
            if(err){
                req.user = undefined
                next()
            }
            User.findOne({
                _id: decoded.id
            }).then((user)=>{
                req.user = user
                next()
            }).catch((err)=>{
                res.status(500).send({
                    message: err
                })
            })
        })
    }else{
        req.user = undefined
        req.message = 'Auth header not found'
        next()
    }
}

module.exports = verifyJWT