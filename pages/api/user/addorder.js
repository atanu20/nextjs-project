import dbconnection from "../../../utils/db";
import Order from "../../../model/order";
import OrderDetail from "../../../model/orderdetails";


export default async (req, res) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            await addOrder(req, res);
            break;
    }
}

const addOrder = async (req, res) => {
    try {

        const user = req.body.user;
        const useremail=req.body.useremail
        const amount = req.body.totalprice
        const products = req.body.products
        const cart = req.body.cart
        const place = req.body.shippingAddress


       


                
                        const order = new Order({
                            user: user,
                            totalPrice: amount,
                            isPaid: false,
                            paymentId: "abc",
                            shippingAddress:{
                                fullName:place.name,
                                phone:place.phone,
                                address:place.address
                            }
                
                
                        })
                        const orderid = await order.save();
                
                        for (let i = 0; i < products.length; i++) {
                
                
                
                            const data = new OrderDetail({
                                order_id: orderid._id,
                                product_id: products[i]._id,
                                product_qty: cart.items[products[i]._id],
                                product_price: products[i].price,
                                product_img: products[i].image,
                                product_name: products[i].name
                
                            })
                
                            await data.save()
                
                        }

                        res.status(201).json({success:true,orderid})

                    
        
      

       

    }
    catch (err) {
        res.json({ success: false, msg: err.message });
    }
}