const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    req.flash('error', 'User already exists');
    return res.redirect('/register');
  }
  
  // encrypted password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword
  });

  await user.save();

  console.log('user saved'); // debug
  
  req.flash('success', 'User created successfully');
  res.redirect('/login');
};

// Update personal information
exports.showProfile = (req, res) => {
  res.render('auth/profile');
};

// Update personal information
exports.updateProfile = async (req, res) => {
  try {
    const { address, phone } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      address,
      phone
    });

    req.flash('success', 'Profile updated successfully');
    res.redirect('/dashboard');

  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating profile');
    res.redirect('/profile');
  }
};