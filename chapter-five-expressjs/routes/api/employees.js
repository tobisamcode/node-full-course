const express = require('express');
const router = express.Router();
const path = require('path');
const employeesController = require("../../controllers/employeesController");




router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateNewEmployee)
    .delete(employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;