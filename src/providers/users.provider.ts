import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/User';
import userService from '../services/user.service';
import { UserParams } from '../types';
@Injectable()

export class UsersProvider {
    async index() {
        return User.find({ relations: ['addresses'] })
    }

    async show(id: number): Promise<User> {
        try {
            const user = await User.findOneOrFail(id, { relations: ['addresses'] })
            return user
        } catch (e) {
            throw new NotFoundException({ message: 'User not found' });
        }
    }

    async store(body: UserParams): Promise<User> {
        try {
            const params = userService.cleanRequest(body)
            userService.validate(params)

            const user = User.create({ ...params });
            return user.save();
        } catch (error) {
            throw new HttpException(error, 400)
        }
    }

    async edit(id: number, body: UserParams): Promise<User> {
        try {
            const params = userService.cleanRequest(body)
            userService.validate(params)

            const user = await User.findOneOrFail(id);
            user.setAttributes(params)

            return user.save();
        } catch (error) {
            throw new HttpException('User edit failed!', 400)
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const user = await User.findOneOrFail(id)
            await user.remove();
        } catch (error) {
            throw new HttpException('User not found!', 400)
        }
    }
}