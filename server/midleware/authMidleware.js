const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb'); // ⬅️ Import ObjectId

function verfiyToken(req,res,next){
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);//undefine

    if(!authHeader){
        return res.status(404).json({message:'Authorization header is missing'});
    }
    // console.log('authhead ',authHeader);
    
    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(404).json({message:'Token is missing'});
    }

    
    try{
        // const key = 'user_token'
        const decode = jwt.verify(token,'user_token');
        if(decode.userId){
            decode.userId = new ObjectId(decode.userId);
        }
        req.user = decode; 
        // console.log(req.user);
        next();
    }catch(err){
        console.log('JWT verify failed ',err.message);
        
        return res.status(403).json({message:'token is expire'});
    }
}


module.exports = verfiyToken;