function MusicCard({music,onSelect}){
  return(
    <div
      onClick={()=>onSelect(music)}
      className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 hover:bg-zinc-800 transition cursor-pointer"
    >
      <div className="aspect-square rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center">
        {music.coverImage ? (
          <img
            src={music.coverImage}
            alt={music.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-zinc-600 text-4xl">♪</span>
        )}
      </div>

      <h3 className="mt-4 font-semibold truncate">
        {music.title}
      </h3>

      <p className="mt-1 text-sm text-zinc-500 truncate">
        {music.artist}
      </p>

      <p className="mt-2 text-xs text-zinc-600">
        {music.likes||0} likes
      </p>
    </div>
  )
}

export default MusicCard