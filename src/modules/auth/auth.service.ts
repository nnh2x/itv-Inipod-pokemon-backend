/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  createSuccessResponse,
  HttpErrorResponse,
} from 'src/common/utils/httpErrorResponse';
import { AuthLogin, AuthToken } from 'src/dto/auth.dto';
import { UserEntity } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/dto/user.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userName: string,
    password: string,
  ): Promise<string | null> {
    const user = await this.userRepository.findOne({
      where: { userName },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user.id;
    }
    return null;
  }

  async login(login: AuthLogin) {
    const account = await this.userRepository.findOne({
      where: { userName: login.userName },
    });
    if (!account) {
      throw new Error('User not found');
    }
    const { password, ...data } = account;
    const payload = { ...data };
    throw new HttpErrorResponse(
      'Đăng nhập thành công !!!',
      1,
      HttpStatus.OK,
      this.jwtService.sign(payload),
    );
  }

  async register(body: CreateUserDto): Promise<UserEntity> {
    const checkExistAccount = await this.userRepository.findOne({
      where: { userName: body.userName },
    });

    if (checkExistAccount) {
      throw new HttpErrorResponse(
        `The account ${body.userName} already exists - Please try again!!!`,
        0,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = this.userRepository.create({
      ...body,
      id: uuid(),
      updatedAt: null,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async checkOldToken(value: any) {
    const checkExistAccount = await this.userRepository.findOne({
      where: { id: value.id },
    });
    return checkExistAccount == null ? false : true;
  }
  async refreshToken(token: AuthToken) {
    try {
      const user = await this.jwtService.verifyAsync(token.token);
      const { account_id, exp, iat, ...data } = user;
      const newPayload = { account_id, ...data };
      const newToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: '7d',
      });

      return createSuccessResponse(
        'Token refreshed successfully',
        1,
        HttpStatus.OK,
        newToken,
      );
    } catch (error) {
      throw new HttpErrorResponse(
        'Invalid token - Please log in again',
        0,
        HttpStatus.UNAUTHORIZED,
        null,
      );
    }
  }
}
