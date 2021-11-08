import axios from 'axios'
import Cookies from 'js-cookie';
import Link from 'next/link'
// import { useRouter } from 'next/router'
import {useContext,useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { apiLinks } from '../connection.config'
import { useRouter } from 'next/router'
import { DataContext } from '../utils/DataContext';
const Navbar = () => {
    // const router = useRouter()
    const [login, setLogin] = useState(false)
    const  { cart , setCart}=useContext(DataContext)
const router=useRouter()
    const notify = (msg) => toast.warn(msg , {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });

const getLogin=async()=>{
  const res=await axios.get( apiLinks.authVerify)
  // console.log(res.data)
  if(res.data.success)
  {
    setLogin(true)
  }else{
    notify(res.data.msg)
  }
}
    useEffect(() => {

getLogin()
    }, [])
    
    const onLogout=()=>{
      Cookies.remove('token')
      console.clear()
      setLogin(false)
      router.push('/login')
    }
    return (
        <>
        <ToastContainer/>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <Link  href="/"><a class="navbar-brand">SMARTcART</a></Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto text-center">
      {
        login ? (
          <>
          <li class="nav-item active">
       <Link href="/cart"><a className="nav-link carti">Cart <span>{ cart.Totalitems ? cart.Totalitems : 0 } </span>
        </a></Link>
      </li>
      <li class="nav-item active">
       <Link href="/account"><a class="nav-link">Account </a></Link>
      </li>
      <li class="nav-item">
     <button className="btn btn-dark" onClick={onLogout} >Logout</button>
      </li>

      </>
        ) : (
          <>
          <li class="nav-item active">
       <Link href="/cart" ><a className="nav-link carti">Cart <span>{ cart.Totalitems ? cart.Totalitems : 0 }</span>
        </a></Link>
      </li>
      <li class="nav-item active">
       <Link href="/login"><a class="nav-link">Login </a></Link>
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
