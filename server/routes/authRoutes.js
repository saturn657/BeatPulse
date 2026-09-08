const express=require("express")
const protect=require("../middleware/authMiddleware")
const {registerUser,loginUser,getMe,updateProfile,changePassword}=require("../controllers/authController")

const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/me",protect,getMe)
router.put("/profile",protect,updateProfile)
router.put("/change-password",protect,changePassword)

module.exports=router