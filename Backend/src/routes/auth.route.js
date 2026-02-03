import express from "express";
import { signup } from "../controllers/auth.controller.js"; 

const router = express.Router();

router.post("/signup", signup);

router.get("/login", (req,res)=>{
    res.send("This is Login Page!")
})

router.get("/logout", (req,res)=>{
    res.send("This is Logout Page!")
})

export default router; 