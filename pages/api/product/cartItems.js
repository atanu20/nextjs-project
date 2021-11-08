import dbconnection from "../../../utils/db";
import Product from "../../../model/products";

dbconnection();

export default async (req, res) => {
    const { method } = req;
    switch(method){
        case 'POST':
            await getCartItems(req,res);
            break;
    }
}

const getCartItems=async(req,res)=>{
    try{
        let documents;
        // console.log(req.body.ids)
        
            documents = await Product.find({
                _id: { $in: req.body.ids },
            })
        
         res.json(documents);

    }
    catch(err)
    {
        res.json({ success: false,msg:"something wrong" });
    }
}