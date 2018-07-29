const pubsModels = require('../models/pubs');
const fs = require('fs-extra');
const pub = {
    store(body,space){
        return new Promise((resolve,reject)=>{
            console.log(body);
            //resolve(body);
            pubsModels.create({
                name:body.name,
                address:body.address,
                image:space,
                hour:body.hour,
                hora24:body.hora24,
                delivery:body.delivery,
                social:body.social,
                userRegister:body.userRegister
            },(error,newPub) => {
                if(error)return reject({message:error , data:{}});
                return resolve({message:"The pub was inserted", data:newPub});
            })   
        });
    },
    list(){
        return new Promise((resolve,reject)=>{
            pubsModels.find({active : true},{image:false},
                (error,listPubs)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The list of pubs", data:listPubs});
                }).sort({_id: 'desc'})
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
                    address:true,
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
        listByName(body){
            return new Promise((resolve,reject)=>{
                pubsModels.find(
                    { 
                        name : { $regex: '.*' + body.name + '.*' },
                        active : true 
                    },
                    {image:false},
                    (error,listPubs)=>{
                        if(error)return reject({message:error , data:[]});
                        if(!listPubs) return reject({message:"The pub does not exist ", data:[]});
                        return resolve({message:"The pub by name " + body.name, data:listPubs});
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
                    if(error)return reject({message:error , data:{}});
                    return resolve({message:"The pub was deleted", data:{}});
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
                        address:body.address,
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
        } ,
        updateUrlImage(id,imagedata){
            return new Promise((resolve,reject)=>{
                pubsModels.update(
                    { _id : id },
                    {
                        $set:{
                            image:imagedata
                        }
                    },(error)=>{
                        if(error)return reject({message:error , data:[]});
                        return resolve({message:"The pub was updated", data:[{storage:imagedata}]});
                    })
                })
            } ,
            listByCoordenates(body){
                return new Promise((resolve,reject)=>{
                    pubsModels.find(
                        {
                            "address.loc":{
                                "$geoWithin": {
                                    "$center": [body.address.loc.coordinates, body.address.radius]
                                }
                            },
                            active : true 
                        },
                        {image:false},
                        (error,listPubs)=>{
                            if(error)return reject({message:error , data:[]});
                            if(!listPubs) return reject({message:"The pub does not exist ", data:[]});
                            return resolve({message:"The pub List" , data:listPubs});
                        })
                    })
                }
}
module.exports = pub;