const ordersModels = require('../models/orders');
const order = {
    store(body){
        return new Promise((resolve,reject)=>{
            ordersModels.create({
                idCustomer:body.idCustomer,
                idPub:body.idPub,
                detail:body.detail,
                userRegister:body.userRegister
            },(error,newOrder) => {
                if(error)return reject({message:error , data:[]});
                return resolve({message:"The order was inserted", data:newOrder});
            })   
        });
    },
    list(){
        return new Promise((resolve,reject)=>{
            ordersModels.find({active : true},
                (error,listOrders)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The list of orders", data:listOrders});
                })
            })
        },  
    listById(id){
        return new Promise((resolve,reject)=>{
            ordersModels.findOne(
                { 
                    _id : id,
                    active : true 
                },
                { 
                    idCustomer:true,
                    idPub:true,
                    detail:true
                },(error,rowOrder)=>{
                    if(error)return reject({message:error , data:[]});
                    if(!rowOrder) return reject({message:"The order does not exist ", data:[]});
                    return resolve({message:"The order by " + id, data:rowOrder});
                })
            })
        },
    delete(id){
        return new Promise((resolve,reject)=>{
            ordersModels.update(
                { _id : id }, 
                {
                    $set:{ active : false }
                },(error)=>{
                    if(error)return reject({message:error , data:{}});
                    return resolve({message:"The order was deleted", data:{}});
                })
            })
        },
    update(body){
        return new Promise((resolve,reject)=>{
            ordersModels.update(
                { _id : body._id },
                {
                    $set:{
                        detail:body.detail
                    }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The order was updated", data:[]});
                })
            })
        } 
}
module.exports = order;