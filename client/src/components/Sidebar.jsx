function Sidebar(){
  return(
    <aside className="w-64 min-h-screen bg-zinc-900 border-r border-zinc-800 p-6">
      <h1 className="text-2xl font-bold">BeatPulse</h1>

      <nav className="mt-10 space-y-4">
        <p className="text-zinc-300 cursor-pointer">Home</p>
        <p className="text-zinc-400 cursor-pointer">Search</p>
        <p className="text-zinc-400 cursor-pointer">Your Library</p>
        <p className="text-zinc-400 cursor-pointer">Favorites</p>
      </nav>
    </aside>
  )
}

export default Sidebar