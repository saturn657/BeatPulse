
import {Link,useNavigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"


function Navbar(){
  const {user,logout}=useAuth()
  const navigate=useNavigate()

  const handleLogout=()=>{
    logout()
    navigate("/login")
  }

  return(
    <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-semibold">Good evening</h2>
        <p className="text-sm text-zinc-500">Ready to listen?</p>
      </div>

      <div className="flex items-center gap-4">
        {user?(
          <>
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-semibold">
              {user.name?.charAt(0).toUpperCase()||"U"}
            </div>

            <span className="text-sm text-zinc-300">
              {user.name||"User"}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
            >
              Logout
            </button>
          </>
        ):(
          <Link
            to="/login"
            className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold hover:bg-purple-500"
          >
            Login / Register
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
