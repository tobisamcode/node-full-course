const userDB = {
  users: require("../model/users.json"),
  setUsers: function(data) {
    this.users = data;
  }
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  // is refreshToken in db?
  const foundUser = userDB.users.find(
    person => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: "true"
    });
    return res.sendStatus(204); // no content
  }

  // Delete refreshToken in db
  const otherUsers = userDB.users.filter(
    person => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken };
  userDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204); // no content
};

module.exports = { handleLogout };
