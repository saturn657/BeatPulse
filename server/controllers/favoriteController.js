const Favorite=require("../models/favoriteModel")

const addFavorite=async(req,res)=>{
    try{
        const {musicId}=req.body

        if(!musicId){
            return res.status(400).json({message:"Music ID is required"})
        }

        const existingFavorite=await Favorite.findOne({
            user:req.user._id,
            music:musicId
        })

        if(existingFavorite){
            return res.status(400).json({message:"Music already added to favorites"})
        }

        const favorite=await Favorite.create({
            user:req.user._id,
            music:musicId
        })

        res.status(201).json({
            message:"Music added to favorites",
            favorite
        })
    }catch(error){
        res.status(500).json({message:"Failed to add favorite"})
    }
}

const getFavorites=async(req,res)=>{
    try{
        const favorites=await Favorite.find({user:req.user._id})
            .populate("music")
            .sort({createdAt:-1})

        res.json(favorites)
    }catch(error){
        res.status(500).json({message:"Failed to fetch favorites"})
    }
}

module.exports={addFavorite,getFavorites}