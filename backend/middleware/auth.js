import jwt from "jsonwebtoken"

// this next is my callback function
const authMiddleware = async (req,res,next)=>{
// pehele user se tokenlunga fir desturcture karunga

const {token} =req.headers;
if(!token){
return res.json({success:false,message:"Not authorized please login againn.."})
}

try{
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);  //idhar token aur secrect key dunga verification k liye
    req.body.userId =token_decode.id;
    next ();
}
catch (error){
console.log("Error coming");
res.json({success:false,message:"Error"})
}
 }

export default authMiddleware