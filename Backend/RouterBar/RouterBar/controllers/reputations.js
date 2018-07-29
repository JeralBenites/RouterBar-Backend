const reputationsModels = require('../models/reputations');
const reputation = {
    store(body){
        return new Promise((resolve,reject)=>{
            reputationsModels.create({
                idCustomer:body.idCustomer,
                idPub:body.idPub,
                reputation:body.reputation, 
                comment:body.comment
            },(error,newReputation) => {
                if(error)return reject({message:error , data:[]});
                return resolve({message:"The reputation was inserted", data:newReputation});
            })   
        });
    },
    list(){
        return new Promise((resolve,reject)=>{
            reputationsModels.find({active : true},
                (error,listReputations)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The list of reputations", data:listReputations});
                })
            })
        },  
    listById(id){
        return new Promise((resolve,reject)=>{
            reputationsModels.findOne(
                { 
                    _id : id,
                    active : true 
                },
                {
                    idCustomer:true,
                    idPub:true,
                    reputation:true,
                    comment: true            
                },(error,rowReputation)=>{
                    if(error)return reject({message:error , data:[]});
                    if(!rowCatalog) return reject({message:"The reputation does not exist ", data:[]});
                    return resolve({message:"The reputation find ", data:rowReputation});
                })
            })
        },
    delete(id){
        return new Promise((resolve,reject)=>{
            reputationsModels.update(
                { _id : id }, 
                {
                    $set:{ active : false }
                },(error)=>{
                    if(error)return reject({message:error , data:{}});
                    return resolve({message:"The reputation was deleted", data:{}});
                })
            })
        },
    update(body){
        return new Promise((resolve,reject)=>{
            reputationsModels.update(
                { _id : body._id },
                {
                    $set:{
                        comment : body.comment,
                        reputation : body.reputation
                    }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The reputation was updated", data:[]});
                })
            })
        } 
}
module.exports = reputation;