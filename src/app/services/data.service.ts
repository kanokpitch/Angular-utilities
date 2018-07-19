import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Observable';

import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

declare var Notification: any;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user_ip = '127.0.0.1';
  ip_host = environment.ipHost;
  lang = 'en';
  defaultLang = 'en';
  token: string;
  http: any;

  getDynamicList(): Observable<Array<Select2OptionData>> {
      return Observable.create((obs) => {
          obs.next([
              {
                  id: 'dyn1',
                  text: 'Dynamic 1'
              },
              {
                  id: 'dyn2',
                  text: 'Dynamic 2'
              },
              {
                  id: 'dyn3',
                  text: 'Dynamic 3'
              },
              {
                  id: 'dyn4',
                  text: 'Dynamic 4'
              }
          ]);
          obs.complete();
      });
  }

  getTemplateList(): Select2OptionData[] {
      return [
          {
              id: 'temp1',
              text: 'Template 1',
              additional: {
                  image: 'assets/image0.jpg',
                  winner: '4'
              }
          },
          {
              id: 'temp2',
              text: 'Template 2',
              additional: {
                  winner: '3'
              }
          },
          {
              id: 'temp3',
              text: 'Template 3',
              additional: {
                  image: 'assets/image1.jpg',
                  winner: '1'
              }
          },
          {
              id: 'temp4',
              text: 'Template 4',
              additional: {
                  image: 'assets/image2.jpg',
                  winner: '5'
              }
          },
          {
              id: 'temp5',
              text: 'Template 5',
              additional: {
                  image: 'assets/image3.jpg',
                  winner: '2'
              }
          }
      ];
  }

  getChangeList(): Select2OptionData[] {
      return [
          {
              id: '0',
              text: 'Cars',
              children: [
                  {
                      id: 'car1',
                      text: 'Car 1'
                  },
                  {
                      id: 'car2',
                      text: 'Car 2'
                  },
                  {
                      id: 'car3',
                      text: 'Car 3'
                  }
              ]
          },
          {
              id: '0',
              text: 'Planes',
              children: [
                  {
                      id: 'plane1',
                      text: 'Plane 1'
                  },
                  {
                      id: 'plane2',
                      text: 'Plane 2'
                  },
                  {
                      id: 'plane3',
                      text: 'Plane 3'
                  }
              ]
          }
      ];
  }

  getChangeListAlternative(): Select2OptionData[] {
      return [
          {
              id: '0',
              text: 'Cars',
              children: [
                  {
                      id: 'car1',
                      text: 'Car 1 - New'
                  },
                  {
                      id: 'car2',
                      text: 'Car 2 - New'
                  },
                  {
                      id: 'car3',
                      text: 'Car 3 - New'
                  }
              ]
          },
          {
              id: '0',
              text: 'Planes',
              children: [
                  {
                      id: 'plane1',
                      text: 'Plane 1 - New'
                  },
                  {
                      id: 'plane2',
                      text: 'Plane 2 - New'
                  },
                  {
                      id: 'plane3',
                      text: 'Plane 3 - New'
                  }
              ]
          }
      ];
  }

  constructor(public httpClient: HttpClient,
    private toastrService: ToastrService) {
    this.http = httpClient;
  }

  getData(url: any, token: any = null) {
    let lang: any; // = this.translateService.currentLang;
    lang = lang ? lang : this.defaultLang;

    const tk = (token) ? token : localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + tk)
      .set('Access-Control-Allow-Origin', this.ip_host)
      .set('Access-Control-Allow-Methods', 'GET')
      .set('X-localization', lang)
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Promise(resolve => {
      this.http
        .get(this.ip_host + '/api/' + url, { headers: headers })
        .toPromise()
        .then(resp => {
          if (resp) {
            const message: any = resp.message;
            const data = (resp.data) ? resp.data : null;
            resolve({ statusCode: 200, data: data, message: message });
          }
        })
        .catch((HttpErrorResponse) => {
          const errResp: any = HttpErrorResponse;
          const errStatus: any = errResp.status;
          if (errStatus === 400) {
            resolve(this.caseBadRequest(errResp, errStatus));
          } else {
            resolve(this.caseNotBadRequest(errResp, errStatus));
          }
        });
    });
  }

  getMethod(url: any, token: any = null) {
    let lang: any; // = this.translateService.currentLang;
    lang = lang ? lang : this.defaultLang;

    const tk = (token) ? token : localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + tk)
      .set('Access-Control-Allow-Origin', this.ip_host)
      .set('Access-Control-Allow-Methods', 'GET')
      .set('X-localization', lang)
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Promise(resolve => {
      this.http
      .get(this.ip_host + '/api/' + url, { headers: headers })
      .toPromise()
      .then(resp => {
        if (resp) {
          const data = (resp) ? resp : null;
          resolve({ statusCode: 200, data: data, message: 'get noti success.' });
        }
      })
      .catch((HttpErrorResponse) => {
        const errResp: any = HttpErrorResponse;
        const errStatus: any = errResp.status;
        if (errStatus === 401) {
          resolve(this.caseBadRequest(errResp, errStatus));
        }
        if (errStatus === 400) {
          resolve(this.caseBadRequest(errResp, errStatus));
        } else {
          resolve(this.caseNotBadRequest(errResp, errStatus));
        }
      });
    });
  }

  delData(url: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Access-Control-Allow-Origin', this.ip_host)
      // .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Promise(resolve => {
      this.http
        .delete(this.ip_host + '/api/' + url, { headers: headers })
        .toPromise()
        .then(resp => {
          if (resp) {
            const message: any = resp.message;
            const data = resp.data ? resp.data : null;
            resolve({ statusCode: 200, data: data, message: message });
          }
        })
        .catch((HttpErrorResponse) => {
          const errResp: any = HttpErrorResponse;
          const errStatus: any = errResp.status;
          if (errStatus === 400) {
            resolve(this.caseBadRequest(errResp, errStatus));
          } else {
            resolve(this.caseNotBadRequest(errResp, errStatus));
          }
        });
    });
  }

  postData(url: any, inputs: any, token: any = null) {
    let lang: any; // = this.translateService.currentLang;
    lang = lang ? lang : this.defaultLang;

    const tk = (token) ? token : localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + tk)
      .set('Access-Control-Allow-Origin', this.ip_host)
      .set('Access-Control-Allow-Methods', 'POST')
      .set('X-localization', lang)
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Promise(resolve => {
      this.http
        .post(this.ip_host + '/api/' + url, inputs, { headers: headers })
        .toPromise()
        .then(resp => {
          if (resp) {
            const message: any = resp.message;
            const data = resp.data ? resp.data : null;
            resolve({ statusCode: 200, data: data, message: message });
          }
        })
        .catch((HttpErrorResponse) => {
          const errResp: any = HttpErrorResponse;
          const errStatus: any = errResp.status;
          if (errStatus === 400) {
            resolve(this.caseBadRequest(errResp, errStatus));
          } else {
            resolve(this.caseNotBadRequest(errResp, errStatus));
          }
        });
    });
  }

  postMethod(url: any, inputs: any) {
    let lang: any; // = this.translateService.currentLang;
    lang = lang ? lang : this.defaultLang;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Access-Control-Allow-Origin', this.ip_host)
      .set('Access-Control-Allow-Methods', 'POST')
      .set('X-localization', lang)
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return this.http
      .post(this.ip_host + '/api/' + url, inputs, { headers: headers })
      .toPromise();
  }

  newPostMethod(url: any, inputs: any) {
    let lang: any; // = this.translateService.currentLang;
    lang = lang ? lang : this.defaultLang;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Access-Control-Allow-Origin', this.ip_host)
      .set('Access-Control-Allow-Methods', 'POST')
      .set('X-localization', lang)
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return new Promise(resolve => {
        this.http
        .post(this.ip_host + '/api/' + url, inputs, { headers: headers })
        .toPromise()
        .then(resp => {
          if (resp) {
            const data = (resp) ? resp : null;
            resolve({ statusCode: 200, data: data, message: 'success.' });
          }
        })
        .catch((HttpErrorResponse) => {
          const errResp: any = HttpErrorResponse;
          const errStatus: any = errResp.status;
          if (errStatus === 401) {
            resolve(this.caseNotBadRequest(errResp, errStatus));
          }
          if (errStatus === 400) {
            resolve(this.caseBadRequest(errResp, errStatus));
          }
          if ( errStatus === 422 ) {
            if ( errResp.hasOwnProperty('error') ) {
              resolve(this.caseNotBadRequest(errResp, errStatus));
            }
          }
          resolve(this.caseBadRequest(errResp, errStatus));
        });
      });
  }

  putData(url: any, inputs: any = null) {
    let lang: any; // = this.translateService.currentLang;
    lang = lang ? lang : this.defaultLang;

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Access-Control-Allow-Origin', this.ip_host)
      .set('Access-Control-Allow-Methods', 'PUT')
      .set('X-localization', lang)
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Promise(resolve => {
      this.http
        .put(this.ip_host + '/api/' + url, inputs, { headers: headers })
        .toPromise()
        .then(resp => {
          if (resp) {
            const message: any = resp.message;
            const data = resp.data ? resp.data : null;
            resolve({ statusCode: 200, data: data, message: message });
          }
        })
        .catch((HttpErrorResponse) => {
          const errResp: any = HttpErrorResponse;
          const errStatus: any = errResp.status;
          if (errStatus === 400) {
            resolve(this.caseBadRequest(errResp, errStatus));
          } else {
            resolve(this.caseNotBadRequest(errResp, errStatus));
          }
        });
    });
  }

  // 401, 404 (0), 422, 500
  caseNotBadRequest(errResp: any, errStatus: any) {
    let response: any;
    let sttMsg: string = errResp.message;
    let data: any;

    if ( errStatus !== 0) {
      sttMsg += '<br />' + errStatus + ': ' + errResp.statusText;
    }

    if ( errStatus === 422 ) {
      if ( errResp.hasOwnProperty('error') ) {
        data = errResp.error;
      }
    }

    if ( errStatus === 401 ) {
      if ( errResp.hasOwnProperty('error') ) {
        sttMsg = errResp.error.error;
        data = null;
      }
    }

    response = { statusCode: errStatus, data: data, message: sttMsg };
    return response;
  }

  // 400
  caseBadRequest(errResp: any, errStatus: any) {
    let sttMsg: any = '';
    let response: any;
    if (errResp.validator) {
      const messages: any = errResp.validator;
      messages.array.forEach((element, index) => {
        sttMsg += sttMsg ? '<br />' + element : element;
      });
    } else if (errResp.error) {
      sttMsg = errResp.error.message;
    } else if (errResp.message) {
      sttMsg = errResp.message;
    } else {
      errResp.array.forEach((element, index) => {
        sttMsg += sttMsg ? '<br />' + element : element;
      });
    }
    response = { statusCode: errStatus, message: sttMsg };
    return response;
  }

  // getTime(time: any = null, format: any = null) {
  //   let returnFormat: any = ( time ) ? moment.utc(time) : moment();

  //   if ( this.getUser() ) {
  //     returnFormat = returnFormat.tz(this.getUser().timezone);
  //   }

  //   if ( format ) {
  //     returnFormat = returnFormat.format(format);
  //   }

  //   return returnFormat;
  // }

  generateQueryString(inputs: any): string {
    let queryString = '';
    for ( const k in inputs ) {
      if ( inputs[k] ) {
        // console.log(k + ': ' + inputs[k]);
        queryString += (inputs[k]) ? ((queryString) ? '&' + k + '=' + inputs[k] : k + '=' + inputs[k]) : '' ;
      }
    }
    // console.log(queryString);
    return queryString;
  }

  cryptoFormat(crypto: any) {
    return parseFloat(crypto + '').toFixed(8);
  }

  showNotify(title: any = null, body: any = '') {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    } else {
      if ( body ) {
        this.toastrService.success(body, title);
      } else {
        this.toastrService.success(title);
      }
    }
  }

  pushElementInAutoCompleteList(word: any, orgList: any, searchKey: any, group: string = '') {
    let list: any[] = [];
    if ( word ) {
      word = word.toUpperCase();
      if ( orgList ) {
        orgList.forEach((ele, idx) => {
          if (group === 'group' && ele.data.length > 0) {
            const subList = [];
            ele.data.forEach((e, i) => {
              const org = e[searchKey].toUpperCase();
              if (org.search(word) !== -1 ) {
                subList.push(e);
              }
            });
            if (subList.length > 0) {
              list.push({type: ele.type, optgroup: ele.optgroup, data: subList});
            }
          } else {
            const org = ele[searchKey].toUpperCase();
            if (org.search(word) !== -1 ) {
              list.push(ele);
            }
          }
        });
      }
    } else {
      list = orgList;
    }

    return list;
  }

  textFromGroup(groupList: any[] = [], key: string = '', ret: string = '', compare: any) {
    let text = '';
    if (groupList.length > 0) {
      groupList.forEach((ele, idx) => {
        if (ele.data.length > 0) {
          ele.data.forEach((e, i) => {
            if (e[key] === compare ) {
              text = e[ret];
            }
          });
        }
      });
    }
    return text;
  }

  logout(loginList: any[]) {
    loginList.forEach((ele, idx) => {
      localStorage.removeItem('token-' + ele.username);
    });
  }
}
