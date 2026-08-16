import express from"express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//app config
const app = express()
const port=4000
//middleware
app.use(express.json())
app.use(cors())

// db connection 
connectDB();

//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))  //iss end point se m jo image aayi h multer aur db musko frintend e dikha raha hu i have munted the uploads folder
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.get("/",(req,res)=>{
    res.send("API WORKING")
})  //http method tp get data

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://manas_19:<db_password>@cluster0.mdxgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0