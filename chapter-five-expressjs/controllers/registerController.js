const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require("path");
const bcrypt = require('bcrypt');

const handlerNewUser = async(req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(404).json({ "message": "username and password are required." })
        // check for duplicate username in the db
    const duplicate = usersDB.users.find(person => person.username === user);

}