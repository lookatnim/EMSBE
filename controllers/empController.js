const EmpModel = require("../models/empModel");

const getEmp = async (req, res) => {
  try {
    const employees = await EmpModel.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addEmp = async (req, res) => {
  try {
    const employee = new EmpModel(req.body);
    await employee.save();
    res.status(201).json({ message: "Employee added successfull" });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const messages = [];
      for (let field in error.errors) {
        switch (field) {
            case "phoneNumber":
              messages.push("Invalid Mobile Number.");
              break;
            case "firstName":
              messages.push("Invalid First Name.");
              break;
            case "lastName":
              messages.push("Invalid Last Name.");
              break;
            case "email":
              messages.push("Invalid Email Name.");
              break;
            case "gender":
              messages.push("Invalid Gender.");
              break;
            default:
              messages.push(error.errors[field].message);
          }
      }
      res.status(400).json({ message: messages.join(", ") });
    } else if (error.code === 11000 && error.keyPattern && error.keyValue) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists`,
      });
    } else {
      console.log(error);
      res
        .status(500)
        .json({ message: `Internal Server Error: ${error.message}` });
    }
  }
};

const updateEmp = async () => {
  console.log("under dev");
};

const deleteEmp = () => {
  console.log("deleting......");
};

module.exports = { getEmp, addEmp, updateEmp, deleteEmp };
