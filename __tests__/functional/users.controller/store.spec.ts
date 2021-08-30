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

let app: INestApplication;

let connection = null;

beforeAll(async () => {
    connection = await createConnection()

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

it('Should create a User', async () => {
    const params = {
        name: faker.name.firstName(),
        type: Type.PRIVATE_INDIVIDUAL,
        document: cpf.generate(),
        gender: Gender.MALE,
        dateOfBirth: faker.date.past()
    }

    const { body, status } = await request(app.getHttpServer()).post(`/users/`).send(params)

    expect(status).toBe(201)

    expect(body).toHaveProperty('name')
    expect(body.name).toBe(params.name)

    expect(body).toHaveProperty('type')
    expect(body.type).toBe(params.type)

    expect(body).toHaveProperty('document')
    expect(body.document).toBe(params.document)

    expect(body).toHaveProperty('gender')
    expect(body.gender).toBe(params.gender)

    const user = await User.findOne({ where: { name: params.name, type: params.type, document: params.document, gender: params.gender } })

    expect(body).toHaveProperty('id')
    expect(body.id).toBe(user.id)

    expect(body.name).toBe(user.name)
    expect(body.type).toBe(user.type)
    expect(body.document).toBe(user.document)
    expect(body.gender).toBe(user.gender)
})

it('Should return error', async () => {
    const params = {
        name: faker.name.firstName(),
        type: Type.PRIVATE_INDIVIDUAL,
        document: cnpj.generate(),
        gender: Gender.MALE,
        dateOfBirth: faker.date.past()
    }

    const { status } = await request(app.getHttpServer()).post(`/users/`).send(params)
    expect(status).toBe(400)

})