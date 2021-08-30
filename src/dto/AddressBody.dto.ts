import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';

export class AddressBodyDto {

    @ApiProperty()
    id: number

    @ApiProperty()
    streetName: string;

    @ApiProperty()
    number: string

    @ApiProperty()
    complement: string

    @ApiProperty()
    neighborhood: string

    @ApiProperty()
    city: string

    @ApiProperty()
    state: string

    @ApiProperty()
    zipCode: string

    @ApiProperty({ type: Date, format: 'date-time' })
    createdAt: Timestamp

    @ApiProperty({ type: Date, format: 'date-time' })
    updatedAt: Timestamp
}