import express from "express";

const router = express.Router();

router.get("/signup", (req,res)=>{
    res.send("This is SignUp Page!")
})

router.get("/login", (req,res)=>{
    res.send("This is Login Page!")
})

router.get("/logout", (req,res)=>{
    res.send("This is Logout Page!")
})

export default router; 