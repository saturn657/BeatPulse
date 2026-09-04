const express=require("express")
const dotenv=require("dotenv")
const connectDB=require("./config/db")

dotenv.config()

connectDB()

const app=express()
const PORT=5000

app.use(express.json())

app.get("/",(req,res)=>{
    res.json({message:"BeatPulse server is running"})
})

app.listen(PORT,()=>{
    console.log(`BeatPulse server running on port ${PORT}`)
})