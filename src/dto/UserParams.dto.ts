import { ApiProperty } from '@nestjs/swagger';

export class UserParamsDto {

    @ApiProperty()
    id: number;
}