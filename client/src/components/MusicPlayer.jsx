function MusicPlayer({music,currentIndex,onNext,onPrevious}){
  if(!music){
    return(
      <div className="fixed bottom-0 left-64 right-0 h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center">
        <p className="text-sm text-zinc-500">Select a song to start listening</p>
      </div>
    )
  }

  return(
    <div className="fixed bottom-0 left-64 right-0 h-24 bg-zinc-900 border-t border-zinc-800 px-6 flex items-center gap-5">
      <div className="w-14 h-14 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center shrink-0">
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

      <div className="w-48 min-w-0">
        <p className="font-medium truncate">{music.title}</p>
        <p className="text-sm text-zinc-500 truncate">{music.artist}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onPrevious}
          disabled={currentIndex<=0}
          className="w-9 h-9 rounded-full bg-zinc-800 disabled:opacity-30"
        >
          ⏮
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex>=999}
          className="w-9 h-9 rounded-full bg-zinc-800"
        >
          ⏭
        </button>
      </div>

      <div className="flex-1">
        <audio
          className="w-full"
          controls
          src={music.audioUrl}
          autoPlay
        >
          Your browser does not support audio playback.
        </audio>
      </div>
    </div>
  )
}

export default MusicPlayer