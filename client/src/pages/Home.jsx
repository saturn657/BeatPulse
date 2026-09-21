function Home(){
  return(
    <main className="p-8">
      <section>
        <p className="text-sm text-zinc-500">WELCOME BACK</p>
        <h1 className="mt-2 text-4xl font-bold">Find your next favorite song.</h1>
        <p className="mt-3 text-zinc-400">
          Explore music, create playlists and keep your pulse moving.
        </p>
      </section>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          <p className="text-zinc-500 text-sm">YOUR LIBRARY</p>
          <h3 className="mt-2 text-xl font-semibold">Explore Music</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Browse your music collection.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          <p className="text-zinc-500 text-sm">FAVORITES</p>
          <h3 className="mt-2 text-xl font-semibold">Liked Songs</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Your favorite tracks in one place.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          <p className="text-zinc-500 text-sm">DISCOVER</p>
          <h3 className="mt-2 text-xl font-semibold">New Music</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Discover something worth listening to.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recently Played</h2>
          <button className="text-sm text-zinc-400 hover:text-white">
            See all
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-500">No recently played songs yet.</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Popular Music</h2>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[1,2,3,4].map((item)=>(
            <div
              key={item}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4"
            >
              <div className="aspect-square rounded-xl bg-zinc-800 flex items-center justify-center">
                <span className="text-zinc-600 text-4xl">♪</span>
              </div>

              <h3 className="mt-4 font-semibold">Music Track</h3>
              <p className="mt-1 text-sm text-zinc-500">Artist</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home