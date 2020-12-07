exports.isAuth = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
};

exports.catchErrs = (func) => (req, res) => func(req, res).catch(next);
