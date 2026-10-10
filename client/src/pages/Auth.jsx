import {useState} from "react"
import {useNavigate} from "react-router-dom"

function Auth(){
  const [isLogin,setIsLogin]=useState(true)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError("")
    setLoading(true)

    try{
      const response=await fetch(
        `http://localhost:5000/api/auth/${isLogin?"login":"register"}`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(
            isLogin
              ? {email,password}
              : {name,email,password}
          )
        }
      )

      const data=await response.json()

      if(!response.ok){
        throw new Error(data.message||"Authentication failed")
      }

      if(isLogin){
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        navigate("/")
      }else{
        setIsLogin(true)
        setPassword("")
        setError("Account created successfully. Please log in.")
      }
    }catch(error){
      setError(error.message||"Something went wrong")
    }finally{
      setLoading(false)
    }
  }

  return(
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-3xl">
            ♪
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            {isLogin?"Welcome back":"Create account"}
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            {isLogin
              ?"Log in and get back to your music."
              :"Join BeatPulse and build your music collection."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {!isLogin&&(
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-purple-500"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
            minLength={6}
            required
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-purple-500"
          />

          {error&&(
            <p className="text-sm text-zinc-300">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 font-semibold transition hover:bg-purple-500 disabled:opacity-50"
          >
            {loading
              ?"Please wait..."
              :isLogin?"Log In":"Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          {isLogin?"Don't have an account?":"Already have an account?"}
          {" "}
          <button
            onClick={()=>{
              setIsLogin(!isLogin)
              setError("")
            }}
            className="font-semibold text-purple-400 hover:text-purple-300"
          >
            {isLogin?"Register":"Log in"}
          </button>
        </p>
      </div>
    </main>
  )
}

export default Auth