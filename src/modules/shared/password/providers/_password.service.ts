import { Injectable } from '@nestjs/common';
import { compare, genSaltSync, hash } from 'bcrypt';

@Injectable()
export class PasswordService {
  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, genSaltSync(10));
  }
}
