const userDB = {
  users: require("../model/users.json"),
  setUsers: function(data) {
    this.users = data;
  }
};
