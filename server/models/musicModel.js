const mongoose=require("mongoose")

const musicSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    artist:{
        type:String,
        required:true,
        trim:true
    },
    album:{
        type:String,
        default:""
    },
    genre:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    audioUrl:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports=mongoose.model("Music",musicSchema)