const mongoose = require("../dataBase/index-db.js")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String, // tipo
        require: true, // obrigatória
    },
    email: {
        type: String,
        unique: true, // unica
        required: true, 
        lowercase : true, // forçando ser caixa baixa 
    },
    password: {
        type:String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password,10) // numero de rouds para uma incriptação forte
    this.password = hash

    next()
})

const User = mongoose.model('User', userSchema)



module.exports = User