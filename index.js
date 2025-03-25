import dotev from 'dotenv'
dotev.config()

import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)



import { login,signup,uploadProfilePicture } from './controller/user.controller.js';
import { verifyToken } from './controller/token.controller.js';

import express from 'express'
const app = express()


app.listen(8080)

import bodyParser from 'body-parser'


//middlewares
app.use(express.static('view'));
app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())

//routes

app.get('/api',(req,res)=>{
    res.send('hello this is my home')
})

app.post('/api/login',login)

app.post('/api/signup',signup)

app.post('/api/verify-token',verifyToken)

app.post('/api/upload-profile-picture',uploadProfilePicture)