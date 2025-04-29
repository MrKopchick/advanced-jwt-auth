const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const UserModel = require('../models/user.model');

const UserDto = require('../dtos/user.dto');

const MailService = require('./mail.service');
const TokenService = require('./token.service');

class UserService {
    async registration(email, password) {
        try {
            const candidate = await UserModel.findOne({ email });

            if(candidate) {
                throw new Error('User with this email already exists');
            }
            
            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = uuid.v4();

            const user = await UserModel.create({ email, password: hashPassword , activationLink });
            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);
            
            const userDto = new UserDto(user);
            const tokens = TokenService.generateTokens({ ...userDto });

            await TokenService.saveToken(userDto.id, tokens.refreshToken);
            
            return {
                ...tokens,
                user: userDto
            };

        } catch (e) {
            console.error("[REGISTRATION ERROR]", e);
            throw new Error('Registration error');
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw new Error('User not found');
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();