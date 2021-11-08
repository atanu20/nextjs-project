import React, { useState,useContext } from 'react'
import StarRatings from 'react-star-ratings';
import { DataContext } from '../../utils/DataContext'

const product = ({id,name,category,price,rating,review,image}) => {
const  { cart , setCart}=useContext(DataContext)
const [isAdding, setIsAdding] = useState(false);
// console.log(cart)
  

  const addtocart=()=>{
    

    let GlobalCart={...cart}
    if(!GlobalCart.items){
        GlobalCart.items={}
    }
    if(GlobalCart.items[id])
    {
        GlobalCart.items[id] += 1;
    }
    else{
        GlobalCart.items[id] = 1;
    }
    if(!GlobalCart.Totalitems)
    {
        GlobalCart.Totalitems = 0
    }
    
        GlobalCart.Totalitems += 1
    

    setCart(GlobalCart)
    setIsAdding(true);
    setTimeout(() => {
        setIsAdding(false);
    }, 2000);
    


    // console.log(cdata)
}
    return (
        <>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  mb-3">
                <div className="card p-1">
                 
                  <img 
                  src={image}
                  alt={name}
                  className="pimg"
                  
                  />
                  <div className="pt-3 pl-2">
                      <h5 style={{marginBottom:'-5px'}}>{name}</h5>
                      <h5 style={{color:'orangered'}}>Rs {price}</h5>
                      
                      <StarRatings
        rating={rating}
        starDimension="15px"
        starSpacing="3px"
        starRatedColor="orangered"
        
      /> <span class="badge badge-pill badge-success">{rating}</span>

      <br />
      <small > Reviews ({review}
      )</small>
                      
      <div className="text-right">
          <button className={isAdding ?"btn btn-success dis" : "btn btn-dark"} disabled={isAdding} onClick={addtocart}>{isAdding ? "Adding..." :"Add To Cart" } </button>
      </div>
                  </div>


                </div>
              </div>
            
        </>
    )
}

export default product
