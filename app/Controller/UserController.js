var services = require('../Service/UserService');

module.exports = function  UserControllers(){
    this.Register = (req,res, next)=>{
        var option =  {
            Username: req.body.username,
            Password: req.body.password,
            Firstname: req.body.firstname,
            Lastname:req.body.lastname,
            Gender:req.body.gender,
            Date_of_birth:req.body.dateofbirth
        }
        services.RegisterUser(option).then((data)=>{
            res.status(200).send({data});
        }).catch(err =>{
            res.status(500).send({err});
        })
    }

    this.Login = (req,res, next)=>{
        var option =  {
            Username: req.body.username,
            Password: req.body.password,
        }
        services.authenticateuser(option.Username,option.Password).then((data)=>{
            res.status(200).send({data});
        }).catch(err =>{
            res.status(500).send({err});
        })
    }

    this.GetAll = (req, res) => {
        services.GetAllUsers(req.params.pagenumber, req.params.pagesize).then((data) => {
            res.status(200).send({data})
        }).catch((err) => {
            res.status(500).send({err});
        });
    };

    
    this.UpdateUser = (req, res) => {
        var option =  {
            Firstname: req.body.firstname,
            Lastname:req.body.lastname,
            Gender:req.body.gender,
            Date_of_birth:req.body.dateofbirth
        }
        services.UpdateUsers(option, req.params.id).then((data) => {
            res.status(200).send({data})
        }).catch((err) => {
            res.status(500).send({err});
        });
    };

    this.SearchUser = (req, res) => {
        var option = req.body.search 
        services.SearchUser(option).then((data) => {
            res.status(200).send({data})
        }).catch((err) => {
            res.status(500).send({err});
        });
    };

    this.GetUserById = (req, res) => {
        services.GetUserById(req.params.id).then((data) => {
            res.status(200).send({data})
        }).catch((err) => {
            res.status(500).send({err});
        });
    };

    this.Deleteuser = (req, res) => {
        services.DeleteUser(req.params.id).then((data) => {
            res.status(200).send({data})
        }).catch((err) => {
            res.status(500).send({err});
        });
    };
}