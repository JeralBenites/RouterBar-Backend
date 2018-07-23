const categoriesModels = require('../models/categories');
const category = {
    store(body){
        return new Promise((resolve,reject)=>{
            categoriesModels.create({
                name:body.name,
                userRegister:body.userRegister
            },(error,newCategory) => {
                if(error)return reject({message:error , data:[]});
                return resolve({message:"The category was inserted", data:newCategory});
            })   
        });
    },
    list(){
        return new Promise((resolve,reject)=>{
            categoriesModels.find({active : true},
                (error,listCategories)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The list of categories", data:listCategories});
                })
            })
        },  
    listById(id){
        return new Promise((resolve,reject)=>{
            categoriesModels.findOne(
                { 
                    _id : id,
                    active : true 
                },
                {name:true},
                (error,rowCategory)=>{
                    if(error)return reject({message:error , data:[]});
                    if(!rowCategory) return reject({message:"The category does not exist ", data:[]});
                    return resolve({message:"The category by " + id, data:rowCategory});
                })
            })
        },
    delete(id){
        return new Promise((resolve,reject)=>{
            categoriesModels.update(
                { _id : id }, 
                {
                    $set:{ active : false }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The category was deleted", data:[]});
                })
            })
        },
    update(body){
        return new Promise((resolve,reject)=>{
            categoriesModels.update(
                { _id : body._id },
                {
                    $set:{
                        name : body.name
                    }
                },(error)=>{
                    if(error)return reject({message:error , data:[]});
                    return resolve({message:"The category was updated", data:[]});
                })
            })
        } 
}
module.exports = category;