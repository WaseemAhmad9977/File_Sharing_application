import jwt from 'jsonwebtoken'
export const Authorization = async (req,res,next)=>{
    const auth = req.headers.authorization
    if(!auth)
        return res.status(400).send('Bad request')
    
     const [type,token] = auth.split(" ")
   //   console.log(type,token)

     if(type !=='Bearer')
        res.status(400).send('Bad request')
     try{
        const user = await jwt.verify(token,process.env.JWT_SECRET)
        req.user = user;
      //   console.log(user)
        next()
     }
     catch(err){
        res.status(400).send('Bad request')
     }
   
}