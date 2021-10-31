import React, { useState } from 'react'
import Layout from '../components/Layout'
import {auth} from '../firebase'
import { useRouter } from 'next/router'
const login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router=useRouter()
    const [dis, setDis] = useState(false)

const onsub=async(e)=>{
    e.preventDefault()
    setDis(true)
    try{
        const result = await auth.signInWithEmailAndPassword(email,password)
      if(result.user)
      {
        
        alert(`Welcome ${result.user.displayName}`)
        router.push('/createblog')
        setDis(false)
      }
      
      }catch(err){
          
       alert(err.message) 
       setDis(false)  
      }
      
}

    return (
        <>
            <Layout>
                <br />
                <div className="blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-10 col-12 mx-auto">
                                <div className="card p-3">
                                    <h4 className="text-center">Login Now</h4>
                                    <form onSubmit={onsub}>
                                        <div className="form-group">
                                            <label htmlFor="">Email:</label>
                                            <input type="email" placeholder="Enter Email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Password:</label>
                                            <input type="password" placeholder="Enter Password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                                        </div>
                                        <div className="text-center">
                                            <button className= {dis? "btn btn-success disable" : "btn btn-success"} disabled={dis}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<br /><br />
            </Layout>


        </>
    )
}

export default login
