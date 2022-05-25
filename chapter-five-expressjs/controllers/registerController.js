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
    const duplicate = userDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); // conflict
    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // store the new user
        const newUser = { "username": user, "password": hashedPassword };
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({ "success": `New user ${user} created` })
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}


module.exports = { handlerNewUser };