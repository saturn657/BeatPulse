const Music=require("../models/musicModel")

const addMusic=async(req,res)=>{
    try{
        const {title,artist,album,genre,coverImage,audioUrl,duration}=req.body

        if(!title||!artist||!audioUrl){
            return res.status(400).json({message:"Title, artist and audio URL are required"})
        }

        const music=await Music.create({
            title,
            artist,
            album,
            genre,
            coverImage,
            audioUrl,
            duration
        })

        res.status(201).json({
            message:"Music added successfully",
            music
        })
    }catch(error){
        res.status(500).json({message:"Failed to add music"})
    }
}

const getMusic=async(req,res)=>{
    try{
        const search=req.query.search

let music

if(search){
    music=await Music.find({
        $or:[
            {title:{$regex:search,$options:"i"}},
            {artist:{$regex:search,$options:"i"}},
            {album:{$regex:search,$options:"i"}},
            {genre:{$regex:search,$options:"i"}}
        ]
    }).sort({createdAt:-1})
}else{
    music=await Music.find().sort({createdAt:-1})
}
        res.json(music)
    }catch(error){
        res.status(500).json({message:"Failed to fetch music"})
    }
}

module.exports={addMusic,getMusic}