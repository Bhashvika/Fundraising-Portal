// Controllers/usercontroller.js
import userModel from '../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Transaction from '../models/transactions.js';
dotenv.config();
// Generate JWT Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password, referralcode } = req.body;
    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) return res.json({ success: false, message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hash, referralcode });
        await user.save();

        const token = createToken(user._id);
        res.json({ success: true, token,name:name});
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};

// Login User
// Login User
// Controllers/usercontrollers.js

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await userModel.findOne({ email });
      if (!user) return res.json({ success: false, message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

      const token = createToken(user._id);
      // Include the referral code and total donation in the response
      res.json({ success: true, token, name: user.name, referralCode: user.referralcode, Totaldonation: user.TotalDonation });
  } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Error logging in" });
  }
};


export const getdata=async (req,res)=>{
    try {
        let data=await userModel.find({});
        res.send(data);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({ success: false, message: 'Server Error' });
    }
}
// Assuming you have this in your user controller
export const donate = async (req, res) => {
  const { name, amount, referralcode } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { referralcode: referralcode },
      { $inc: { TotalDonation: amount } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid referral code.' });
    }

    // Save the individual donation record
    const donation = new Transaction({
      userId: user._id, // Ensure you have a way to relate this to the user
      name: name,
      amount: amount,
      referralcode: referralcode,
    });

    await donation.save(); // Save the donation record

    res.json({ success: true, message: 'Donation successful!', totalDonation: user.TotalDonation });
  } catch (error) {
    console.error('Error processing donation:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
