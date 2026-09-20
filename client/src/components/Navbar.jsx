function Navbar(){
  return(
    <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-semibold">Good evening</h2>
        <p className="text-sm text-zinc-500">Ready to listen?</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
          🔔
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
            U
          </div>

          <span className="text-sm text-zinc-300">User</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar