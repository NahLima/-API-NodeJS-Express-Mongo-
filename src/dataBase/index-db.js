// const mongoose = require("mongoose")

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/noderest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;

// mongoose.connect('mongodb://localhost/noderest') // conecta ao banco de dados 
// mongoose.createConnection('mongodb://localhost/noderest', { useUnifiedTopology: true }); //useNewUrlParser: true 
// mongoose.Promise = global.Promise

// module.exports = mongoose
