module.exports = app => {
    const user = require("../controllers/users.controller")
    const router = require("express").Router()

    //Get all users
    router.get("/", user.findAll)

    // Create a new user
    router.post("/", user.create)

    // Get a single user with id
    router.get("/:id", user.findOne)

    // Update a user with id
    router.put("/:id", user.update)

    // Delete a user with id
    router.delete("/:id", user.delete)

    app.use("/api/users", router)
}