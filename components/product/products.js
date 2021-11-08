import React from 'react'
import Product from './product'

const products = ({ allproducts }) => {
    
    // console.log(allproducts)
    return (
        <>
            <p className="tot">Total {allproducts.length} Itmes</p>

            <div className="row ">
                {
                    allproducts?.map((val, ind) => {
                        return (
                            <>
                               <Product 
                               key={ind} 
                               id={val._id}
                                name={val.name} 
                                image={val.image}
                                category={val.category} 
                                price={val.price}
                                rating={val.rating}
                                review={val.numReviews}
                                />
                            </>
                        )
                    })
                }


            </div>

        </>
    )
}

export default products
