import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

function App(){
  return(
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar/>

      <div className="flex-1">
        <Navbar/>

        <main className="p-8">
          <h2 className="text-3xl font-bold">Welcome to BeatPulse</h2>
          <p className="mt-2 text-zinc-400">
            Your music, your pulse.
          </p>
        </main>
      </div>
    </div>
  )
}

export default App