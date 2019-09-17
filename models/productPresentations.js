const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productPresentationSchema = new schema({
    idCategory: {type:String,required:true,index:true},
    product: {type:String,required:true},
    presentation: {type:String,required:true},   
    image: {type:String,required:true},
    unitPrice: { type:Number,required:true }, 
    state: { type:String,required:false,default:'1' },  
    userRegister: { type:String,required:true }, 
    dateRegister:{ type:Date,default:new Date() },
    active:{ type:Boolean,default:true }
});

module.exports = mongoose.model('productPresentationSchema', productPresentationSchema);