import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';
import { Gender, Type } from '../types';
import { AddressBodyDto } from './AddressBody.dto';

export class UserResponseDto {

    @ApiProperty()
    id: number

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
    dateOfBirth: Timestamp

    @ApiProperty()
    email: string

    @ApiProperty()
    phoneNumber: string

    @ApiProperty()
    cellphoneNumber: string

    @ApiProperty()
    photo: string

    @ApiProperty({ type: Date, format: 'date-time' })
    createdAt: Timestamp

    @ApiProperty({ type: Date, format: 'date-time' })
    updatedAt: Timestamp

    @ApiProperty({ type: [AddressBodyDto] })
    addresses: [AddressBodyDto]

}