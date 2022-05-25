const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data
    }
}

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const {user, password} = req.body;
    if (!user || !password) return res.status(400).json({ 'message': 'username and password are required.'});

    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); // unauthorized
    // evaluate password
    const match = bcrypt.compare(password, foundUser.password);
    if (match) {
        res.json({ 'success': `user ${user} is logged in`});
    } else {
        res.sendStatus(401); //nuauthorized
    }

}