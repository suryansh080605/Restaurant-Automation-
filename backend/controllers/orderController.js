import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Ensure your key is valid

const placeOrder = async (req, res) => {
  const frontend_url = "https://foodydesk.onrender.com";

  try {
    // Validate required fields
    if (!req.body.userId || !req.body.items || !req.body.amount) {
      return res.status(400).json({ success: false, message: "Invalid request data" });
    }

    // Create a new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear user's cart after order placement
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Map order items to Stripe's line_items format
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100 * 80), // Ensure proper calculation
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: "inr", // Fixed typo here
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("Stripe Session Created:", session.url);
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Order Placement Error:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};


//to verify the success after the payment the best way si web hooks but i am temporraly using the normal method

const verifyOrder = async (req,res)=>{
const {orderId,success}=req.body;
try{
if(success=="true"){
    await orderModel.findByIdAndUpdate(orderId,{payment:true}); 
    res.json({success:true,message:"paid"})
}
else{
    await orderModel.findByIdAndDelete(orderId);
    res.json({success:false,message:"Not Paid"})
}
}
catch(error){
    console.log("Error");
    res.json({success:false,message:"Error"});

}
}

// user order for frontend
const userOrders = async (req,res) =>{
try{
const orders=await orderModel.find({userId:req.body.userId})  
res.json({success:true,data:orders})

}
catch(error){
console.log("Error coming ")
res.json({success:false,message:"Error"});
}
}
// Listing orders for the admin panel

const listOrders=async (req,res)=>{
try{
const orders = await orderModel.find({});
res.json({success:true,data:orders})
}
catch(error){
console.log(error);
res.json({success:false,message:"Errror"})
}
}

// api to update the order status

const updateStatus = async(req,res)=> {
try{
await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
res.json({success:true,message:"Status Updated"})
}
catch(error){
console.log(error);
res.json({success:false,message:"Error aa rha h"})
}
}
export { placeOrder ,verifyOrder,userOrders,listOrders,updateStatus};
