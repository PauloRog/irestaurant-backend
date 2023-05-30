import { ConnectionType } from '@infra/utils';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: ConnectionType })
  connectionType: ConnectionType;
}
