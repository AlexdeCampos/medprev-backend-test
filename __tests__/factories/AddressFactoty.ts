import * as faker from 'faker';
import { Address } from '../../src/entities/Address';
import { User } from '../../src/entities/User';

type AddressParams = {
    streetName?: string,
    number?: string,
    complement?: string,
    neighborhood?: string,
    city?: string,
    state?: string,
    zipCode?: string
}

async function create(user: User, params?: AddressParams): Promise<Address> {
    const address = Address.create({
        user,
        streetName: faker.address.streetName(),
        number: faker.random.alphaNumeric(),
        complement: faker.address.streetSuffix(),
        neighborhood: faker.random.words(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        ...params,
    })

    return address.save();
}

export default { create };