const express=require("express")
const {registerUser}=require("../controllers/authController")

const router=express.Router()

router.post("/register",registerUser)

router.post("/login",(req,res)=>{
    res.json({message:"Login route working"})
})

module.exports=router