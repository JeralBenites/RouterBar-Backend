const catalogsModels = require('../models/catalogs');
const catalog = {
    store(body){
        return new Promise((resolve,reject)=>{
            catalogsModels.create({
                idBar:body.idBar,
                idProductPresentation:body.idProductPresentation,
                price:body.price, 
                userRegister:body.userRegister
            },(error,newCatalog) => {
                if(error)return reject({message:error , data:[]});
                return resolve({message:"The catalog was inserted", data:newCatalog});
            })   
        });
    },
    list(){
        return new Promise((resolve,reject)=>{
            catalogsModels.find({active : true},
                (error,listCatalogs)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The list of catalogs", data:listCatalogs});
                })
            })
        },  
    listById(id){
        return new Promise((resolve,reject)=>{
            catalogsModels.findOne(
                { 
                    _id : id,
                    active : true 
                },
                {
                    idBar:true,
                    idProductPresentation:true,
                    price:true,
                    state: true            
                },(error,rowCatalog)=>{
                    if(error)return reject({message:error , data:[]});
                    if(!rowCatalog) return reject({message:"The catalog does not exist ", data:[]});
                    return resolve({message:"The catalog by " + id, data:rowCatalog});
                })
            })
        },
    delete(id){
        return new Promise((resolve,reject)=>{
            catalogsModels.update(
                { _id : id }, 
                {
                    $set:{ active : false }
                },(error)=>{
                    if(error)return reject({message:error , data:{}});
                    return resolve({message:"The catalog was deleted", data:{}});
                })
            })
        },
    update(body){
        return new Promise((resolve,reject)=>{
            catalogsModels.update(
                { _id : body._id },
                {
                    $set:{
                        price : body.price,
                        state : body.state
                    }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The catalago was updated", data:[]});
                })
            })
        } 
}
module.exports = catalog;