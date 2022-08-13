import request from "./request";

export class FileService {
  static listCollections(params):Promise<any>{
    return request({
      method:'GET',
      url:'/api/collection'
    })
  }
}
