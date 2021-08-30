import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { createConnection } from 'typeorm';
import { AddressesController } from '../../../src/controllers/addresses.controller';
import { Address } from '../../../src/entities/Address';
import { User } from '../../../src/entities/User';
import { AddressesProvider } from '../../../src/providers/addresses.provider';
import AddressFactory from '../../factories/AddressFactoty';
import UsersFactory from '../../factories/UsersFactory';

let app: INestApplication;

let user: User = null;
let connection = null;
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

it('Should delete a Address', async () => {

    const { body, status } = await request(app.getHttpServer()).delete(`/users/${user.id}/addresses/${address.id}`)
    expect(status).toBe(200)

    const storedAddress = await Address.findOne(address.id)
    expect(storedAddress).toBeFalsy()
})
