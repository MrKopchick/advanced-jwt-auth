class UserController {
    async registration(req, res) {  
        try{

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