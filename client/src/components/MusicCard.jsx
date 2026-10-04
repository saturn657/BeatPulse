import {useEffect,useState} from "react"

function MusicCard({music,onSelect}){
  const [isFavorite,setIsFavorite]=useState(false)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    const token=localStorage.getItem("token")

    if(!token){
      return
    }

    const checkFavorite=async()=>{
      try{
        const response=await fetch(
          `http://localhost:5000/api/favorites/check/${music._id}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )

        const data=await response.json()
        setIsFavorite(data.isFavorite)
      }catch(error){
        console.error("Failed to check favorite")
      }
    }

    checkFavorite()
  },[music._id])

  const toggleFavorite=async(e)=>{
    e.stopPropagation()

    const token=localStorage.getItem("token")

    if(!token){
      alert("Please login to add favorites")
      return
    }

    try{
      setLoading(true)

      if(isFavorite){
        await fetch(
          `http://localhost:5000/api/favorites/${music._id}`,
          {
            method:"DELETE",
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )

        setIsFavorite(false)
      }else{
        await fetch(
          "http://localhost:5000/api/favorites",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
              musicId:music._id
            })
          }
        )

        setIsFavorite(true)
      }
    }catch(error){
      console.error("Failed to update favorite")
    }finally{
      setLoading(false)
    }
  }

  return(
    <div
      onClick={()=>onSelect(music)}
      className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 hover:bg-zinc-800 transition cursor-pointer"
    >
      <div className="relative aspect-square rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center">
        {music.coverImage ? (
          <img
            src={music.coverImage}
            alt={music.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-zinc-600 text-4xl">♪</span>
        )}

        <button
          onClick={toggleFavorite}
          disabled={loading}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition"
        >
          <span className={isFavorite?"text-red-500":"text-white"}>
            {isFavorite?"♥":"♡"}
          </span>
        </button>
      </div>

      <h3 className="mt-4 font-semibold truncate">
        {music.title}
      </h3>

      <p className="mt-1 text-sm text-zinc-500 truncate">
        {music.artist}
      </p>

      <p className="mt-2 text-xs text-zinc-600">
        {music.likes||0} likes
      </p>
    </div>
  )
}

export default MusicCard