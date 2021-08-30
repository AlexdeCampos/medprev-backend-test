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

it('Should return a User', async () => {
    const { body, status } = await request(app.getHttpServer()).get(`/users/${user.id}`)

    expect(status).toBe(200)

    expect(body).toHaveProperty('id')
    expect(body.id).toBe(user.id)

    expect(body).toHaveProperty('name')
    expect(body.name).toBe(user.name)

    expect(body).toHaveProperty('type')
    expect(body.type).toBe(user.type)

    expect(body).toHaveProperty('document')
    expect(body.document).toBe(user.document)

    expect(body).toHaveProperty('gender')
    expect(body.gender).toBe(user.gender)
})

it('Should return not found error', async () => {
    const { body, status } = await request(app.getHttpServer()).get(`/users/${user.id}1`)

    expect(status).toBe(404)
    expect(body.message).toBe('User not found')

})