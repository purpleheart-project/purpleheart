import axios from 'axios';

import request from './request';

export class RequestService {
  static createARequest(params): Promise<any> {
    return request({
      method: 'POST',
      data: params,
    });
  }
}
