import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import * as request from 'supertest';
import { createConnection } from 'typeorm';
import { AddressesController } from '../../../src/controllers/addresses.controller';
import { Address } from '../../../src/entities/Address';
import { AddressesProvider } from '../../../src/providers/addresses.provider';
import AddressFactory from '../../factories/AddressFactoty';
import UsersFactory from '../../factories/UsersFactory';

let app: INestApplication;

let connection = null;
let user = null
let address = null

beforeAll(async () => {
    connection = await createConnection()

    user = await UsersFactory.create();
    address = await AddressFactory.create(user)

    const module = await Test.createTestingModule({
        providers: [AddressesProvider],
        controllers: [AddressesController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
})

afterAll(async () => {
    await connection.close();
})

it('Should create a Address', async () => {
    const params = {
        streetName: faker.address.streetName(),
        number: faker.random.alphaNumeric(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode()
    }

    const { body, status } = await request(app.getHttpServer()).put(`/users/${user.id}/addresses/${address.id}`).send(params)

    expect(status).toBe(200)

    expect(body).toHaveProperty('streetName')
    expect(body.streetName).toBe(params.streetName)

    expect(body).toHaveProperty('number')
    expect(body.number).toBe(params.number)

    expect(body).toHaveProperty('city')
    expect(body.city).toBe(params.city)

    expect(body).toHaveProperty('state')
    expect(body.state).toBe(params.state)

    expect(body).toHaveProperty('zipCode')
    expect(body.zipCode).toBe(params.zipCode)

    const storedAddress = await Address.findOne(address.id);

    expect(storedAddress.id).toBe(body.id)
    expect(storedAddress.streetName).toBe(body.streetName)
    expect(storedAddress.number).toBe(body.number)
    expect(storedAddress.city).toBe(body.city)
    expect(storedAddress.state).toBe(body.state)
    expect(storedAddress.zipCode).toBe(body.zipCode)

})
