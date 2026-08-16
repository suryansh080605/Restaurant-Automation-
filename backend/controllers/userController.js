import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" 
import validator from "validator"

//login user bana rha hu idhar
const loginUser=async(req,res)=>{
const {email,password} =req.body
try{
const user =await userModel.findOne({email});
//agar iss email ka user hoga to woh user wale variable m store ho ajyega

if(!user){
    return res.json({success:false,message:"User doesn't exists"})
}
const isMatch =await bcrypt.compare(password,user.password)  //idhar m dekh rha hu ki user exist karta h to password sahi h ya galat?
 
if(!isMatch){
    return res.json({success:false,message:"invalid credentials"})
}

const token =createToken(user._id) ; //agar password sahi h to we will generate a token to sen to the user for 

res.json({success:true,token});
}
catch(error){
console.log(error);
res.json({success:false,message:"error"})

}
}

const createToken =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user agar pehele se nhi ho to

const registerUser = async (req,res)=>{
const {name,password,email}= req.body;
try{
    // checking is user is already present int he db 
const exists=await userModel.findOne({email})  //yeh maine db query kiya h ki agar user present ho to isme aa jaye
if(exists){
    return res.json({success:false,message:"User already Exists"})
}
// valdiating email format and strong password
if(!validator.isEmail(email)){
    return res.json({success:false,message:"Please enter a valid email"})
}
if(password.length<8){
    return res.json({success:false,message:"Please enter a strong Password"})
}
// idhar mai password ki hashing kar rha hu bcrypt se 
// 
// In bcrypt, salt plays a crucial role in enhancing the security of password hashing. Here’s why it’s important:

// 🔑 What is Salt?
// A salt is a random string of characters added to a password before hashing it. It ensures that even if two users have the same password, their hashes will be different.

// 🚀 Uses of Salt in bcrypt:
// Prevents Hash Collision:

// Without salt, two identical passwords would produce identical hashes. Salt ensures each hash is unique, even for identical passwords.
// Defends Against Rainbow Table Attacks:

// A rainbow table is a precomputed table of hashes for common passwords. Salting makes these tables ineffective because each password is hashed uniquely.
// Slows Down Brute Force Attacks:

// bcrypt is intentionally slow to compute hashes. Salting makes it even more computationally expensive for attackers to crack passwords.
// Enhances Security for Weak Passwords:

// Even if a user chooses a weak password (e.g., "123456"), the salt makes it harder to crack by introducing randomness.
// Uniqueness per User:

// Each user gets a unique salt, ensuring that even if multiple users have the same password, their stored hashes are different.
// 🛠️ How bcrypt Uses Salt:
// bcrypt automatically generates a unique salt when hashing a password.
// The salt is stored along with the hashed password, often as part of the resulting hash string.
// When verifying a password, bcrypt extracts the salt from the stored hash and recalculates the hash with the input password.
const salt =await bcrypt.genSalt(10)  
const hashedPassword=await bcrypt.hash(password,salt)

const newUser = new userModel({
    name:name,
    email:email,
    password:hashedPassword
})

const user= await newUser.save() //idhar mai user ko save kar rha hu db m 
const token=createToken(user._id)
res.json({success:true,token})  //idhar mai response bhej raha hu


}
catch (error){
console.log(error);
res.json({success:false,message:"error"})
}
}

export {loginUser,registerUser}
