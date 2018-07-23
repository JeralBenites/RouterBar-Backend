const mongoose = require('mongoose');
const schema = mongoose.Schema;

const catalogSchema = new schema({
    idBar:{ type:String,required:true,index:true  },
    idProductPresentation:{ type:String,required:true,index:true  },
    price:{ type:Number,required:true },
    state: { type:String,required:false,default:'1' },  
    userRegister: { type:String,required:true }, 
    dateRegister:{ type:Date,default:new Date() },
    active:{ type:Boolean,default:true }
});

module.exports = mongoose.model('catalogSchema', catalogSchema);