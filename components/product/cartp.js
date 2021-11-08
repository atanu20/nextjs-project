
import { useContext, useEffect, useState } from 'react'
import { apiLinks } from '../../connection.config'
import { DataContext } from '../../utils/DataContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
const cartp = () => {
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(DataContext)
    const [amount, setAmount] = useState("");
    const [show ,setShow] = useState(false)

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
setShow(true)
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
    const handleDelete = (productId) => {
        const _cart = {...cart};
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.Totalitems -= qty;
        setCart(_cart);
        const updatedProductsList = products.filter((product) => product._id !== productId);
        setProducts(updatedProductsList);
    }
    
    const increment = (productId) => {
        const existingQty = cart.items[productId];
        if (existingQty === 5) {
            alert("Quantity never be greater than 5")
            return;
       }
        const _cart = {...cart};
        _cart.items[productId] = existingQty + 1;
        _cart.Totalitems += 1;
        setCart(_cart);
    }
    
    const decrement = (productId) => {
        const existingQty = cart.items[productId];
       if (existingQty === 1) {
        alert("Quantity never be less than 1")
            return;
       }
        const _cart = {...cart};
        _cart.items[productId] = existingQty - 1;
        _cart.Totalitems -= 1;
        setCart(_cart);
    }

    const getQty = (productId) => {
        return cart.items[productId];
    }
    const getSum = (productId, price) => {
        const sum = price * getQty(productId);
       
        
        return sum;
    }
    let total=0;
    useEffect(()=>{
        
            products.forEach(el => {
    
                
                total = total +( el.price * getQty(el._id) )
                // console.log(total)
            });
            setAmount(total)
        
        
    },[products])
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
        {
            show ? (
                <>
                 {
                products?.map((val, ind) => {
                    return (
                        <>
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12  mb-3">

                                <div className="card p-1">
                                    <img
                                        src={val.image}
                                        alt={val.name}
                                        className="pimg"

                                    />
                                    <div className="p-2">
                                        <p>{val.name}</p>
                                        <div className="f-box">
                                            <p>Rs {val.price}.00 x <span> {getQty(val._id)}</span> </p>
                                            <p>Rs {getSum(val._id,val.price)}.00</p>
                                        </div>
                                        <div className="f-box">
                                            <button className="btn btn-danger" onClick={()=>handleDelete(val._id)}><i class="fa fa-trash-o " aria-hidden="true"></i></button>
                                            <div>
                                               

                                                <button className="btn btn-dark" onClick={()=>decrement(val._id)}><i class="fa fa-minus" aria-hidden="true"></i></button>
                                    <input className="inpcart pl-2" type="text" value={getQty(val._id)} readOnly size="5"/>
                                    <button className="btn btn-dark" onClick={()=>increment(val._id)}><i class="fa fa-plus" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </>
                    )
                })
            }


<div className="text-right p-3">
                    <h3>Sub Total : {amount}</h3>
                    <h4>Total Amount With Delivery : {
                        amount < 1000 ? amount  + 100 : amount                        }  </h4>
                    <button className="btn btn-warning" onClick={()=>route.push("/cartdetails")}>Continue</button>
                    
                </div>

                </>
            ) : <div className="pt-5 text-center" > <h3>Data Loading . . .</h3></div>
        }
         
           

        </>
    )
}



export default cartp
