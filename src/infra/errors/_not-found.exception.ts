import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(model: string, payload: string, logger: Logger) {
    const message = `${model} with ${payload} not found`;

    logger.warn(message);
    super(message, HttpStatus.NOT_FOUND);
  }
}
