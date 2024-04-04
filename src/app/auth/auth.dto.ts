import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  userId: string;
}
