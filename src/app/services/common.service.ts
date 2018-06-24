import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommonService {
  apiEndpoint = 'http://hive.skuberg.com/api';
  apiPathImage = 'http://hive.skuberg.com/storage';
  localEndpoint = 'http://localhost/api';
  localPathImage = 'http://localhost/storage';
  web = 'http://hive.skuberg.com';
  lang = '';

    constructor(public http: Http) {
      this.http = http;
    }

    getData(url: any) {
        let lang: any = 'th';
        lang = (lang) ? lang : 'th';

        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('user_token'));
        headers.append('X-localization', lang);

        return new Promise(resolve => {
            this.http.get(url, {headers: headers}).toPromise().then(resp => {
                if (resp) {
                    const message: any = resp.json().message;
                    const data = (resp.json().data) ? resp.json().data : null;
                    resolve({'statusCode' : 200, 'data' : data, 'message' : message});
                }
            }).catch(function(error) {
                const errStatus: any = error.status;

                if (errStatus === 400) {
                    const errResp: any = error.json();
                    let msg: any = '';

                    if (errResp.validator) {
                        const messages: any = errResp.validator;
                        // tslint:disable-next-line:forin
                        for (const key in messages) {
                          msg += (msg) ? '<br />' + messages[key] : messages[key];
                        }
                    } else if (errResp.message) {
                        msg = errResp.message;
                    } else {
                        // tslint:disable-next-line:forin
                        for (const k in errResp) {
                          msg += (msg) ? '<br />' + errResp[k] : errResp[k];
                        }
                    }

                    resolve({'statusCode': errStatus, 'message': msg});
                } else {
                    const sttMsg = (errStatus === 0) ? 'Service Unavailable.' : errStatus + ': ' + error.statusText;
                    resolve({'statusCode': errStatus, 'message': sttMsg});
                }
            });
        });
    }

    delData(url: any) {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('user_token'));

        return new Promise(resolve => {
            this.http.delete(url, {headers: headers}).toPromise().then(resp => {
                if (resp) {
                    const message: any = resp.json().message;
                    const data = (resp.json().data) ? resp.json().data : null;
                    resolve({'statusCode': 200, 'data' : data, 'message' : message});
                }
            }).catch(function(error) {
                if (error.status === 400) {
                    const messages: any = error.json().validator;
                    let msg = '';
                    // tslint:disable-next-line:forin
                    for (const k in messages) {
                      msg += (msg) ? '<br>' + messages[k] : messages[k];
                    }
                    resolve({'statusCode': error.status, 'message': msg});
                } else {
                    resolve({'statusCode': error.status, 'message': error.status + ': ' + error.statusText});
                }
            });
        });
    }

    postData(url: any, inputs: any) {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('user_token'));

        return new Promise(resolve => {
            this.http.post(url, inputs, {headers: headers}).toPromise().then(resp => {
                if (resp) {
                    const message: any = resp.json().message;
                    const data = (resp.json().data) ? resp.json().data : null;
                    resolve({'statusCode': 200, 'data': data, 'message': message});
                }
            }).catch(function(error) {
                const errStatus: any = error.status;

                if (errStatus === 400) {
                    const errResp: any = error.json();
                    let msg: any = '';

                    if (errResp.validator) {
                        const messages: any = errResp.validator;
                        // tslint:disable-next-line:forin
                        for (const k1 in messages) {
                          msg += (msg) ? '<br />' + messages[k1] : messages[k1];
                        }
                    } else if (errResp.message) {
                        msg = errResp.message;
                    } else {
                        // tslint:disable-next-line:forin
                        for (const k in errResp) {
                          msg += (msg) ? '<br />' + errResp[k] : errResp[k];
                        }
                    }

                    resolve({'statusCode': errStatus, 'message': msg});
                } else {
                    resolve({'statusCode': errStatus, 'message': errStatus + ': ' + error.statusText});
                }
            });
        });
    }

    putData(url: any, inputs: any) {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer' + window.localStorage.getItem('user_token'));

        return new Promise(resolve => {
            this.http.put(url, inputs, {headers: headers}).toPromise().then(resp => {
                if (resp) {
                    const message: any = resp.json().message;
                    const data = (resp.json().data) ? resp.json().data : null;
                    resolve({'statusCode': 200, 'data': data, 'message': message});
                }
            }).catch(function(error) {
                const errStatus: any = error.status;

                if (errStatus === 400) {
                    const errResp: any = error.json();
                    let msg: any = '';

                    if (errResp.validator) {
                        const messages: any = errResp.validator;
                        // tslint:disable-next-line:forin
                        for (const k1 in messages) {
                          msg += (msg) ? '<br />' + messages[k1] : messages[k1];
                        }
                    } else if (errResp.message) {
                        msg = errResp.message;
                    } else {
                        // tslint:disable-next-line:forin
                        for (const k in errResp) {
                          msg += (msg) ? '<br />' + errResp[k] : errResp[k];
                        }
                    }

                    resolve({'statusCode': errStatus, 'message': msg});
                } else {
                    resolve({'statusCode': errStatus, 'message': errStatus + ': ' + error.statusText});
                }
            });
        });
    }

    postLoadPage(url: any, inputs: any) {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('user_token'));

        return new Promise(resolve => {
            const data: any = this.http.post(url, inputs, {headers: headers}).toPromise().then(resp => {
                if (resp) {
                    resolve({'statusCode': 200, 'body': resp['_body']});
                }
            }).catch(function(error) {
                const errStatus: any = error.status;

                if (errStatus === 400) {
                    const errResp: any = error.json();
                    let msg: any = '';

                    if (errResp.validator) {
                        const messages: any = errResp.validator;
                        // tslint:disable-next-line:forin
                        for (const k1 in messages) {
                          msg += (msg) ? '<br />' + messages[k1] : messages[k1];
                        }
                    } else if (errResp.message) {
                        msg = errResp.message;
                    } else {
                        // tslint:disable-next-line:forin
                        for (const k1 in errResp) {
                          msg += (msg) ? '<br />' + errResp[k1] : errResp[k1];
                        }
                    }

                    resolve({'statusCode': errStatus, 'message': msg});
                } else {
                    resolve({'statusCode': errStatus, 'message': errStatus + ': ' + error.statusText});
                }
            });
        });
    }

    checkExistingImage(urlImage: any) {
        return new Promise(resolve => {
            this.http.get(urlImage).toPromise().then(resp => {
                resolve({'statusCode': 200});
            }).catch(function(error) {
                resolve({'statusCode': error.status});
            });
        });
    }
}
