import {BrowserRouter,Routes,Route} from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"

function App(){
  return(
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white flex">
        <Sidebar/>

        <div className="flex-1">
          <Navbar/>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App