'use strict';

// const AuthStore = require('../stores/authentication.store');
const graphqlHTTP = require('express-graphql');

module.exports = function(app) {
// app.use('/api/v1', require('./routes.unauth'));
// app.use('/api/v1/admin', [AuthStore.authenticate, AuthStore.isAdmin], require('./routes.admin'));
// app.use('/api/techers',graphqlHTTP({schema,graphiql: true}),require('./Teachers'));
    app.use('/api/teachers',require('./Teachers'));
    app.use('/api/institution',require('./Institution'));
    app.use('/api/site_management',require('./Site_manager'));
    app.use('/api/job',require('./Job'));
    app.use('/api/verify',require('./Verification'));
    app.use('/api/training',require('./Training'));
    app.use('/api/cart',require('./cart'));
    app.use('/api/order',require('./order'));
    app.use('/api/auth',require('./auth'));
};
