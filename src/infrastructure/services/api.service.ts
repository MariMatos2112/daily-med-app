import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  buildResponse(message: string, data?: any) {
    return {
      message,
      ...(data && { data }),
    };
  }
}
