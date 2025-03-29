import userModel from "../model/user.schema.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import path from 'path';


export const signup = async (req, res) => {
  try {
    const newUser =  new userModel(req.body)
    await newUser.save()

    res.status(200).json({
      message: "signup success",
    });
  } catch (err) {
    res.status(500).json({
      message:err.message,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "user does not exist",
      });

    const isLogin = await bcrypt.compare(password, user.password);

    if (!isLogin)
      return res.status(401).json({
        message: "Password incorrect !",
      });
    
    const payload = {
      id:user._id,
      fullname:user.fullname,
      email:user.email,
      picture:user.picture
    }

    const token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    
    res.status(200).json({
        message:'login success',
        token
    })

  } 
  catch (err) {
    res.status(500).json({
      // message: "Login failed please try again.",
      message:err.message,

    });
  }
};

export const uploadProfilePicture = async (req,res)=>{
  // console.log(req.file)
  const picture = path.join('pictures', req.file.filename).replace(/\\/g, '/');
  // console.log(picture)

  try{
     const user = await userModel.findByIdAndUpdate(req.user.id,{picture})

     const payload = {
      id:req.user.id,
      fullname:req.user.fullname,
      email:req.user.email,
      picture
    }

    const token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    
     if(!user)
      return res.status(500).json({
        message:'failed to upload profile picture'
      })
     
    return res.status(200).json(
      {
        message:'profile picture uploaded successfully',
        token
      }
    )
  }
  catch(err){
      res.status(500).json({
        message:'failed to upload profile picture'
      })
  }


}
