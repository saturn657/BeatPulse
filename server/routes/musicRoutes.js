const express=require("express")
const {addMusic,getMusic,getMusicById,updateMusic,deleteMusic}=require("../controllers/musicController")
const router=express.Router()

router.post("/",addMusic)
router.get("/",getMusic)
router.get("/:id",getMusicById)
router.put("/:id",updateMusic)
router.delete("/:id",deleteMusic)

module.exports=router