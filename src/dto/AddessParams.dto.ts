import { ApiProperty } from '@nestjs/swagger';

export class AddessParamsDto {

    @ApiProperty()
    userId: number;

    @ApiProperty()
    id: number;
}