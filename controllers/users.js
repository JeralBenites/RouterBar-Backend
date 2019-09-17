const usersModels = require('../models/users');
const user = {
    login(body){
        return new Promise(( resolve, reject)=>{
            usersModels.findOne(
            { 
                email: body.email,
                password: utils.encrypt(body.password),
                active: true
            },
            (error, rowUser)=>{
                if( error ) return reject({message:error , data:[]} )
                if( !rowUser ) return reject({message:"User does not exist", data:[]})
                return resolve({message:"the user has been found", data:rowUser});
            })
        })
    },
    store(body){
        return new Promise(( resolve, reject)=>{
            if(utils.validarEmail(body.email) ){
                usersModels.create(
                    { 
                        usuario: body.usuario,
                        email: body.email,
                        password: utils.encrypt(body.password)
                    },(error, newUser)=>{
                        if(error)return reject({message:error , data:[]});
                        return resolve({message:"The User was inserted", data:newUser});
                    })
                }else{
                    return reject({message:"Wrong E-mail", data:[]});
                }
            })
        },
        list(){
            return new Promise((resolve,reject)=>{
                usersModels.find({active : true},
                    { 
                        email:true
                    },
                    (error,listUsers)=>{
                        if(error)return reject({message:error , data:[]});
                        return resolve({message:"The list of Users", data:listUsers});
                    })
                })
            }
    }
module.exports = user;