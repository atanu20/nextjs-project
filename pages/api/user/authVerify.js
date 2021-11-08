

import dbconnection from "../../../utils/db";
import User from "../../../model/user";

import jwt from 'jsonwebtoken'

dbconnection()

export default async (req, res) => {
    try{
        const token=req.cookies.token;
        // console.log(token)
        if(!token) return res.json({ success: false,msg:"please login" });
        const result=jwt.verify(token,process.env.TOKEN_SECRECT)
        if(!result) return res.json({ success: false,msg:"Invalid Token" });
        const user=await User.findById(result.id)
        if(!user) return res.json({ success: false,msg:"User does not exist" });
res.json({
    success:true,
    user:{
        email:user.email,
        id:user._id
    }
})


    }catch(err)
    {
        res.json({ success: false,msg:"something wrong" });
    }
}

