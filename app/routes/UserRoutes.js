var UserController = require('../Controller/UserController');
//var authMiddleware = require('../middlewares/AuthMiddleware');
var router = require('express').Router();
module.exports = function(){
    const userCtrl = new UserController();
    router.post('/', userCtrl.Register);
    router.post('/login', userCtrl.Login);
     router.get('/:pagenumber/:pagesize', userCtrl.GetAll);
     router.put('/:id', userCtrl.UpdateUser);
     router.get('/:id', userCtrl.GetUserById);
     router.delete('/:id', userCtrl.Deleteuser);
     router.get('/search', userCtrl.SearchUser);

    // router.post('/updateprofile',  authMiddleware.authenticate, multer.upload.single('image'), authCtrl.updateClientProfile);

    return router;
}