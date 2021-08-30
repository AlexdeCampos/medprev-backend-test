import { BadRequestException } from '@nestjs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { DeepPartial } from 'typeorm';
import { Type, UserParams } from '../types';
import cleanObject from './cleanObject';

function validatePrivateIndividualDoc(doc: string): void {
    if (!cpf.isValid(doc)) {
        throw new BadRequestException({ message: 'CPF inválido!' })
    }
}

function validateLegalEntityDoc(doc: string): void {
    if (!cnpj.isValid(doc)) {
        throw new BadRequestException({ message: 'CNPJ inválido!' })
    }
}

export default {
    validate(user: DeepPartial<UserParams>): void {
        if (user.type === Type.LEGAL_ENTITY) {
            validateLegalEntityDoc(user.document)
        } else {
            validatePrivateIndividualDoc(user.document)
        }
    },
    cleanRequest(user: UserParams): DeepPartial<UserParams> {
        const rules = {
            type: true,
            name: true,
            companyName: true,
            document: true,
            gender: true,
            dateOfBirth: true,
            email: true,
            phoneNumber: true,
            cellphoneNumber: true,
            photo: true,
        }
        return cleanObject(user, rules);
    }
}