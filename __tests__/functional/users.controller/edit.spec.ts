import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import * as faker from 'faker';
import * as request from 'supertest';
import { createConnection } from 'typeorm';
import { UsersController } from '../../../src/controllers/users.controller';
import { User } from '../../../src/entities/User';
import { UsersProvider } from '../../../src/providers/users.provider';
import { Gender, Type } from '../../../src/types';
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

it('Should edit a User', async () => {
    const params = {
        name: faker.name.firstName(),
        type: Type.PRIVATE_INDIVIDUAL,
        document: cpf.generate(),
        gender: Gender.MALE,
        dateOfBirth: faker.date.past()
    }

    const { body, status } = await request(app.getHttpServer()).put(`/users/${user.id}`).send(params)
    expect(status).toBe(200)

    expect(body).toHaveProperty('id')
    expect(body.id).toBe(user.id)

    expect(body).toHaveProperty('name')
    expect(body.name).toBe(params.name)

    expect(body).toHaveProperty('type')
    expect(body.type).toBe(params.type)

    expect(body).toHaveProperty('document')
    expect(body.document).toBe(params.document)

    expect(body).toHaveProperty('gender')
    expect(body.gender).toBe(params.gender)

    const storedUser = await User.findOne(user.id)

    expect(storedUser.name).toBe(params.name)
    expect(storedUser.type).toBe(params.type)
    expect(storedUser.document).toBe(params.document)
    expect(storedUser.gender).toBe(params.gender)
})

it('Should return a document error ', async () => {
    const params = {
        name: faker.name.firstName(),
        type: Type.PRIVATE_INDIVIDUAL,
        document: cnpj.generate(),
        gender: Gender.MALE,
        dateOfBirth: faker.date.past()
    }

    const { status } = await request(app.getHttpServer()).put(`/users/${user.id}`).send(params)
    expect(status).toBe(400)
})

it('Should return a companyName error ', async () => {
    const params = {
        name: faker.name.firstName(),
        type: Type.LEGAL_ENTITY,
        document: cnpj.generate(),
        gender: Gender.MALE,
        dateOfBirth: faker.date.past()
    }

    const { status } = await request(app.getHttpServer()).put(`/users/${user.id}`).send(params)
    expect(status).toBe(400)
})
