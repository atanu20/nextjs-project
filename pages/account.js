import axios from 'axios'
import {useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { apiLinks } from '../connection.config'
const account = () => {
  const [user ,setUser] = useState([])
  const [myorder ,setMyOrder] = useState([])
  const [emailname ,setEmailName] = useState("")
  const [show ,setShow] = useState(false)

  const getLogin=async()=>{
    const res=await axios.get( apiLinks.authVerify)
  // console.log(res.data)
  if(res.data.success)
  {
setUser(res.data.user)
setEmailName(res.data.user.email.split('@')[0])

  }
  else{
    setUser([])
  }
  }

const getOrder=async()=>{
 if(user.id)
 {
  const res=await axios.post( apiLinks.getmyorder,{
    userid:user.id
  })
  setShow(true)
  setMyOrder(res.data)
 }
 
}


  useEffect(() => {

    getLogin()
   
        }, [])

        useEffect(() => {

          
          getOrder()
              }, [user.id])
        
    return (
        <>
        <Layout>
        <div className="account">
          {
            show ? <div class="container">
            <h4>WelCome <span style={{color:'orangered'}}>{
          emailname
          
            } </span>
               Your Order Details</h4>
            
            <br /><br />
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>ORDER DATE</th>
                    <th>AMOUNT</th>
                    <th>PAYMENT STATUS</th>
                    <th>DELIVERED STATUS</th>
                    <th>ADDRESS</th>
          
                    <th>OPERATION</th>
                    
                   
                  </tr>
                </thead>
                <tbody>
                 {
                   myorder?.map((val,ind)=>{
                     return(
                       <>
                        <tr>
                    <td>{val._id}</td>
                    <td>{new Date().toDateString(val.Date)}</td>
                    <td>{val.totalPrice}</td>
                    <td>{val.isPaid ? 'paid' :'Not Paid'}</td>
                    <td>{val.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
                    <td>
                      <small>{val.shippingAddress.fullName}</small>
                     <br />
                     <small> {val.shippingAddress.phone}</small>

                     <br />
                     <small> {
                        val.shippingAddress.address
                      }
</small>
                    </td>
                    <td>
                        <button className="btn btn-info">View</button>
                    </td>
                   
                  </tr>

                       </>
                     )
                   })
                 }
                </tbody>
              </table>
            </div>
          </div> : <div className="pt-5 text-center" > <h3>Data Loading . . .</h3></div>
          }
        

</div>
        </Layout>
        
            
        </>
    )
}

export default account
