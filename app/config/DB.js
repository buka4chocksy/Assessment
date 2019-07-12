var mongoose = require('mongoose');

const uri = process.env.DB_URI;

module.exports = function init(){
    if(uri){
        mongoose.connect(
            uri , {
                useNewUrlParser: true,
                useCreateIndex:true
            }, 
            (err)=>{
               if(err){
                   console.log('Server not connected to databsase ', err)
               }else{

                   console.log("Connnection to MongoDb Successfull");
               } 
            }
        )
    }else{
        throw new Error("DB URI not found, please kindly check your connection !!");
    }
}