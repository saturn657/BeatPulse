function MusicPlayer({music}){
  if(!music){
    return(
      <div className="fixed bottom-0 left-64 right-0 h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center">
        <p className="text-sm text-zinc-500">Select a song to start listening</p>
      </div>
    )
  }

  return(
    <div className="fixed bottom-0 left-64 right-0 h-20 bg-zinc-900 border-t border-zinc-800 px-6 flex items-center">
      <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center">
        {music.coverImage ? (
          <img
            src={music.coverImage}
            alt={music.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-zinc-600 text-xl">♪</span>
        )}
      </div>

      <div className="ml-4 min-w-0">
        <p className="font-medium truncate">{music.title}</p>
        <p className="text-sm text-zinc-500 truncate">{music.artist}</p>
      </div>

      <div className="ml-auto">
        <button className="w-10 h-10 rounded-full bg-white text-black">
          ▶
        </button>
      </div>
    </div>
  )
}

export default MusicPlayer