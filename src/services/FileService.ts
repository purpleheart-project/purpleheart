import request from './request';

export class FileService {
  static listCollections(params): Promise<any> {
    return request({
      method: 'GET',
      url: '/api/collection',
    });
  }
  static createACollection(params): Promise<any> {
    return request({
      method: 'POST',
      url: '/api/collection',
      data: params,
    });
  }

  static deleteACollection(params): Promise<any> {
    return request({
      method: 'DELETE',
      url: `/api/file/${params.id}`,
    });
  }
}
