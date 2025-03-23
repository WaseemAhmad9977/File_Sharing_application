import { model,Schema } from "mongoose";
const ProductSchema = new Schema({
   title:{
    type:String,
    required:true,
   },
   price:{
    type:Number,
    required:true
   }
},{timestamps:true})

const ProductModel = new model('Product',ProductSchema)
export default ProductModel