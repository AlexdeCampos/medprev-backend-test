import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';
import * as request from 'supertest';
import { createConnection } from 'typeorm';
import { AddressesController } from '../../../src/controllers/addresses.controller';
import { User } from '../../../src/entities/User';
import { AddressesProvider } from '../../../src/providers/addresses.provider';
import UsersFactory from '../../factories/UsersFactory';

let app: INestApplication;

let connection = null;
let user = null

beforeAll(async () => {
    connection = await createConnection()

    user = await UsersFactory.create();

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

    const { body, status } = await request(app.getHttpServer()).post(`/users/${user.id}/addresses`).send(params)

    expect(status).toBe(201)

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

    const storedUser = await User.findOne(user.id, { relations: ['addresses'] });

    expect(storedUser).toHaveProperty('addresses')
    expect(storedUser.addresses.length).toBe(1)

    expect(storedUser.addresses[0].id).toBe(body.id)
    expect(storedUser.addresses[0].streetName).toBe(body.streetName)
    expect(storedUser.addresses[0].number).toBe(body.number)
    expect(storedUser.addresses[0].city).toBe(body.city)
    expect(storedUser.addresses[0].state).toBe(body.state)
    expect(storedUser.addresses[0].zipCode).toBe(body.zipCode)

})
