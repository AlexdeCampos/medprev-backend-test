import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserBodyDto } from '../dto/UserBody.dto';
import { UserParamsDto } from '../dto/UserParams.dto';
import { UserResponseDto } from '../dto/UserResponse.dto';
import { User } from '../entities/User';
import { UsersProvider } from '../providers/users.provider';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersProvider: UsersProvider) { }

  @Get()
  @ApiOkResponse({ description: 'Retorna a lista de usuários cadastrados', type: [UserResponseDto] })
  async index(): Promise<Array<User>> {
    return this.usersProvider.index()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retorna o usuário casa o Id enviado exista', type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Usuário não encontrado.' })
  async show(@Param() params: UserParamsDto): Promise<User> {
    return this.usersProvider.show(params.id)
  }

  @Post()
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso!', type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async store(@Body() body: UserBodyDto): Promise<User> {
    return this.usersProvider.store(body)
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Usuário atualizado com sucesso!', type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Bad request!' })
  async edit(@Param() params: UserParamsDto, @Body() body: UserBodyDto): Promise<User> {
    return this.usersProvider.edit(params.id, body)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Usuário deletado com sucesso!.' })
  @ApiBadRequestResponse({ description: 'Bad request!' })
  async remove(@Param() params: UserParamsDto): Promise<void> {
    return this.usersProvider.remove(params.id)
  }
}