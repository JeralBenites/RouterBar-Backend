const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    name:{ type:String,required:true },
    state: { type:String,required:false,default:'1' },  
    userRegister: { type:String,required:true }, 
    dateRegister:{ type:Date,default:new Date() },
    active:{ type:Boolean,default:true }
});

module.exports = mongoose.model('categorySchema', categorySchema);