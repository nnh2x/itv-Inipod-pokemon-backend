import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { AuthLogin, AuthToken } from 'src/dto/auth.dto';
import { HttpErrorResponse } from 'src/common/utils/httpErrorResponse';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() userLogin: AuthLogin) {
    const { userName, password } = userLogin;
    const account = await this.authService.validateUser(userName, password);
    if (!account) {
      throw new HttpErrorResponse(
        'Thông tin đăng nhập không chính xác!!!',
        0,
        HttpStatus.OK,
        null,
      );
    }
    return this.authService.login(userLogin);
  }

  @Post('validate-token')
  async validateToken(@Body() token: string) {
    const account = await this.authService.checkOldToken(token);
    if (!account) {
      throw new HttpErrorResponse(
        'Thông tin đăng nhập không chính xác!!!',
        0,
        HttpStatus.OK,
        false,
      );
    } else {
      throw new HttpErrorResponse(
        'Đăng nhập thành công !!!',
        1,
        HttpStatus.OK,
        true,
      );
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() token: AuthToken) {
    return await this.authService.refreshToken(token);
  }
}
