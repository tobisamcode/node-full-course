const data = {
    employees: require('../model/employees.json'),
    setEmployees: function(data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({
            "message": "First and last names are required."
        })
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}


const updateNewEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found.` })
    }
    if (res.body.firstname) employee.firstname = req.body.firstname;
    if (res.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.join(data.employees);
}

const deleteEmployee = (req, res) => {
    res.json({
        "id": req.body.id
    })
}

const getEmployee = (req, res) => {
    res.json({
        "id": req.params.id
    })
}


module.exports = { getAllEmployees, getEmployee, createNewEmployee, updateNewEmployee, deleteEmployee }