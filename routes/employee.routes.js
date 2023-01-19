module.exports = app => {
    const employee = require("../controllers/employee.controller")
    var router = require("express").Router()

    router.post("/", employee.create)
    router.get("/", employee.findAll)
    router.get("/:id", employee.findOne)
    router.put("/:id", employee.update)
    router.delete("/:id", employee.delete)
    router.delete("/", employee.deleteAll)

    app.use('/api/employees', router);
}
