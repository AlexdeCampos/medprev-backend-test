import * as faker from 'faker'
import { User } from '../../src/entities/User'
import { Gender, Type } from '../../src/types/index'

type UsersParams = {
    type?: Type,
    name?: string,
    gender?: Gender,
    document?: string,
    dateOfBirth?: Date,
    email?: string,
    phoneNumber?: string,
    cellphoneNumber?: string,
    photo?: string,
    companyName?: string,
}

async function create(params?: UsersParams): Promise<User> {
    const user = User.create({
        name: faker.name.firstName(),
        type: Type.PRIVATE_INDIVIDUAL,
        gender: Gender.MALE,
        document: faker.random.alphaNumeric(),
        dateOfBirth: faker.date.past(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        cellphoneNumber: faker.phone.phoneNumber(),
        photo: faker.internet.avatar(),
        ...params,
    })

    return user.save();
}

export default { create };