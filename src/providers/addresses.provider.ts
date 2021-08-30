import { HttpException, Injectable } from '@nestjs/common';
import { Address } from '../entities/Address';
import { User } from '../entities/User';
import addressService from '../services/address.service';
import { AddressParams } from '../types';
@Injectable()

export class AddressesProvider {
    async store(userId: number, body: AddressParams): Promise<Address> {
        try {
            const user = await User.findOneOrFail(userId);
            const params = addressService.cleanRequest(body)

            const address = Address.create({ ...params, user });
            return address.save();
        } catch (error) {
            throw new HttpException(error, 400)
        }
    }

    async edit(userId: number, id: number, body: AddressParams): Promise<Address> {
        try {
            const params = addressService.cleanRequest(body)

            const user = await User.findOneOrFail(userId);
            const address = await Address.findOneOrFail({ where: { id, user } });

            address.setAttributes(params)

            return address.save();
        } catch (error) {
            throw new HttpException("Address edit failed!", 400);
        }
    }

    async remove(userId: number, id: number): Promise<void> {
        try {
            const user = await User.findOneOrFail(userId);
            const address = await Address.findOneOrFail({ where: { id, user } });

            await address.remove();
        } catch (error) {
            throw new HttpException("Address not found!", 400);
        }
    }
}