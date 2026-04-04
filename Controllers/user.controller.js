import userModel from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User registration
export async function userRegister(req, res) {
  try {
    const { userName, email, password } = req.body; // Destructuring the request body
    let data = await userModel.findOne({ email }); // Checking if the user with the given email already exists
    if (data) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    // Checking if the username already exists
    let name = await userModel.findOne({ userName });
    if (name) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // Creating a new user with the provided details and hashing the password using bcrypt
    let newUser = await userModel.create({
      userName,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    // Saving the new user to the database and sending an appropriate response based on the success or failure of the operation
    newUser
      .save()
      .then((user) => {
        return res
          .status(201)
          .json({ message: "User registered successfully", user: user });
      })
      .catch((err) => {
        return res.status(400).json({ message: "Failed to register user" });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// User Login
export async function userLogin(req, res) {
  try {
    const { user, password } = req.body; // Destructuring the request body to get email and password
    // Finding the user by email or username
    let data = await userModel.findOne({
      $or: [{ email: user }, { userName: user }],
    });
    if (!data) {
      return res.status(400).json({ message: "User not found" });
    }
    // Comparing the provided password with the stored hashed password using bcrypt
    let validPassword = bcrypt.compareSync(password, data.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate the jwt token
    const token = jwt.sign(
      { userId: data._id, userName: data.userName },
      "secretKey",
    );
    // Send the token in the response
    return res
      .status(200)
      .json({ token, user: { name: data.userName, userId: data._id } });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
