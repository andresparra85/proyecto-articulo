const user = require("../models").usuarios_model;
module.exports = {
  list(req, res) {
    return user
      .findAll({})
      .then((user) => res.status(200).send(user))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
};
