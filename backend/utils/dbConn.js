const mongoose = require('mongoose');

const dbConn = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log("DB failed " + err))
}

module.exports = dbConn;