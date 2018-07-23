const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email:{type:String,required:true,unique:true,index:true},
    password:{type:String,required:true,index:true},
    state: { type:String,default:'1' },  
    dateRegister:{ type:Date,default:new Date() },
    active:{ type:Boolean,default:true }
});

module.exports = mongoose.model('userSchema', userSchema);