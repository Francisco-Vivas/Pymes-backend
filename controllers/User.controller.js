const UserModel = require("../models/User.model");

exports.editUser = async (req, res) => {
  const { id } = req.user;
  const {
    companyName,
    username,
    userlastname,
    email,
    cellphone,
    prefix,
    location,
    address,
    image,
  } = req.body;
  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      companyName,
      username,
      userlastname,
      email,
      cellphone,
      prefix,
      location,
      address,
      image,
    },
    { new: true }
  );

  res.status(200).json(user);
};

