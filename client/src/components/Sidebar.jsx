import {NavLink} from "react-router-dom"

function Sidebar(){
  const linkClass=({isActive})=>{
    return `block transition ${
      isActive
        ? "text-white font-semibold"
        : "text-zinc-400 hover:text-white"
    }`
  }

  return(
    <aside className="w-64 min-h-screen bg-zinc-900 border-r border-zinc-800 p-6">
      <h1 className="text-2xl font-bold">BeatPulse</h1>

      <nav className="mt-10 space-y-5">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/" className={linkClass}>
          Search
        </NavLink>

        <NavLink to="/library" className={linkClass}>
          Your Library
        </NavLink>

        <NavLink to="/favorites" className={linkClass}>
          Favorites
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar