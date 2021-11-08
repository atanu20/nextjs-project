import { useContext, useEffect, useState } from 'react'
import { apiLinks } from '../connection.config'
import { DataContext } from '../utils/DataContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout'
import axios from 'axios'
import Cookies from 'js-cookie'

const cartdetails = () => {
    const [products, setProducts] = useState([]);
    const { cart, setCart, address, setAddress, phone, setPhone,name, setName } = useContext(DataContext)
    const [amount, setAmount] = useState("");
    const [userId, setUserId] = useState([]);


    const route = useRouter()
    const getPro = () => {
        //  console.log(JSON.stringify({ ids: Object.keys(cart.items)}))
        fetch(apiLinks.getcartproducts, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: Object.keys(cart.items) })
        }).then(res => res.json())
            .then(products => {
                setProducts(products)

            })
    }

    useEffect(() => {
        if (cart.Totalitems > 0) {
            getPro()
        }
    }, [cart]);

    useEffect(() => {
        
        if (cart.Totalitems > 0) {
            getPro()
        }
    }, []);

    const getQty = (productId) => {
        return cart.items[productId];
    }

    const getSum = (productId, price) => {
        const sum = price * getQty(productId);


        return sum;
    }

    let total = 0;
    useEffect(() => {

        products.forEach(el => {


            total = total + (el.price * getQty(el._id))
            // console.log(total)
        });
        setAmount(total)


    }, [products])

    const getLogin=async()=>{
        const res=await axios.get( apiLinks.authVerify)
        // console.log(res.data)
        if(!res.data.success)
        {
            route.push("/login")
        }
        else{
            setUserId(res.data.user)
            // console.log(res.data.user.id)
        }
      }
          useEffect(() => {
      
      getLogin()
          }, [])

const onsub=async(e)=>{
    e.preventDefault()
    Cookies.set('_next_user_name',name)
     Cookies.set('_next_user_address',address)
     Cookies.set('_next_user_phone',phone)
     const res=await axios.post(apiLinks.addorder,{
        user:userId.id,
        useremail:userId.email,
        totalprice: amount < 1000 ? amount + 100 : amount,    
        products:products,
        cart:cart,
        shippingAddress:{
            name,
            phone,
            address

        }

    })

    if(res.data.success)
    {
        route.push('/account')
        setCart({})
    }
    

    // console.log(JSON.stringify(dat))
    // console.log(dat)
}
// const placeOrder=async()=>{
   
// }

    if (!cart.Totalitems) {
        return (
            <>
                <div className="m-auto">
                    <img src="Empty-Cart.jpg" alt="" width="270px" />
                    <div className="text-center">
                        <button className="btn btn-dark" onClick={() => route.push('/')}>Continue Shopping</button>
                    </div>
                </div>
            </>

        )
    }
    return (
        <>
            <Layout>
                <div className="cart">
                    <div className="container">
                        {
                            cart.Totalitems && <p className="tot">Total {cart.Totalitems} Itmes</p>
                        }

                        <div className="row">

                            <div className="col-lg-8 col-md-7 col-12 mb-3">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Details</th>
                                                <th>Amount</th>
                                                <th>Qty</th>
                                                <th>Total Amount</th>



                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products?.map((val, ind) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>

                                                                    <img src={val.image} alt={val.name} className="cart_Det" /> <br />
                                                                    <small>{val.name}</small>

                                                                </td>
                                                                <td>  ₹ {val.price}.00</td>
                                                                <td>{getQty(val._id)}</td>
                                                                <td>₹ {getSum(val._id, val.price)}.00</td>

                                                            </tr>

                                                        </>
                                                    )
                                                })
                                            }





                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className="col-lg-4 col-md-5 col-12 mb-3">
                                <div className="card p-2">
                                    <form onSubmit={onsub}>
                                    <div class="form-group">
                                            <label for="usr">Name:</label>
                                            <input type="text" placeholder="Enter Name" class="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                        </div>
                                        <div class="form-group">
                                            <label for="usr">Phone:</label>
                                            <input type="number" placeholder="Enter Phone Number" class="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                        </div>
                                        <div class="form-group">
                                            <label for="comment">Address:</label>
                                            <textarea class="form-control" placeholder="Enter Address" rows="3" id="comment" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
                                        </div>
                                        <p style={{fontSize:'14px',color:'red'}} >If total amount is less then Rs 1000 , then Rs 100 will added as a delivery charge </p> <br />
                                        <button className="btn btn-dark btn-block" > PAY { amount < 1000 ? amount + 100 : amount}  </button>
                                    </form>
                                </div>
                                {/* <div className="text-right p-3">
                                    <h3>Sub Total : {amount}</h3>
                                    <h4>Total Amount With Delivery : 
                                       { amount < 1000 ? amount + 100 : amount}  </h4>
                                    <button className="btn btn-warning" onClick={() => route.push("/")}>PayNow</button>

                                </div> */}
                            </div>

                        </div>


                    </div>
                </div>
            </Layout>

        </>
    )
}

export default cartdetails
