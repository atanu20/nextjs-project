import jwt from 'jsonwebtoken'

export const createToken=(payload)=>{
    let token=jwt.sign(payload,process.env.TOKEN_SECRECT,{
        expiresIn:'1d'
    })
    return token;

}