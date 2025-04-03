import dotev from 'dotenv'
dotev.config()

import {v4 as uniqueId} from 'uuid'
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)

// extra import ----------->

import { login,signup,uploadProfilePicture } from './controller/user.controller.js';
import { verifyToken } from './controller/token.controller.js';
import { Authorization } from './middleware/authorization.middleware.js';
import { deleteFile, downloadFile, fetchFile, shareFile, uploadFile } from './controller/file.controller.js';

import express from 'express'
const app = express()
app.listen(8080)

// builtIn middlware------------>

import bodyParser from 'body-parser'
import multer from 'multer';

// console.log(uniqueId())

//middlewares---------------->

app.use(express.static('storage'))
app.use(express.static('view'));
app.use(bodyParser.urlencoded({
    extended:false
}))


app.use(bodyParser.json())

//routes

app.get('/api',(req,res)=>{
    res.send('hello this is my home')
})

// setup upload destination

const storage = multer.diskStorage({
    destination:(req,res,next)=>{ 
       (res.fieldname==='picture' ?  next(null, 'storage/pictures') :  next(null, 'storage/file'))
    },
    filename:(req,res,next)=>{
    //    console.log(res.originalname)
       const ext = res.originalname.split(".").pop()
       res.fieldname==='picture'? next(null,`${req.user.id}.${ext}`): next(null,`${uniqueId()}.${ext}`)
    }
})

const upload = multer({
    storage:storage
})



//public apis------------->
app.post('/api/login',login)
app.post('/api/signup',signup)
app.post('/api/verify-token',verifyToken)


//private apis------------>
app.post('/api/upload-profile-picture',Authorization,upload.single('picture'),uploadProfilePicture)
app.post('/api/file',Authorization,upload.single('file'),uploadFile)
app.get('/api/file',Authorization,fetchFile)
app.delete('/api/file/:id',Authorization,deleteFile)
app.post('/api/file/download',Authorization,downloadFile)
app.post('/api/file/share',shareFile)





