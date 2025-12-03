import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { $Enums } from 'generated/prisma';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/auth/constants';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { UserDB } from 'src/auth/auth.interface';

@Controller('users')
@Roles($Enums.Role.ADMIN)
export class UsersController {
  //
  constructor(private usersService: UsersService) {}

  // Find all users

  @Get()
  findAll(): Promise<UserDB[]> {
    return this.usersService.findAll();
  }

  // Find a user

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('id') id: number): Promise<UserDB | null> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.findOne({ id });
  }

  // Update a user

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDB> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    if (updateUserDto.password !== undefined) {
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
      updateUserDto.password = hashedPassword;
    }
    return this.usersService.update({ id, data: updateUserDto });
  }

  // Delete a user

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') id: number): Promise<UserDB> {
    if (isNaN(Number(id))) {
      throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.remove({ id });
  }

  //
}
