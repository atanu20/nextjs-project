import Link from 'next/link'
// import { useRouter } from 'next/router'

import {auth} from '../firebase'
import {useEffect,useState} from 'react'
const Navbar = () => {
    // const router = useRouter()
    const [login, setLogin] = useState(false)
    const [user,setUser] = useState(null)
  useEffect(()=>{
       auth.onAuthStateChanged(user=>{
         if(user) setLogin(true)
         else setLogin(false)
       })
  },[])
    
    return (
        <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
  <Link  href="/"><a className="navbar-brand">BeBLOGGER</a></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto text-center">
      {
        login ? (
          <>
          <li className="nav-item active">
       <Link href="/createblog"><a className="nav-link">Post-Blog </a></Link>
      </li>
      <li className="nav-item">
     <button className="btn btn-dark" onClick={()=>auth.signOut()} >Logout</button>
      </li>

      </>
        ) : (
          <>
          <li className="nav-item active">
       <Link href="/login"><a className="nav-link">Login </a></Link>
      </li>
      <li className="nav-item active">
       <Link href="/register"><a className="nav-link">Register </a></Link>
      </li>
      

          </>
        )
      }
     
    </ul>
   
  </div>
</nav>
          
            
        </>
    )
}

export default Navbar
