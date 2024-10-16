// models/usermodel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralcode: { type: String, required: true},
    TotalDonation:{type:Number,required:true,default:0}
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
