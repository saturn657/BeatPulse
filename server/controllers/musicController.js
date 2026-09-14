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

const getMusicById=async(req,res)=>{
    try{
        const music=await Music.findById(req.params.id)

        if(!music){
            return res.status(404).json({message:"Music not found"})
        }

        res.json(music)
    }catch(error){
        res.status(500).json({message:"Failed to fetch music"})
    }
}

const updateMusic=async(req,res)=>{
    try{
        const {title,artist,album,genre,coverImage,audioUrl,duration}=req.body

        const music=await Music.findById(req.params.id)

        if(!music){
            return res.status(404).json({message:"Music not found"})
        }

        if(title!==undefined) music.title=title
        if(artist!==undefined) music.artist=artist
        if(album!==undefined) music.album=album
        if(genre!==undefined) music.genre=genre
        if(coverImage!==undefined) music.coverImage=coverImage
        if(audioUrl!==undefined) music.audioUrl=audioUrl
        if(duration!==undefined) music.duration=duration

        await music.save()

        res.json({
            message:"Music updated successfully",
            music
        })
    }catch(error){
        res.status(500).json({message:"Failed to update music"})
    }
}

const deleteMusic=async(req,res)=>{
    try{
        const music=await Music.findById(req.params.id)

        if(!music){
            return res.status(404).json({message:"Music not found"})
        }

        await music.deleteOne()

        res.json({message:"Music deleted successfully"})
    }catch(error){
        res.status(500).json({message:"Failed to delete music"})
    }
}

const getMusicCategories=async(req,res)=>{
    try{
        const artists=await Music.distinct("artist")
        const albums=await Music.distinct("album")
        const genres=await Music.distinct("genre")

        res.json({artists,albums,genres})
    }catch(error){
        res.status(500).json({message:"Failed to fetch categories"})
    }
}


module.exports={addMusic,getMusic,getMusicById,updateMusic,deleteMusic,getMusicCategories}