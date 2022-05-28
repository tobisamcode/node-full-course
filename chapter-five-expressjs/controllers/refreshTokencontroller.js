const userDB = {
      users: require("../model/users.json"),
      setUsers: function(data) {
        this.users = data;
      }
    };
    
    const jwt = require("jsonwebtoken");
    require("dotenv").config();
    
    const handleRefreshToken = (req, res) => {
      const cookies = req.cookies
      if (!cookies?.jwt)
        return res
          .status(401);
      console.log(cookies.jwt);

      const refreshToken = cookies.jwt;
      const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    
      if (!foundUser) return res.sendStatus(403); // Forbidden
    
      // evaluate password
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        // create JWTs
        const accessToken = jwt.sign(
          { username: foundUser.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
    
        // saving refresh token with the current user
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        userDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
           path.join(__dirname, '..', 'model', 'users.json'),
           JSON.stringify(userDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 *60 * 1000 })
        res.json({ accessToken });
      } else {
        res.sendStatus(401); // unauthorized
      }
    };
    
    module.exports = { handleLogin };
    