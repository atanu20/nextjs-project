

import dbconnection from "../../../utils/db";
import Order from "../../../model/order";


dbconnection()

export default async (req, res) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            await myorder(req,res);
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

const myorder=async(req,res)=>{
    try{
        const userid=req.body.userid
        const pro = await Order.find({user:userid}).sort({date:-1});
        res.send(pro)
        

    }catch(err)
    {
        res.json({ success: false,msg:"something wrong" });

    }
}