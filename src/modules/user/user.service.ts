import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  HttpErrorResponse,
  createSuccessResponse,
} from 'src/common/utils/httpErrorResponse';
import {
  ChangePasswordDto,
  DeleteUserDto,
  ResetPasswordDto,
} from 'src/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // get Info User from Token
  async getInfo(req: Request): Promise<AuthPayload> {
    const accountByToken = req['user'] as AuthPayload;
    return accountByToken;
  }

  // api use Delete User
  async deleteUserDto(body: DeleteUserDto) {
    // find user
    const findUser = await this.userRepository.findOne({
      where: { id: body.id },
    });
    if (!findUser) {
      // if not user => throw error
      throw new HttpErrorResponse(
        `No user exists with ID = ${body.id}`,
        0,
        HttpStatus.NOT_FOUND,
        null,
      );
    } else {
      // Delete user
      return createSuccessResponse(
        `Successfully deleted the account ${findUser.userName} `,
        1,
        HttpStatus.OK,
        await this.userRepository.delete(body.id),
      );
    }
  }

  // api use reset Password User
  async resetPassword(body: ResetPasswordDto): Promise<void> {
    const account = await this.userRepository.findOne({
      where: { id: body.id },
    });
    if (!account) {
      throw new HttpErrorResponse(
        'Account does not exist - please try again!!!',
        0,
        HttpStatus.OK,
        {},
      );
    } else {
      const hashedPassword = await bcrypt.hash(body.newPassword.toString(), 10);
      const newData: UserEntity = {
        ...account,
        password: hashedPassword,
        updatedAt: new Date(),
      };

      await this.userRepository.update(account.id, newData);
      throw new HttpErrorResponse(
        'Password update successful!!!',
        0,
        HttpStatus.OK,
        {},
      );
    }
  }

  // api use change Password User
  async changePassword(req: Request, body: ChangePasswordDto) {
    // get info User from Token
    const userInToken = req['user'] as AuthPayload;
    // check User in Database from token => find by Id
    const user = await this.userRepository.findOne({
      where: { id: userInToken.id },
    });

    // if not user in Database => throw error
    if (!user) {
      throw new HttpErrorResponse(
        'Account does not exist - please try again!!!',
        0,
        HttpStatus.OK,
        {},
      );
    } else {
      // check old password from User in Database => compare old password and new password
      const isMatch = await bcrypt.compare(body.oldPassword, user.password);
      if (!isMatch) {
        // if not match => throw error
        throw new HttpErrorResponse(
          'Old password is incorrect - please try again!!!',
          0,
          HttpStatus.OK,
          {},
        );
      } else {
        // if match => update new password in Database => throw success message with new password
        const hashedPassword = await bcrypt.hash(body.toString(), 10);
        const newData: UserEntity = {
          ...user,
          password: hashedPassword,
          updatedAt: new Date(),
        };
        // update new password in Database => throw success message with new password
        await this.userRepository.update(user.id, newData);
        // throw success message with new password
        throw new HttpErrorResponse(
          'Password update successful!!!',
          0,
          HttpStatus.OK,
          'Your new password is: ' + body.newPassword,
        );
      }
    }
  }
}
