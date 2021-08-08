// userController.js
// Import user model
User=require('../models/userModel');
const jwt=require('jsonwebtoken');
// Handle index actions
exports.login=async function (req, res) {

  const user=await User.findOne({email: req.body.email});
  if (!user) return res.status(400).json({error: 'Usuario no encontrado'});

  const validPassword=req.body.password === user.password;
  if (!validPassword) return res.status(400).json({error: 'contraseña no válida'})

  const token=jwt.sign({
    name: user.name,
    id: user._id
  }, process.env.TOKEN_SECRET)

  res.json({
    error: null,
    data: {
      name: user.name,
      lastName: user.lastName,
      id: user._id,
      profile: user.profile,
      zones: user.zones,
      email: user.email,
      logged: user.logged,
      token
    }
  })
};
