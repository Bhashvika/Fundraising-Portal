
import express from 'express';
import {
    registerUser,
    loginUser,
    getdata,
    donate,
} from "../Controllers/usercontrollers.js";

const router = express.Router();
  
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getdata', getdata);
router.post('/donate', donate);
export { router };
