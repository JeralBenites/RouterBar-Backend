const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    idCustomer:{ type:String,required:true,index:true  },
    idPub:{ type:String,required:true,index:true  },
    detail: {
        codProductPresentation: { type:String,required:true }, 
        unitPrice: { type:Number,required:true }, 
        quantity:{ type:Number,required:true },
    },
    state: { type:String,required:false,default:'1' },  
    userRegister: { type:String,required:true }, 
    dateRegister:{ type:Date,default:new Date() },
    active:{ type:Boolean,default:true }
});

module.exports = mongoose.model('orderSchema', orderSchema);