import {useEffect,useState} from "react"
import MusicCard from "../components/MusicCard"
import MusicPlayer from "../components/MusicPlayer"

function Home(){
  const [music,setMusic]=useState([])
  const [loading,setLoading]=useState(true)
  const [selectedMusic,setSelectedMusic]=useState(null)
  const [currentIndex,setCurrentIndex]=useState(-1)
  const [search,setSearch]=useState("")

  useEffect(()=>{
    const fetchMusic=async()=>{
      try{
        setLoading(true)

        const url=search.trim()
          ? `http://localhost:5000/api/music?search=${encodeURIComponent(search)}`
          : "http://localhost:5000/api/music"

        const response=await fetch(url)
        const data=await response.json()

        setMusic(data)
      }catch(error){
        console.error("Failed to fetch music")
      }finally{
        setLoading(false)
      }
    }

    const timer=setTimeout(fetchMusic,300)

    return()=>clearTimeout(timer)
  },[search])

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
        <p className="text-sm text-zinc-500">WELCOME BACK</p>

        <h1 className="mt-2 text-4xl font-bold">
          Find your next favorite song.
        </h1>

        <p className="mt-3 text-zinc-400">
          Explore music, create playlists and keep your pulse moving.
        </p>
      </section>

      <section className="mt-10">
        <input
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search songs, artists, albums or genres..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
        />
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {search ? "Search Results" : "Music Library"}
          </h2>

          {search && (
            <p className="text-sm text-zinc-500">
              {music.length} result{music.length!==1?"s":""}
            </p>
          )}
        </div>

        {loading ? (
          <p className="mt-6 text-zinc-500">
            Loading music...
          </p>
        ) : music.length===0 ? (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-500">
              {search ? "No music found." : "No music available yet."}
            </p>

            <p className="mt-2 text-sm text-zinc-600">
              {search
                ? "Try a different song, artist or genre."
                : "Add some music through the backend API."
              }
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

export default Home