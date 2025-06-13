const jwt=require('jsonwebtoken')
require("dotenv").config()
const auth = (req, res, next) => {
    const white_list = ['/', '/login', '/createuser'];
    
    // Fix req.originalUrl typo
    if (white_list.find(item => '/v1/api' + item === req.originalUrl)) {
        next();
        return;
    } 
    else{
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]; // Corrected 'split' method
            //  check token
            try{
                const decode=jwt.verify(token,process.env.JWT_key)
                req.user={
                    name:decode.name,
                    age:decode.age,
                    createBy:"tammoi"
                }
                console.log("check moimoi",decode)
                 next(); // Add next() to continue the request if token exists
            }
            catch(e)
            {
                return res.status(401).json({
                    message:"Token hết hạn"
                })
            }
         
        } else {
            return res.status(401).json({
                message: "Chưa truyền token"
            });
        }
    }

};

module.exports = auth;
