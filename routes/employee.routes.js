module.exports = app => {
    const employee = require("../Controllers/employee.controller")
    var router = require("express").Router()

    router.post("/", employee.create)
    router.get("/", employee.findAll)
    router.get("/:id", employee.findOne)
    router.patch("/:id", employee.update)
    router.delete("/:id", employee.delete)
    router.delete("/", employee.deleteAll)

    app.use('/api/employees', router);
}