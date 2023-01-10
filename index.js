const express = require("express") // Express is for building the Rest apis
const cors = require("cors") // cors provides Express middleware to enable CORS with various options.
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
 
const app = express()
const corsOptions = {
  origin: [ "https://mongo-api-ote9.onrender.com","http://localhost:4200","*","https://app.netlify.com/sites/bejewelled-scone-8c79f5"]
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = require("./models/server")
const drUrl = require("./configs/db.config")
mongoose.connect(drUrl.url, 
  {useNewUrlParser: true}).then(() => {
  console.log("Connected to the database")
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit()
});

// Default route
app.get("/", (req, res) => {
  res.json({message: "Welcome to Express MongoDB application."})
})

require("./routes/employee.routes")(app)

// Set port and listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})
