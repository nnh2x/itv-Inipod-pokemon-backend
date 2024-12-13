import { ApiProperty } from '@nestjs/swagger';

export class AuthLogin {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}
export class AuthToken {
  @ApiProperty()
  token: string;
}

export class AuthRegister {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}
