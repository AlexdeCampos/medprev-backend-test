export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export enum Type {
    PRIVATE_INDIVIDUAL = 'private individual',
    LEGAL_ENTITY = 'legal entity',
}

export type UserParams = {
    type: Type
    name: string
    companyName: string
    document: string
    gender: Gender
    dateOfBirth: Date
    email: string
    phoneNumber: string
    cellphoneNumber: string
    photo: string

}

export type AddressParams = {
    streetName: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
}

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

