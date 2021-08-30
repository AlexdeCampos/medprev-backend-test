import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { createConnection } from 'typeorm';
import { UsersController } from '../../../src/controllers/users.controller';
import { User } from '../../../src/entities/User';
import { UsersProvider } from '../../../src/providers/users.provider';
import UsersFactory from '../../factories/UsersFactory';

let app: INestApplication;

let user: User = null;
let connection = null;

beforeAll(async () => {
    connection = await createConnection()

    user = await UsersFactory.create();

    const module = await Test.createTestingModule({
        providers: [UsersProvider],
        controllers: [UsersController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
})

afterAll(async () => {
    await connection.close();
})

it('Should delete a User', async () => {

    const { body, status } = await request(app.getHttpServer()).delete(`/users/${user.id}`)
    expect(status).toBe(200)

    const storedUser = await User.findOne(user.id)
    expect(storedUser).toBeFalsy()
})
