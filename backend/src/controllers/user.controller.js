const userService = require('../service/user.service');

class UserController {
    async registration(req, res) {  
        try{
            const {email, password} = req.body;
            console.log("Request body:", req.body);

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            
            return res.json(userData);
        }catch(e){
            console.log("[REGISTRATION ERROR] ", e);
            res.status(500).json({message: 'Registration error'});
        }
    }
    async login(req, res) {  
        try{

        }catch(e){
            console.log("[LOGIN ERROR] ", e);
            res.status(500).json({message: 'Registration error'});
        }
    }
    async login(req, res) {  
        try{

        }catch(e){
            console.log("[LOGIN ERROR] ", e);
            res.status(500).json({message: 'Registration error'});
        }
    }
    async logout(req, res) {  
        try{

        }catch(e){
            console.log("[LOGOUT ERROR] ", e);
            res.status(500).json({message: 'Registration error'});
        }
    }
    async activate(req, res) {  
        try{

        }catch(e){
            console.log("[ACTIVATE ERROR] ", e);
            res.status(500).json({message: 'Registration error'});
        }
    }
    async refresh(req, res) {  
        try{

        }catch(e){
            console.log("[REFRESH ERROR] ", e);
            res.status(500).json({message: 'Registration error'});
        }
    }

    async getUsers(req, res) {  
        try{
            res.json({message: 'some users'});
        }catch(e){
            console.log("[GET_USERS ERROR] ", e);
            res.status(500).json({message: 'Registration error'});
        }
    }
}

module.exports = new UserController();