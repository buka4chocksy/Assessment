var model = require('../Model/Users');
var jwt = require('jsonwebtoken');
var secret = process.env.Secret;
var bcrypt = require('bcryptjs');

exports.RegisterUser = (options)=>{
    return new Promise((resolve, reject)=>{
        var hash = bcrypt.hashSync(options.Password , 10);
        console.log(hash , 'hash thing');
        var user = {
            Username:options.Username,
            Password:hash,
            Firstname: options.Firstname,
            Lastname:options.Lastname,
            Gender:options.Gender,
            Date_of_birth:options.Date_of_birth
        }
        console.log(user , 'user details')
        model.findOne({Username:user.Username}).then(found =>{
            if(found){
                reject({Code: 500 , message:'User already exist'});
            }else{
               model.create(user).then(created =>{
                if(created){
                    resolve({Code:200 , Data:created });
                }
              })
            }
        }).catch(err =>{
            reject(err);
        })
    })
}

function authenticateuser(username, password){
    return new Promise((resolve, reject)=>{
        if(username.length == 0 || password.length == 0){
            resolve({ Code:400 , message:'authentication credentials incomplete'});

        }else{
            model.findOne({Username: username}).then((user)=>{   
                      
                if(!user){
                    resolve({Code:400 , Data:'could not authenticate user'});
                }else{
                    var validPassword = bcrypt.compareSync(password, user.Password);
                    console.log(validPassword , 'user found') 
                    if(validPassword){
                        model.find({Username:username}).then(userdetail =>{
                            generateToken(userdetail).then((token)=>{
                                resolve({Code:true , data: {user, token : token }})
                            }).catch((err)=>{
                                resolve({Code: 400, data:err, message:'could not authenticate user'});
                            })
                            })
                    }else{
                        resolve({Code: 400, message:'incorrect email or password'});
 
                    }
                }
            
            }).catch((err)=>{
                reject(err);
            })
        }
    })
}

exports.authenticateuser = authenticateuser

exports.GetAllUsers = (pagenumber = 1, pagesize = 20) => {
    return new Promise((resolve, reject) => {
        model.find().skip((parseInt(pagenumber - 1) * parseInt(pagesize))).limit(parseInt(pagesize))
            .exec((err, users) => {
                if (err) {
                    reject({ Code: 400, data: err, message: "something went wrong" });
                }
                if (users) {
                    resolve({ Code: 200 , Data: users });
                } else {
                    resolve({ Code: 400, message: 'Could not get Users ' });
                }
            })
    })
}

exports.UpdateUsers = (options,id) =>{
    return new Promise((resolve, reject)=>{
        var updateDetail = {
            Firstname: options.Firstname,
            Lastname:options.Lastname,
            Gender:options.Gender,
            Date_of_birth:options.Date_of_birth,
            Date_updated: new Date() ,

        }
        model.findOneAndUpdate({_id:id }, updateDetail).then(updated =>{
            if(updated){
                model.findById({_id:id}).then(found =>{  resolve({ Code: 200 , Data: found });})
            }else{
                resolve({Code:400 , message:'Could not update user ' })
            }
        }).catch(err =>{
            reject(err);
        })
    })
}

exports.SearchUser = function(option){
    console.log("search variablee", option)
    return new Promise((resolve, reject)=>{
        model.find({$text: { $search:option, $caseSensitive : false}}).then((data)=>{
        console.log(data ,  'data from search')
        if(data ==  null){
            resolve({success:false , message: 'Search not found !!'})
        }else{
            resolve({success:true , data:data , message: 'Details from search'})
        }
    }).catch(err =>{
        reject(err);
    })
    })
}

exports.GetUserById = (id) =>{
    return new Promise((resolve, reject)=>{
        model.findById({_id:id}).then(found =>{
            if(found){
               resolve({ Code: 200 , Data: found }); 
            }else{
                resolve({Code:400 , message:'Could not find user ' })  
            }
        }).catch(err =>{
            reject(err)
        })
    })
}

exports.DeleteUser = (id) =>{
    return new Promise((resolve, reject)=>{
        model.findByIdAndDelete({_id:id}).then(found =>{
            if(found){
                model.findById({_id:id}).then(found =>{  resolve({ Code: 200 , Data: found });})
            }else{
                resolve({Code:400 , message:'Could not find user ' })  
            }
        }).catch(err =>{
            reject(err)
        })
    })
}

function generateToken(data ={}){
    return new Promise((resolve, reject)=>{
        jwt.sign({...data}, secret, {expiresIn: '24hrs'}, function(err, token){
            if(err){
                reject(err);
            }else{
                resolve(token);
            }
        });
    })
}

exports.generateToken = generateToken;

function verifyToken (token= ""){
    return new Promise((resolve, reject)=>{
        jwt.verify(token.replace("Bearer", ""), secret, function(err, decodedToken ){
            if(err){
                reject(err);
            }else{
                resolve(decodedToken);
            }
        });
    });
};
exports.verifyToken = verifyToken;
