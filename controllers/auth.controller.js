exports.singup = (req, res, next) => {
  UserModel.register(req.body, req.body.password)
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));
};

exports.logout = (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: "Logged out" });
};
