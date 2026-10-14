
import {useEffect,useState} from "react"
import {useAuth} from "../context/AuthContext"

function Profile(){
  const {user,login}=useAuth()
  const [name,setName]=useState(user?.name||"")
  const [profileImage,setProfileImage]=useState(user?.profileImage||"")
  const [email,setEmail]=useState(user?.email||"")
  const [loading,setLoading]=useState(true)
  const [saving,setSaving]=useState(false)
  const [message,setMessage]=useState("")

  useEffect(()=>{
    const fetchProfile=async()=>{
      const token=localStorage.getItem("token")

      try{
        const response=await fetch("http://localhost:5000/api/auth/me",{
          headers:{Authorization:`Bearer ${token}`}
        })

        const data=await response.json()

        if(!response.ok){
          throw new Error(data.message||"Could not load profile")
        }

        setName(data.name||"")
        setEmail(data.email||"")
        setProfileImage(data.profileImage||"")
      }catch(error){
        setMessage(error.message)
      }finally{
        setLoading(false)
      }
    }

    fetchProfile()
  },[])

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try{
      const token=localStorage.getItem("token")

      const response=await fetch("http://localhost:5000/api/auth/profile",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({name,profileImage})
      })

      const data=await response.json()

      if(!response.ok){
        throw new Error(data.message||"Could not update profile")
      }

      const savedUser={...user,...data}
      localStorage.setItem("user",JSON.stringify(savedUser))
      setName(savedUser.name||"")
      setProfileImage(savedUser.profileImage||"")
      setMessage("Profile updated successfully!")
    }catch(error){
      setMessage(error.message)
    }finally{
      setSaving(false)
    }
  }

  if(loading){
    return <main className="p-8 text-zinc-400">Loading profile...</main>
  }

  return(
    <main className="p-8">
      <section className="mx-auto max-w-2xl">
        <p className="text-sm text-zinc-500">YOUR ACCOUNT</p>
        <h1 className="mt-2 text-4xl font-bold">My Profile</h1>
        <p className="mt-3 text-zinc-400">Manage your BeatPulse details.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center gap-4">
            {profileImage?(
              <img
                src={profileImage}
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
            ):(
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold">
                {name.charAt(0).toUpperCase()||"U"}
              </div>
            )}

            <div>
              <p className="font-semibold">{name||"Your name"}</p>
              <p className="text-sm text-zinc-500">{email}</p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">Full name</label>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
              maxLength={60}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">Profile image URL</label>
            <input
              type="url"
              value={profileImage}
              onChange={(e)=>setProfileImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {message&&(
            <p className="text-sm text-zinc-300">{message}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-500 disabled:opacity-50"
          >
            {saving?"Saving...":"Save Changes"}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Profile
