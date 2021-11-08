

import dbconnection from "../../../utils/db";
import User from "../../../model/user";
import bcrypt from 'bcrypt'
import { createToken } from "../../../utils/createToken";

dbconnection()

export default async (req, res) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            await login(req,res);
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const exist=await User.findOne({email:email})
        if(!exist) return res.json({ success: false,msg:"User does not exist" });
        const ismatch=await bcrypt.compare(password,exist.password)
        if(!ismatch) return res.json({ success: false,msg:"Incorrect password" });

        const token=createToken({id:exist._id})
        res.json({
            success:true,
            token,
            user:{
                email:exist.email,
                id:exist._id
            }

        })

    }catch(err)
    {
        res.json({ success: false,msg:"something wrong" });

    }
}