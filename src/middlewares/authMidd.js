const jwt = require ("jsonwebtoken")
const authConfig = require("../config/auth.json")





module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader)
    return res.status(401).send({ error: "No token provided"})

 //Bearer ghjhjakse34567876ghjk678090876jnmlkj2hm6jbb8ljh7g --> formato que vamos esperar
    const parts = authHeader.split(' ')

    if(!parts.length === 2)
    return res.status(401).send({ error: "Token error"})

    const [ scheme, token ] = parts // desestrurar para receber o beare e o token 

    if(!/Bearer$/i.test(scheme)) // rejex  -- o i é porque é sensitive
    return res.status(401).send({ error :"Token malformated"})

    jwt.verify(token,authConfig.secret, (err, decoded )=> {
        if(err) return res.status(401).send({ error : "Token invalid"})

        req.userId = decoded.params.id

        //req.useId = decoded.id 
        return next()
        
    })

}