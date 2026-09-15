function App(){
  return(
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6">
        <h1 className="text-2xl font-bold">BeatPulse</h1>

        <nav className="mt-10 space-y-4">
          <p className="text-zinc-300">Home</p>
          <p className="text-zinc-400">Search</p>
          <p className="text-zinc-400">Your Library</p>
          <p className="text-zinc-400">Favorites</p>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold">Welcome to BeatPulse</h2>
        <p className="mt-2 text-zinc-400">
          Your music, your pulse.
        </p>
      </main>
    </div>
  )
}

export default App