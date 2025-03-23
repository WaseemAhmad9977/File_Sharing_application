import ProductModel from './schema/productSchema.js'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

mongoose.connect('mongodb://localhost:27017/testDatabase')
.then(() => console.log('डेटाबेस कनेक्ट हो गया'))
.catch((err) => console.log('कनेक्शन में गलती:', err));

const app = express()

app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())

app.listen(3000,()=>{
    console.log('port is listening on port 3000')
})

app.use(express.static('view'))

app.get('/product',async (req,res)=>{
    try
    {
       const products = await ProductModel.find()
       res.status(200).json({
        products
       })
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
})

app.post('/product',async (req,res)=>{
    try
    {
     
      const products = new ProductModel(req.body)
      await products.save()
      res.status(200).json({
        products
      })
    }

    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
})

app.delete('/product/:id',async (req,res)=>{
    try
    {
      const id = req.params.id;
      const products = await ProductModel.findByIdAndDelete(id)
      res.status(200).json(products)
    }

    catch(err)
    {
        res.status(500).json({
           message:err.message
        })
    }
})

app.put('/product/:id',async (req,res)=>{
    try
    {
      const id = req.params.id;
      const data = req.body;
      const products = await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
      res.status(200).json(products)
    }

    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
})

