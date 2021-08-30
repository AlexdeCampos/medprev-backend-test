import { Module } from "@nestjs/common";
import { AddressessModule } from "./modules/addresses.module";
import { UsersModule } from "./modules/users.module";

@Module({
  imports: [UsersModule, AddressessModule],
})

export class AppModule { }
