import {BrowserRouter,Routes,Route} from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Favorites from "./pages/Favorites"
import Library from "./pages/Library"

function App(){
  return(
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white flex">
        <Sidebar/>

        <div className="flex-1">
          <Navbar/>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/library" element={<Library/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App