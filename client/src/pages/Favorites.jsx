import {useEffect,useState} from "react"
import MusicCard from "../components/MusicCard"
import MusicPlayer from "../components/MusicPlayer"

function Favorites(){
  const [music,setMusic]=useState([])
  const [loading,setLoading]=useState(true)
  const [selectedMusic,setSelectedMusic]=useState(null)
  const [currentIndex,setCurrentIndex]=useState(-1)

  useEffect(()=>{
    const fetchFavorites=async()=>{
      const token=localStorage.getItem("token")

      if(!token){
        setLoading(false)
        return
      }

      try{
        const response=await fetch(
          "http://localhost:5000/api/favorites",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )

        const data=await response.json()
        setMusic(data)
      }catch(error){
        console.error("Failed to fetch favorites")
      }finally{
        setLoading(false)
      }
    }

    fetchFavorites()
  },[])

  const selectMusic=(item,index)=>{
    setSelectedMusic(item)
    setCurrentIndex(index)
  }

  const previousMusic=()=>{
    if(currentIndex>0){
      const index=currentIndex-1
      setCurrentIndex(index)
      setSelectedMusic(music[index])
    }
  }

  const nextMusic=()=>{
    if(currentIndex<music.length-1){
      const index=currentIndex+1
      setCurrentIndex(index)
      setSelectedMusic(music[index])
    }
  }

  return(
    <main className="p-8 pb-32">
      <section>
        <p className="text-sm text-zinc-500">YOUR LIBRARY</p>

        <h1 className="mt-2 text-4xl font-bold">
          Favorite Music
        </h1>

        <p className="mt-3 text-zinc-400">
          Songs you've saved for later.
        </p>
      </section>

      {!localStorage.getItem("token") ? (
        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-400">
            Login to see your favorite music.
          </p>
        </div>
      ) : loading ? (
        <p className="mt-10 text-zinc-500">
          Loading favorites...
        </p>
      ) : music.length===0 ? (
        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-400">
            You haven't added any favorites yet.
          </p>

          <p className="mt-2 text-sm text-zinc-600">
            Tap the heart on a song to save it here.
          </p>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Saved Songs
            </h2>

            <p className="text-sm text-zinc-500">
              {music.length} song{music.length!==1?"s":""}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
            {music.map((item,index)=>(
              <MusicCard
                key={item._id}
                music={item}
                onSelect={()=>selectMusic(item,index)}
              />
            ))}
          </div>
        </div>
      )}

      <MusicPlayer
        music={selectedMusic}
        currentIndex={currentIndex}
        onPrevious={previousMusic}
        onNext={nextMusic}
      />
    </main>
  )
}

export default Favorites