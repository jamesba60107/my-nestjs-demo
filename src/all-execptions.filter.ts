import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService} from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Prisma } from 'generated/prisma';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
}

@Catch()
export  class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name)

  catch(exception:unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
      statusCode: HttpStatus.OK,
      timestamp: new Date().toString(),
      path: request.url,
      response: '',
    }

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus()
      myResponseObj.response = exception.message
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      myResponseObj.statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      myResponseObj.response = exception.message.replaceAll(/\n/g, ' ')
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      myResponseObj.response = 'Internal server error'
    }

    response
      .status(myResponseObj.statusCode)
      .json(myResponseObj)

    this.logger.error(myResponseObj.response, AllExceptionsFilter.name)
  }
}
