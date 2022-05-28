const userDB = {
      users: require("../model/users.json"),
      setUsers: function(data) {
        this.users = data;
      }
    };
    
    const jwt = require("jsonwebtoken");
    require("dotenv").config();

    const fsPromises = require('fs').promises;
    const path = require('path');
    
    const handleLogout = (req, res) => {
      // On client, also delete the accessToken


      const cookies = req.cookies
      if (!cookies)
        return res
          .sendStatus(204); // no content

      const refreshToken = cookies.jwt;
      const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    
      if (!foundUser) return res.sendStatus(403); // Forbidden
    
      // evaluate JWT
      jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                  if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                  const accessToken = jwt.sign(
                        { "username": decoded.username },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30s' }
                  );
                  res.json({ accessToken }) 
            }
      );
        // create JWTs
       
    };
    
    module.exports = { handleRefreshToken }