import {useState} from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { apiLinks } from '../connection.config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Cookies from 'js-cookie'
const login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const route=useRouter()
// console.log(route)
    const notify = (msg) => toast.warn(msg , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });


    const onsub=async(e)=>{
        e.preventDefault()
        const res=await axios.post(apiLinks.login,{
            email,
            password
        })
       if(!res.data.success)
       {
        notify(res.data.msg)
        
       }
       else{
        Cookies.set('token', res.data.token, { expires: 1 })
        localStorage.setItem('next_ECOM_PROJECT_login',true)
        route.back()
       }
    }
    return (
        <>
<Layout>
<div className="auth">
    <ToastContainer/>
<div className="container">
    <div className="row">
        <div className="col-lg-5 col-md-7 col-sm-12 col-12 mx-auto">
            <div className="card p-3">
                <h5 className="text-center">Login Now</h5>
                <form onSubmit={onsub}>
                <div class="form-group">
  <label for="usr">Email:</label>
  <input type="email" class="form-control" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
</div>
<div class="form-group">
  <label for="pwd">Password:</label>
  <input type="password" class="form-control" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
</div>
<div className="text-center">
    <button className="btn btn-dark"type="submit" >Login</button>
</div>
<small onClick={()=>route.push("/register")} style={{cursor:'pointer'}}>Create an account.</small>

                </form>
            </div>
        </div>
    </div>
</div>

        </div>
</Layout>

            
        </>
    )
}

export default login
