const dbConfig = require("../configs/db.config")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.url = require("./employee.models")(mongoose)

const userdb = {}
userdb.mongoose = mongoose
userdb.url = dbConfig.url
userdb.url = require("./user.models")(mongoose)
module.exports = userdb

module.exports = db