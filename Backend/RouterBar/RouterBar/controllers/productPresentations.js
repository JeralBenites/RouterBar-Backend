const productPresentationsModels = require('../models/productPresentations');
const productPresentation = {
    store(body){
        return new Promise((resolve,reject)=>{
            productPresentationsModels.create({
                idCategory:body.idCategory,
                product:body.product,
                presentation:body.presentation,
                image:body.image,
                unitPrice:body.unitPrice,
                userRegister:body.userRegister
            },(error,newProductPresentation) => {
                if(error)return reject({message:error , data:[]});
                return resolve({message:"The productPresentation was inserted", data:newProductPresentation});
            })   
        });
    },
    list(){
        return new Promise((resolve,reject)=>{
            productPresentationsModels.find({active : true},
                (error,listProductPresentations)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The productPresentation of orders", data:listProductPresentations});
                })
            })
        },  
    listById(id){
        return new Promise((resolve,reject)=>{
            productPresentationsModels.findOne(
                { 
                    _id : id,
                    active : true 
                },
                { 
                    idCategory:true,
                    product:true,
                    presentation:true,
                    image:true,
                    unitPrice:true
                },(error,rowProductPresentation)=>{
                    if(error)return reject({message:error , data:[]});
                    if(!rowProductPresentation) return reject({message:"The productPresentation does not exist ", data:[]});
                    return resolve({message:"The productPresentation by " + id, data:rowProductPresentation});
                })
            })
        },
    delete(id){
        return new Promise((resolve,reject)=>{
            productPresentationsModels.update(
                { _id : id }, 
                {
                    $set:{ active : false }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The productPresentation was deleted", data:[]});
                })
            })
        },
    update(body){
        return new Promise((resolve,reject)=>{
            productPresentationsModels.update(
                { _id : body._id },
                {
                    $set:{
                        idCategory:body.idCategory,
                        product:body.product,
                        presentation:body.presentation,
                        image:body.image,
                        unitPrice:body.unitPrice
                    }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The productPresentation was updated", data:[]});
                })
            })
        } 
}
module.exports = productPresentation;