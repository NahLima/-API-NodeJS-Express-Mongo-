const express = require("express") // serve para fazer as tratativas de rotas e requests HTTP
const bodyParser = require("body-parser") // fazer com que o node entenda as informações em Json e que ele tbm entenda as requisições enviados através da url



const app = express()

app.use(bodyParser.json()) // pra ele entender que quando enviar um requisição Api via Json
app.use(bodyParser.urlencoded({ extended: false }))// pra entender quando passar parametros via url -- decodar esse parametro

// app.get("/",(request,response) => {  // foi para teste de servidor
//     response.send("Servidor funcionando")
// })

require("./controller/authController")(app)

app.listen(3001)

