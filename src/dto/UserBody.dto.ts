import { ApiProperty } from '@nestjs/swagger';
import { Gender, Type } from '../types';

export class UserBodyDto {

    @ApiProperty({ enum: Type, description: 'Tipo de Pessoa, se jurídica (legal entity), se física (private individual)' })
    type: Type

    @ApiProperty()
    name: string

    @ApiProperty()
    companyName: string

    @ApiProperty()
    document: string

    @ApiProperty({ enum: Gender, description: 'Sexo do usuário, homem (male) ou mulher (female)' })
    gender: Gender

    @ApiProperty({ type: Date, format: 'date' })
    dateOfBirth: Date

    @ApiProperty()
    email: string

    @ApiProperty()
    phoneNumber: string

    @ApiProperty()
    cellphoneNumber: string

    @ApiProperty()
    photo: string

}