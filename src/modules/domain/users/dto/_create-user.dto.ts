import { ConnectionType } from '@infra/utils';

export class CreateUserDto {
  name: string;

  email: string;

  password: string;

  connectionType: ConnectionType;
}
