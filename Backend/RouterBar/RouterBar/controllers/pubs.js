const pubsModels = require('../models/pubs');
const pub = {
    store(body){
        return new Promise((resolve,reject)=>{
            pubsModels.create({
                name:body.name,
                addres:body.addres,
                image:body.image,
                hour:body.hour,
                hora24:body.hora24,
                delivery:body.delivery,
                social:body.social,
                userRegister:body.userRegister
            },(error,newPub) => {
                if(error)return reject({message:error , data:[]});
                return resolve({message:"The pub was inserted", data:newPub});
            })   
        });
    },
    list(){
        return new Promise((resolve,reject)=>{
            pubsModels.find({active : true},
                (error,listPubs)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The list of pubs", data:listPubs});
                })
            })
        },  
    listById(id){
        return new Promise((resolve,reject)=>{
            pubsModels.findOne(
                { 
                    _id : id,
                    active : true 
                },
                { 
                    name:true,
                    addres:true,
                    image:true,
                    hour:true,
                    hora24:true,
                    delivery:true,
                    social:true
                },(error,rowPub)=>{
                    if(error)return reject({message:error , data:[]});
                    if(!rowPub) return reject({message:"The pub does not exist ", data:[]});
                    return resolve({message:"The pub by " + id, data:rowPub});
                })
            })
        },
    delete(id){
        return new Promise((resolve,reject)=>{
            pubsModels.update(
                { _id : id }, 
                {
                    $set:{ active : false }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The pub was deleted", data:[]});
                })
            })
        },
    update(body){
        return new Promise((resolve,reject)=>{
            pubsModels.update(
                { _id : body._id },
                {
                    $set:{
                        name:body.name,
                        addres:body.addres,
                        image:body.image,
                        hour:body.hour,
                        hora24:body.hora24,
                        delivery:body.delivery,
                        social:body.social
                    }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The pub was updated", data:[]});
                })
            })
        } 
}
module.exports = pub;