const customersModels = require('../models/customers');
const usersModels = require('../models/users');
const customer = {
    store(body){
        return new Promise((resolve,reject)=>{
            //if(utils.validarEmail(body.email) ){
                usersModels.create(
                    { 
                        usuario: body.userEntity.userName,
                        email: body.userEntity.email,
                        password: utils.encrypt(body.userEntity.password),
                        state : body.userEntity.state
                    },(error, newUser)=>{
                        if(error)return reject({message:error , data:[]});
                        customersModels.create({
                            user_id: newUser._id,
                            birth:body.birth,
                            state : body.state
                        }, (error,newCustomer) => {
                            if(error)return reject({message:error , data:[]});
                            return resolve({message:"The User was inserted", data:newCustomer});
                        }) 
                    return resolve({message:"The User was inserted", data:newUser});
                  })
            /*  }else{
                return reject({message:"Wrong E-mail", data:newCustomer});
              } */
        });
    },
    list(){
        return new Promise((resolve,reject)=>{
            customersModels.find({active : true},
                (error,listCustomers)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The list of customers", data:listCustomers});
                })
            })
        },  
    listById(id){
        return new Promise((resolve,reject)=>{
            customersModels.findOne(
                { 
                    _id : id,
                    active : true 
                },
                { 
                    userName:true,
                    email:true,
                    birth:true,
                    social:true
                },(error,rowCustomer)=>{
                    if(error)return reject({message:error , data:[]});
                    if(!rowCustomer) return reject({message:"The customer does not exist ", data:[]});
                    return resolve({message:"The customer by " + id, data:rowCustomer});
                })
            })
        },
    delete(id){
        return new Promise((resolve,reject)=>{
            customersModels.update(
                { _id : id }, 
                {
                    $set:{ active : false }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The customer was deleted", data:[]});
                })
            })
        },
    update(body){
        return new Promise((resolve,reject)=>{
            customersModels.update(
                { _id : body._id },
                {
                    $set:{
                        userName:body.userName,
                        email:body.email,
                        password : utils.encrypt(body.password),
                        birth:body.birth,
                        social:body.social
                    }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The customer was updated", data:[]});
                })
            })
        } 
}
module.exports = customer;