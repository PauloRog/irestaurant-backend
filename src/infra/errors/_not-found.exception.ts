import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(model: string, id: string, logger: Logger) {
    const message = `${model} with id ${id} not found`;

    logger.warn(message);
    super(message, HttpStatus.NOT_FOUND);
  }
}
