const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pubSchema = new schema({
    name:{ type:String,required:true },
    address : { 
        coord: { 
            latitude:{ type:Number,required:true }, 
            longitud:{ type:Number,required:true } 
        },
        street: { type:String,required:true }
    },
    image: { type:String,required:true },    
    hour : { 
        hourOpen: { type:Date,required:false },
        hourClose: { type:Date,required:false }
    },
    hora24:{ type:Boolean,required:true },
    delivery:{ type:Boolean,required:true },
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

module.exports = mongoose.model('pubSchema', pubSchema);