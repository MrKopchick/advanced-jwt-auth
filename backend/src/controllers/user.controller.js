const userService = require('../service/user.service');
const {validationResult} = require('express-validator');    
const ApiError = require('../utils/api-error.util');

class UserController {
    async registration(req, res) {  
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {  
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }

            const {email, password} = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }
    async login(req, res) {  
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async logout(req, res) {  
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }catch(e){
            next(e);
        }
    }
    async activate(req, res) {  
        try{
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }catch(e){
            next(e);
        }
    }
    async refresh(req, res) {  
        try{

        }catch(e){
            next(e);
        }
    }

    async getUsers(req, res) {  
        try{
            res.json({message: 'some users'});
        }catch(e){
            next(e);
        }
    }
}

module.exports = new UserController();