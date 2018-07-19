import { Injectable } from '@angular/core';
import { DataService } from './data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {

  constructor(private dataService: DataService) { }

  allPaymentmethod() {
    return this.dataService.getData('p2p/paymentmethods');
  }

  arrangePaymentList(dataList: any[], key: string) {
    let pop = '';
    let allPay = '';
    let allOnline = '';
    let inPerson = '';
    let cash = '';
    pop = 'pop';
    allPay = 'allPay';
    allOnline = 'allOnline';
    inPerson = 'inPerson';
    cash = 'cash';
    // this.translateService.get('p2p.search.PopularInYourCountry').subscribe(translatedValue => {
    //   pop = translatedValue;
    // });
    // this.translateService.get('p2p.search.AllPaymentMethods').subscribe(translatedValue => {
    //   allPay = translatedValue;
    // });
    // this.translateService.get('p2p.search.AllOnlineOffers').subscribe(translatedValue => {
    //   allOnline = translatedValue;
    // });
    // this.translateService.get('p2p.search.InPerson').subscribe(translatedValue => {
    //   inPerson = translatedValue;
    // });
    // this.translateService.get('p2p.search.Cash').subscribe(translatedValue => {
    //   cash = translatedValue;
    // });
    let optgroup = '';
    const list = [];
    if (key === 'person') {
      optgroup = inPerson;
      list.push({key: 'CASH', name: cash});
    } else {
      if (key === 'top_five') {
        optgroup = pop;
      }
      if (key === 'all') {
        optgroup = allPay;
        list.push({key: 'ONLINE_OFFER', name: allOnline});
      }
      if (dataList[key]) {
        if (dataList[key].length > 0) {
          dataList[key].forEach((ele, idx) => {
            list.push({key: ele.key, name: ele.name});
          });
        }
      }
    }
    return {type: key, optgroup: optgroup, data: list};
  }

  giftCardIssue() {
    return this.dataService.getData('p2p/giftcardissues');
  }

  allFiatCurrency() {
    return this.dataService.getData('p2p/currencies/fiat');
  }

  calculateEquation(inputs: any) {
    return this.dataService.postData('p2p/price/equation', inputs);
  }

  publishAdvertisement(inputs: any) {
    return this.dataService.postData('p2p/posts', inputs);
  }

  getAdvertiseDetail(advertiseId: number) {
    return this.dataService.getData('p2p/post/' + advertiseId);
  }

  editAdvertise(advertiseId: number, inputs: any) {
    return this.dataService.postData('p2p/posts/' + advertiseId, inputs);
  }

  deleteAdvertise(advertiseId: any) {
    return this.dataService.postData('p2p/posts/' + advertiseId, { '_method' : 'DELETE' });
  }

  getAllAdvertises(page: number = 1, pageSize: number = 5) {
    return this.dataService.getData('p2p/posts?page=' + page + '&page_size=' + pageSize);
  }
}
