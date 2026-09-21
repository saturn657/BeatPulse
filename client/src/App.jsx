import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App(){
  return(
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar/>

      <div className="flex-1">
        <Navbar/>
        <Home/>
      </div>
    </div>
  )
}

export default App