import express from "express";

const router = express.Router();

router.get("/send", (req, res)=>{
    res.send("This is Message endPoint! ")
})

export default router;