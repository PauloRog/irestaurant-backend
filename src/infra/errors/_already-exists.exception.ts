import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(model: string, logger: Logger) {
    const message = `${model} already exist`;

    logger.warn(message);
    super(message, HttpStatus.CONFLICT);
  }
}
