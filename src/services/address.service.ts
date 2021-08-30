import { DeepPartial } from 'typeorm';
import { AddressParams } from '../types';
import cleanObject from './cleanObject';

export default {
    cleanRequest(address: AddressParams): DeepPartial<AddressParams> {
        const rules = {
            streetName: true,
            number: true,
            complement: true,
            neighborhood: true,
            city: true,
            state: true,
            zipCode: true,
        }

        return cleanObject(address, rules);
    }
}