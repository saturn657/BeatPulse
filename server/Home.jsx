import {useEffect,useState} from "react"

function Home(){
  const [music,setMusic]=useState([])
  const [loading,setLoading]=useState(true)

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

  return(
    <main className="p-8">
      <section>
        <p className="text-sm text-zinc-500">WELCOME BACK</p>
        <h1 className="mt-2 text-4xl font-bold">Find your next favorite song.</h1>
        <p className="mt-3 text-zinc-400">
          Explore music, create playlists and keep your pulse moving.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Music Library</h2>

        {loading ? (
          <p className="mt-6 text-zinc-500">Loading music...</p>
        ) : music.length===0 ? (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-500">No music available yet.</p>
            <p className="mt-2 text-sm text-zinc-600">
              Add some music through the backend API.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
            {music.map((item)=>(
              <div
                key={item._id}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4"
              >
                <div className="aspect-square rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center">
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-zinc-600 text-4xl">♪</span>
                  )}
                </div>

                <h3 className="mt-4 font-semibold truncate">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-500 truncate">
                  {item.artist}
                </p>

                <p className="mt-2 text-xs text-zinc-600">
                  {item.likes||0} likes
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home