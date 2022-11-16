'use strict';

const output = require('../helper/api');

class AuthController {
   
    logout(req,res){
        try {
            res.clearCookie('session')
            output.ok(req, res, {}, "Logged out", 1)
        } catch(error) {
            console.log(error)
            output.serverError(req, res, error)
        }
    }

}

module.exports = new AuthController();
