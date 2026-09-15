const express=require("express")
const {addFavorite,getFavorites,removeFavorite,checkFavorite}=require("../controllers/favoriteController")
const protect=require("../middleware/authMiddleware")

const router=express.Router()

router.post("/",protect,addFavorite)
router.get("/",protect,getFavorites)
router.get("/check/:musicId",protect,checkFavorite)
router.delete("/:musicId",protect,removeFavorite)

module.exports=router