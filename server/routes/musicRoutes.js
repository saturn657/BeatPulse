const express=require("express")
const {addMusic,getMusic,getMusicById,updateMusic}=require("../controllers/musicController")
const router=express.Router()

router.post("/",addMusic)
router.get("/",getMusic)
router.get("/:id",getMusicById)
router.put("/:id",updateMusic)

module.exports=router