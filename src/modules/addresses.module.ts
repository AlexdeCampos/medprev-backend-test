import { Module } from '@nestjs/common';
import { AddressesController } from '../controllers/addresses.controller';
import { AddressesProvider } from '../providers/addresses.provider';

@Module({
    controllers: [AddressesController],
    providers: [AddressesProvider],
})

export class AddressessModule { }
