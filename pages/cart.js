import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import Layout from '../components/Layout'
import Cartp from '../components/product/cartp'
import { apiLinks } from '../connection.config'
import { DataContext } from '../utils/DataContext'
const cart = () => {
    const  { cart , setCart}=useContext(DataContext)
  
    //  console.log(products)
    return (
        <>
            <Layout>
                <div className="cart">
                    <div className="container">
                        {
                            cart.Totalitems && <p className="tot">Total { cart.Totalitems } Itmes</p>
                        }
                    
                        <div className="row">
                     
                       <Cartp/>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default cart



// const getAllProductsData=()=>{
//     const  { cart }=useContext(DataContext)
//     fetch(apiLinks.getcartproducts, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ ids: Object.keys(cart.items)})
//     }).then(res => res.json())
//     .then(products => {
//        if(products)
//        {
//            return products;
//        }
//        else{
//            return [];
//        }
//     })
//   }
  
//   export async function getServerSideProps(context) {
//     try{
//       return { props: {
//               allproducts:  getAllProductsData()
//               } 
//           };
//       }
//       catch(err){
         
//           return { props: {allproducts:[]} };
//       }
//   }