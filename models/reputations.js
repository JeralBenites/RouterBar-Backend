const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reputationSchema = new schema({
    idCustomer:{ type:String,required:true,index:true },
    idPub:{ type:String,required:true,index:true },   
    reputation:{type:Number,required:true},
    comment:{type:String,required:true},
    state: { type:String,required:false,default:'1' },  
    userRegister: { type:String,required:true }, 
    dateRegister:{ type:Date,default:new Date() },
    active:{ type:Boolean,default:true }
});

module.exports = mongoose.model('reputationSchema', reputationSchema);