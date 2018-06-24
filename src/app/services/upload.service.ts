import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable()
export class UploadService {
  host = '';
  constructor(private commonService: CommonService) {
    this.host = this.commonService.apiEndpoint;
  }

  addCoverImage(inputs: any) {
    return this.commonService.postData(this.host + '/test', inputs);
  }
}
