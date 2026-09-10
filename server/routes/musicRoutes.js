const express=require("express")
const {addMusic,getMusic}=require("../controllers/musicController")

const router=express.Router()

router.post("/",addMusic)
router.get("/",getMusic)

module.exports=router