const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const UserModel = require('../models/user.model');

const UserDto = require('../dtos/user.dto');

const MailService = require('./mail.service');
const TokenService = require('./token.service');

const ApiError = require('../utils/api-error.util');

class UserService {
    async registration(email, password) {
        try {
            const candidate = await UserModel.findOne({ email });

            if(candidate) {
                throw ApiError.BadRequest(`User with email ${email} already exists`);
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
            throw new ApiError.InternalServerError('Registration error', e);
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('User with this email not found');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);

        if(!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        const token = await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        };
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest('Invalid activation link');
        }
        user.isActivated = true;
        await user.save();
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
            ...tokens,
            user: userDto
        };
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }

}

module.exports = new UserService();