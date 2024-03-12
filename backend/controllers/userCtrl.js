const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/createjwt');


const register = async (req, res) => {
  const { name, email, password, phone, city } = req.body;
  try {
    const userExists = await User.findOne({email});
    
    if(userExists) {
      res.status(400).json("user already exixts");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      city
    });

    res.status(200).json({
      _id: newUser._id,
      email: newUser.email
    });

  } catch (error) {
    res.status(500).json(error);
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({email});
    if(userExists) {
      const validPassword = await bcrypt.compare(password, userExists.password);

      if(validPassword) {
        const token = generateToken(userExists._id);

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        }).json({
          _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          phone: userExists.phone,
          city: userExists.city
        })
      } else{
        res.status(401).json("pass not ok")
      }
    } else{
      res.status(404).json("user not found")
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error)
  }
}

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(404).json("user not found" + error);
  }
}



const deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json(error);
  }
} 

const logout = (req, res) => {
  res.cookie("token", "").json(true);
}

const updateUser = async (req, res) => {
  const {id} = req.params;
  const {name, phone, city} = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      phone,
      city
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { register, login, profile, deleteUser, logout, getUsers, updateUser }