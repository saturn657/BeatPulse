import {useEffect,useState} from "react"
import MusicCard from "../components/MusicCard"
import MusicPlayer from "../components/MusicPlayer"

function Library(){
  const [music,setMusic]=useState([])
  const [loading,setLoading]=useState(true)
  const [selectedMusic,setSelectedMusic]=useState(null)
  const [currentIndex,setCurrentIndex]=useState(-1)

  useEffect(()=>{
    const fetchMusic=async()=>{
      try{
        const response=await fetch("http://localhost:5000/api/music")
        const data=await response.json()
        setMusic(data)
      }catch(error){
        console.error("Failed to fetch music")
      }finally{
        setLoading(false)
      }
    }

    fetchMusic()
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
        <p className="text-sm text-zinc-500">YOUR COLLECTION</p>

        <h1 className="mt-2 text-4xl font-bold">
          Your Library
        </h1>

        <p className="mt-3 text-zinc-400">
          Explore the music available on BeatPulse.
        </p>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Music</h2>

          <p className="text-sm text-zinc-500">
            {music.length} songs
          </p>
        </div>

        {loading ? (
          <p className="mt-6 text-zinc-500">Loading library...</p>
        ) : music.length===0 ? (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-400">Your library is empty.</p>
            <p className="mt-2 text-sm text-zinc-600">
              Music added to BeatPulse will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
            {music.map((item,index)=>(
              <MusicCard
                key={item._id}
                music={item}
                onSelect={()=>selectMusic(item,index)}
              />
            ))}
          </div>
        )}
      </section>

      <MusicPlayer
        music={selectedMusic}
        currentIndex={currentIndex}
        onPrevious={previousMusic}
        onNext={nextMusic}
      />
    </main>
  )
}

export default Library