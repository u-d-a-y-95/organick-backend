import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class DbExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const { code, meta } = exception;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = this.getError(code, meta);
    response.status(error.status).json({
      statusCode: error.status,
      message: error.message,
      data: [],
    });
  }

  private getError(code, meta) {
    switch (code) {
      case 'P2002':
        return new CustomeError(
          409,
          `${meta['target'].join(' ')} is already exists`,
        );
      case 'P2025':
        return new CustomeError('404', 'Record to delete does not exist');
      default:
        return new CustomeError(500, 'prisma eror');
    }
  }
}

class CustomeError {
  constructor(public status, public message) {}
}
