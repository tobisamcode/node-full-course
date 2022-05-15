const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require("path");