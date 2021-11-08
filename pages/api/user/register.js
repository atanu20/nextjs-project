

import dbconnection from "../../../utils/db";
import User from "../../../model/user";
import bcrypt from 'bcrypt'

dbconnection()

export default async (req, res) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            await register(req,res);
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

const register=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const exist=await User.findOne({email:email})
        if(exist)
        {
            res.json({ success: false,msg:'Email already exist' });
        }
        else{
           
            bcrypt.hash(password,10,async (err,hash)=>{
                const usedet=new User({email,password:hash})
                
                 
               await usedet.save();
            res.status(201).json({ success: true})
            })
            
        }

    }catch(err)
    {
        res.json({ success: false,msg:"something wrong" });

    }
}