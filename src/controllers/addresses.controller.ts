import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddessParamsDto } from '../dto/AddessParams.dto';
import { AddressBodyDto } from '../dto/AddressBody.dto';
import { Address } from '../entities/Address';
import { AddressesProvider } from '../providers/addresses.provider';

@ApiTags('Addresses')
@Controller('users/:userId/addresses')
export class AddressesController {
    constructor(private addressesProvider: AddressesProvider) { }

    @Post()
    @ApiCreatedResponse({ description: 'Endereço criado com sucesso!', type: AddressBodyDto })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    async store(@Param() params: AddessParamsDto, @Body() body: AddressBodyDto): Promise<Address> {
        return this.addressesProvider.store(params.userId, body)
    }


    @Put(':id')
    @ApiOkResponse({ description: 'Endereço atualizado com sucesso!', type: AddressBodyDto })
    @ApiBadRequestResponse({ description: 'Bad request!' })
    async edit(@Param() params: AddessParamsDto, @Body() body: AddressBodyDto): Promise<Address> {
        return this.addressesProvider.edit(params.userId, params.id, body)
    }


    @Delete(':id')
    @ApiOkResponse({ description: 'Endereço deletado com sucesso!.' })
    @ApiBadRequestResponse({ description: 'Bad request!' })
    async remove(@Param() params: AddessParamsDto): Promise<void> {
        return this.addressesProvider.remove(params.userId, params.id)
    }
}