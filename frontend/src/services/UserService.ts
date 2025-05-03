import $api from '../http/index';
import { AxiosResponse } from 'axios';
import {IUser} from '../models/IUser';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('api/auth/users');  // TODO: change path in routes for /auth/users
    }
}