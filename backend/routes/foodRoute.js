import express from "express"
import { addFood, listFood,removeFood } from "../controllers/foodController.js"

import multer from "multer"

const foodRouter =express.Router();

//image storage engine

const storage =multer.diskStorage({
    destination:"uploads",
    //idhar cb callback function h mera
    filename:(req,file,cb)=>{
return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood) //yeh ek naya end point h
foodRouter.post("/remove",removeFood)



export default foodRouter;