const User = require('../models/User');
const asyncHandler = require('express-async-handler')


/*
@desc Register User
*/
exports.registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    
    if (!username || !email || !password) {
        res.status(400);
        throw new Error(`Missing Field`);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (!newUser) {
    res.status(400);
    throw new Error('Invalid user data; user not created');
  } else {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
    }
    
    if (!newUser) {
        res.status(400);
        throw new Error('Invalid user data; user not created');
      } else {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          token: generateToken(newUser._id),
        });
      }
});

/*
@desc Login User
*/

exports.loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const userLogging = await User.findOne({email});

    if(!userLogging || !(await bcrypt.compare(password, userLogging.password))){
        res.status(400);
        console.log(password, userLogging.password);
        throw new Error(`Invalid username/password : Password -> ${userLogging.password}`);
    }else{
        res.status(200).json({
            _id: userLogging._id,
            name: userLogging.name,
            email: userLogging.email,
            token: jwtstuff.generateToken(userLogging._id),
        });
    }
})

/*
@desc Grabs Current User
*/
exports.currentUser = asyncHandler(async(req, res) => {
    const currentUser = {
        name: req.user.name,
        email: req.user.email,
        team: req.user.team,
    };
    res.json(currentUser);
})

/*
@desc Deletes User
*/
exports.deleteUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const userDeleting = await User.findOne({email});
    const deletedUser = await userDeleting.delete();

    try{
    if(!deletedUser){
        res.status(400).json({
            success: false,
            message: `User not found`,
        });
    } else{
        res.status(200).json({
            deletedUser,
            success: true,
            message:`User ${userDeleting._id} has been succesfully deleted`,
        });
    }}catch(error){
        res.status(400).json({
            success: false,
            message: `Problem when retrieving deleted user information`,
        });
    }

    
})

