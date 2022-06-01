const userDB = {
  users: require("../model/users.json"),
  setUsers: function(data) {
    this.users = data;
  }
};
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(404)
      .json({ message: "username and password are required." });

  const foundUser = userDB.users.find(person => person.username === user);

  if (!foundUser) return res.sendStatus(401); // unauthourized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s"
      }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // saving refresh token with the current user
    const otherUsers = userDB.users.filter(
      person => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: "true",
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401); // unauthorized
  }
};

module.exports = { handleLogin };
