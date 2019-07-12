var userRoutes = require('./UserRoutes');
module.exports = function(router){
    router.use('/users', userRoutes());

 return router;
}