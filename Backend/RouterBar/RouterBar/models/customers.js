const mongoose = require('mongoose');
const schema = mongoose.Schema;

const customerSchema = new schema({
    userName:{ type:String,required:true },
    email:{type:String,required:true,unique:true,index:true},
    password:{type:String,required:true,index:true},
    birth:{type:Date,required:true},
    social: {
        facebook: { type:String,required:false }, 
        twitter: { type:String,required:false }, 
        instagram:{ type:String,required:false }, 
        linkedin:{ type:String,required:false }, 
        wasap: { type:String,required:false }, 
        phone: { type:String,required:false }
    },
    state: { type:String,required:false,default:'1' },  
    userRegister: { type:String,required:true }, 
    dateRegister:{ type:Date,default:new Date() },
    active:{ type:Boolean,default:true }
});

module.exports = mongoose.model('customerSchema', customerSchema);