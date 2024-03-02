import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;
}
