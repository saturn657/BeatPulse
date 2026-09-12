const express=require("express")
const {addMusic,getMusic,getMusicById}=require("../controllers/musicController")
const router=express.Router()

router.post("/",addMusic)
router.get("/",getMusic)
router.get("/:id",getMusicById)

module.exports=router