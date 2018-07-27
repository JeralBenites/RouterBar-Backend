const mongoose = require('mongoose');
const schema = mongoose.Schema;

const customerSchema = new schema({
    user_id:{ type:String,required:false },
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
    dateRegister:{ type:Date,default:new Date() },
    active:{ type:Boolean,default:true }
});

module.exports = mongoose.model('customerSchema', customerSchema);