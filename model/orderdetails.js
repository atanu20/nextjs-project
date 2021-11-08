import mongoose from 'mongoose';


const orderSchema=new mongoose.Schema({
   
    order_id:{
        type:String,
        require:true,
        trim:true
    },
    product_id:{
        type:String,
        require:true,
        trim:true
    },
    product_qty:{
        type:String,
        require:true,
        trim:true
    },
    product_price:{
        type:String,
        require:true,
        trim:true
    },
    product_img:{
        type:String,
        require:true,
        trim:true
    },
    product_name:{
        type:String,
        require:true,
        trim:true
    },
    
       
    date:{
        type:Date,
        default:Date.now
    }
})


const OrderDetail = mongoose.models.OrderDetail || mongoose.model('OrderDetail', orderSchema);
export default OrderDetail;