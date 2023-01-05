const db = require("../Models/employee.models")
const Employee = require("../Models/employee.models")

// Create and save a new employee
exports.create = async (req, res) => {
    // Validate request
  if (!req.body.firstname && !req.body.lastname && !req.body.email && !req.body.address && !req.body.phone && !req.body.profilepic) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create an Employee
  const employee = new Employee({
    profilepic: req.body.profilepic,
    fullname: req.body.fullname,
    jobtitle: req.body.jobtitle,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    department: req.body.department,
  });

  // Save Employee in the database
  await employee.save(employee).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    });
}

// Retrieve all employees from the database
exports.findAll = (req, res) => {
    const lastname = req.query.lastname;
  var condition = lastname ? { lastname: { $regex: new RegExp(lastname), $options: "i" } } : {};

  Employee.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
}

// Find a single employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Employee.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Employee with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Employee with id=" + id });
    });
}

// Upddate an employee by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update cannot be empty!"
        });
      }
    
      const id = req.params.id;
    
      Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
            });
          } else res.send({ message: "Employee was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Employee with id=" + id
          });
        });
}

// Delete an employee with the sopecified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Employee.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      } else {
        res.send({
          message: "Employee was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
}

// Delete all employees from the database
exports.deleteAll = (req, res) => {
    Employee.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Employee were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    });
}