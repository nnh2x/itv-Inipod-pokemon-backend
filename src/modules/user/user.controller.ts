import {
  Body,
  Controller,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticationGuard } from '../auth/auth.guard';
import {
  ChangePasswordDto,
  DeleteUserDto,
  ResetPasswordDto,
} from 'src/dto/user.dto';

@Controller('user')
@UseGuards(AuthenticationGuard)
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.userService.resetPassword(body);
  }

  @Delete('delete-user')
  async DeleteUserDto(@Body() body: DeleteUserDto) {
    return await this.userService.deleteUserDto(body);
  }

  @Put('change-password')
  async changePassword(@Request() req, @Body() body: ChangePasswordDto) {
    await this.userService.changePassword(req, body);
  }
}
