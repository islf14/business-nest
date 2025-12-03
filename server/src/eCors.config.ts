import { HttpException } from '@nestjs/common';
import { type NextFunction, type Request, type Response } from 'express';
export function ecors() {
  return function (
    err: Error,
    _req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    // Check if the error is from the CORS
    if (err && err.message === 'Not allowed by CORS') {
      throw new HttpException(err.message, 401);
    } else {
      // Pass other errors down the chain
      next(err);
    }
  };
}
