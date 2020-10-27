const express = require ("express")
const bcrypt = require ("bcryptjs")
const jwt = require ("jsonwebtoken")

const authConfig = require("../config/auth.json")
const User = require("../models/user")

const router = express.Router()


function generateToken(params = {}){
    return jwt.sign({params}, authConfig.secret, {
        expiresIn:86400
})

}


router.post("/register", async(req,res)=>{
const {email} = req.body

    try {
        if ( await User.findOne({ email }))
            return res.status(400).send({error: "User alredy exists"})

        const user = await User.create(req.body) // await espera para continuar 

        user.password = undefined

        return res.send({
            user,
            token:generateToken({ id: user.id})
        })

    } catch (err){
        return res.status(400).send({ error: "registration failed"})
    }
})

router.post("/authenticate", async (req,res) =>{
    const { email, password} = req.body

    const user = await User.findOne({ email }).select("+password") // confirmar se o password é realmente do usuário

    if(!user)
        return res.status(400).send({error: "User not found"})

    if(!await bcrypt.compare(password, user.password)) // comparando se a senha do login é a mesma que está no banco de dados
        return res.status(400).send({ error: "Invalid password"})

    user.password = undefined

    // const token = jwt.sign({id: user.id}, authConfig.secret, {
    //     expiresIn:86400
    // })

    res.send({
        user,
        token: generateToken({ id: user.id})
    })
})

module.exports = app => app.use("/auth",router)