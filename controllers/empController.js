const EmpModel = require("../models/empModel");

const handleValidationError = (error, res) => {
  const messages = [];
  for (const field in error.errors) {
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
};

const getEmp = async (req, res) => {
  try {
    const employees = await EmpModel.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const addEmp = async (req, res) => {
  try {
    const employee = new EmpModel(req.body);
    await employee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    if (error.name === "ValidationError") {
      handleValidationError(error, res);
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ message: `${field} already exists` });
    } else {
      res
        .status(500)
        .json({ message: `Internal Server Error: ${error.message}` });
    }
  }
};

const updateEmp = async (req, res) => {
  try {
    const { empid } = req.params;
    const updateData = req.body;
    const updatedEmployee = await EmpModel.findByIdAndUpdate(
      empid,
      updateData,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    if (error.name === "ValidationError") {
      handleValidationError(error, res);
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ message: `${field} already exists` });
    } else {
      res
        .status(500)
        .json({ message: `Internal Server Error: ${error.message}` });
    }
  }
};

const deleteEmp = async (req, res) => {
  try {
    const { empid } = req.params;
    const deletedEmployee = await EmpModel.findByIdAndDelete(empid);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

module.exports = { getEmp, addEmp, updateEmp, deleteEmp };
