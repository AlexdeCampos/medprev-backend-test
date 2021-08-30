import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { createConnection } from 'typeorm';
import { UsersController } from '../../../src/controllers/users.controller';
import { User } from '../../../src/entities/User';
import { UsersProvider } from '../../../src/providers/users.provider';
import UsersFactory from '../../factories/UsersFactory';

let app: INestApplication;

let user1: User = null;
let user2: User = null;
let user3: User = null;
let connection = null;

beforeAll(async () => {
    connection = await createConnection()

    user1 = await UsersFactory.create();
    user2 = await UsersFactory.create();
    user3 = await UsersFactory.create();

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

it('Should return a list of Users', async () => {
    const { body, status } = await request(app.getHttpServer()).get('/users')

    expect(status).toBe(200)

    expect(body.length).toBe(3)

    expect(body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ id: user1.id, name: user1.name, document: user1.document, gender: user1.gender }),
            expect.objectContaining({ id: user2.id, name: user2.name, document: user2.document, gender: user2.gender }),
            expect.objectContaining({ id: user3.id, name: user3.name, document: user3.document, gender: user3.gender })
        ])
    )
})