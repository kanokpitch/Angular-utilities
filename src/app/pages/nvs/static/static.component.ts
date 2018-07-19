import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss', '../nvs.scss']
})
export class StaticComponent implements OnInit {
  notLoggedIn: boolean;
  notConnectAPI: boolean;
  loginId: number;
  isAdmin: boolean;

  countryGroup: any[];
  nvsCountryAutoList: any[];
  countryText: string;
  countryId: any;
  countryIdFromUrl: boolean;

  paymentMethod: string;
  paymentMethodText: string;
  paymentGroup: any[];
  nvsPaymentAutoList: any[];
  gps: string;

  searchType: string;
  searchTypeText: string;
  searchTypeOpp: string;
  tradeList: any;

  cryptoId: number;
  cryptoSymbol: string;
  cryptoText: string;
  cryptoList: any[];
  nvsCryptoAutoList: any[];

  amount: any;

  fiatId: number;
  fiatSymbol: string;
  fiatList: any[];
  nvsFiatAutoList: any[];
  cryptoCurrency: number;

  resultList: any[];
  pageSize: number;
  currentPage: number;
  lastPage: any;
  pageList: any[];
  start: number;
  end: number;
  sort: any;
  order: any;

  nvsControls: any;
  inputs: any;
  input: any;
  inputWidth: any;
  allCountryGroup: string;
  allCountryText: string;
  countryListTrans: string;
  buyText: string;
  sellText: string;
  formLoading: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private postService: PostService) { }

  ngOnInit() {
    this.notConnectAPI = false;
    this.notLoggedIn = false;
    this.isAdmin = false;
    this.paymentMethod = 'ONLINE_OFFER';
    this.amount = '';
    this.cryptoId = 1;
    this.cryptoSymbol = 'BTC';
    this.cryptoText = 'BTC';
    this.buyText = '';
    this.sellText = '';
    this.searchType = 'Buy';
    this.tradeList = {Buy: {key: 'Buy', trans: this.buyText}, Sell: {key: 'Sell', trans: this.sellText}};
    this.formLoading = true;
    this.resultList = [];
    this.pageSize = 10;
    this.lastPage = 0;
    this.pageList = [];
    this.pageSize = 10;
    this.currentPage = 1;
    this.countryId = 0;
    this.countryIdFromUrl = false;
    this.allCountryGroup = '';
    this.allCountryText = '';
    this.countryListTrans = '';
    this.nvsControls = {'country': true, 'payment': true, 'trade': true, 'crypto' : true, 'fiat': true};
    this.input = {
      'country': document.getElementById('input_country'),
      'payment': document.getElementById('payment_method_id'),
      'trade': document.getElementById('trade_type'),
      'crypto': document.getElementById('crypto_currency'),
      'fiat': document.getElementById('fiat_currency')
    };
    this.inputWidth = {'country': '100%', 'payment': '100%', 'trade': '100%', 'crypto': '100%', 'fiat': '100%'};
    this.getTradeList();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.offer) {
        const offer = params.offer;
        this.searchType = (( offer.toLowerCase() === 'sell' ) ? 'Buy' : 'Sell');
        this.getTradeList();
      }
      if (params.fiat_currency_id) {
        this.fiatId = +params.fiat_currency_id;
      }
      if (params.crypto_currency_id) {
        this.cryptoId = +params.crypto_currency_id;
      }
      if (params.country_id) {
        this.countryId = +params.country_id;
        this.countryIdFromUrl = true;
      }
      if (params.payment_method) {
        this.paymentMethod = params.payment_method;
      }
      if (params.gps) {
        this.gps = params.gps;
      }
      if (params.page_size) {
        this.pageSize = +params.page_size;
      }
      if (params.page) {
        this.currentPage = +params.page;
      }
      if (params.amount) {
        this.amount = params.amount;
      }
      if (params.sort) {
        this.sort = params.sort;
      }
      if (params.order) {
        this.order = params.order;
      }
    });

    this.nvsDetectClicked();
    this.nvsOnResize();
    // this.translateService.onLangChange.subscribe(() => {
    //   this.otherText();
    // });
  }

  getPayment() {
    this.paymentGroup = [];
    this.nvsPaymentAutoList = [];
    this.nvsControls.payment = true;
    const lang = (localStorage.getItem('language')) ? localStorage.getItem('language') : 'en';
    this.dataService.getData('p2p/paymentmethods?country_id=' + this.countryId + '&language=' + lang).then(res => {
      const d: any = res;
      if ( d.statusCode === 200 ) {
        const top_five = this.postService.arrangePaymentList(d.data, 'top_five');
        const all = this.postService.arrangePaymentList(d.data, 'all');
        const person = this.postService.arrangePaymentList([], 'person');
        if (top_five.data.length > 0) {
          this.paymentGroup.push(top_five);
        }
        if (all.data.length > 0) {
          this.paymentGroup.push(all);
        }
        if (person.data.length > 0) {
          this.paymentGroup.push(person);
        }
        this.nvsPaymentSetting();
      }
    });
  }

  inputPayment(): void {
    const inputText = (<HTMLInputElement>this.input.payment).value;
    this.nvsControls['payment'] = false;
    this.nvsPaymentAutoList = this.dataService.pushElementInAutoCompleteList(inputText, this.paymentGroup, 'name', 'group');
  }

  allPayment() {
    this.nvsCheckControls('payment');
    this.nvsPaymentAutoList = this.paymentGroup;
  }

  nvsPaymentClicked(paymentKey: any) {
    this.nvsControls['payment'] = true;
    this.paymentMethod = paymentKey;
    this.paymentMethodText = this.dataService.textFromGroup(this.paymentGroup, 'key', 'name', this.paymentMethod);
  }

  nvsPaymentSetting() {
    this.paymentMethodText = this.dataService.textFromGroup(this.paymentGroup, 'key', 'name', this.paymentMethod);
    this.nvsPaymentAutoList = this.paymentGroup;
    if (this.input.payment) {
      this.inputWidth.payment = '' + this.input.payment.offsetWidth + 'px';
    }
    // this.translateService.onLangChange.subscribe(() => {
    //   if (! this.notConnectAPI && this.isHomePage()) {
    //     this.getCountry();
    //   }
    // });
  }

  nvsTradeClicked(searchType: any) {
    this.nvsControls.trade = true;
    this.searchType = searchType;
    this.searchTypeText = this.findTrade(this.searchType, 'trans');
  }

  async getTradeList() {
    this.buyText = await this.translateText('p2p.search.BUY') as string;
    this.sellText = await this.translateText('p2p.search.SELL') as string;
    this.tradeList.Buy.trans = this.buyText;
    this.tradeList.Sell.trans = this.sellText;
    this.searchTypeText = this.findTrade(this.searchType, 'trans');
    if (this.input.trade) {
      this.inputWidth.trade = '' + this.input.trade.offsetWidth + 'px';
    }
  }

  findTrade(keyword: string, rtVal: string) {
    let text = '';
    Object.keys(this.tradeList).forEach(key => {
      if (keyword === key) {
        text = this.tradeList[key][rtVal];
      }
    });
    return text;
  }

  translateText(word: string) {
    return new Promise((resolve) => {
      // this.translateService.get(word).subscribe(translatedValue => {
        const translatedValue: any = word;
        resolve(translatedValue);
      // });
    });
  }

  getTradeType(tradeType: string) {
    return ( tradeType.toLowerCase() === 'buy' ) ? 'Sell' : 'Buy';
  }

  inputCrypto() {
    this.nvsControls['crypto'] = false;
    this.nvsCryptoAutoList = this.dataService.pushElementInAutoCompleteList(this.cryptoText, this.cryptoList, 'symbol');
  }

  allCrypto() {
    this.nvsCheckControls('crypto');
    this.nvsCryptoAutoList = this.cryptoList;
  }

  nvsCryptoClicked(cryptoSymbol: any, cryptoId: any) {
    this.nvsControls.crypto = true;
    if ( cryptoSymbol ) {
      this.cryptoSymbol = cryptoSymbol;
      this.cryptoText = cryptoSymbol;
      this.cryptoId = cryptoId;
    }
  }

  nvsCryptoSetting() {
    this.nvsCryptoAutoList = this.cryptoList;
    this.findCryptoSymbol(this.cryptoId);
    if (this.input.crypto) {
      this.inputWidth.crypto = '' + this.input.crypto.offsetWidth + 'px';
    }
  }

  nvsCheckControls(keyControl: string) {
    Object.keys(this.nvsControls).forEach(key => {
      if (key === keyControl) {
        this.nvsControls[key] = false;
      } else {
        if ( ! this.nvsControls[key] ) {
          this.nvsControls[key] = true;
        }
      }
    });
  }

  findCryptoSymbol(cryptoId: any) {
    if (this.cryptoList.length) {
      this.cryptoList.forEach((ele, idx) => {
        if (ele.id === cryptoId) {
          this.cryptoSymbol = ele.symbol;
          this.cryptoText = ele.symbol;
        }
      });
    }
  }

  onTabEnter(event: any, id, mode: string, list: any, searchKey: any) {
    // console.log(event.key, id, mode);
    if ( event.key === 'Tab' || event.key === 'Enter') {
      const inputText = (<HTMLInputElement>document.getElementById(id)).value;
      const compare = inputText.toUpperCase();
      if ( list ) {
        list.forEach((ele, idx) => {
          if (ele.data) {
            if (ele.data.length) {
              ele.data.forEach((e, i) => {
                const org = e[searchKey].toUpperCase();
                if (org.search(compare) !== -1 ) {
                  if (mode === 'nvsPaymentAutoComplete') {
                    this.nvsPaymentClicked(e.key);
                  }
                }
              });
            }
          } else {
            const org = ele[searchKey].toUpperCase();
            if (org.search(compare) !== -1 ) {
              if (mode === 'nvsCryptoAutoComplete') {
                this.nvsCryptoClicked(ele.symbol, ele.id);
              }
            }
          }
        });
      }
    }
  }

  nvsOnResize() {
    window.onresize = () => {
      if (this.input.country) {
        this.inputWidth.country = '' + this.input.country.offsetWidth + 'px';
      }
      if (this.input.payment) {
        this.inputWidth.payment = '' + this.input.payment.offsetWidth + 'px';
      }
      if (this.input.trade) {
        this.inputWidth.trade = '' + this.input.trade.offsetWidth + 'px';
      }
      if (this.input.crypto) {
        this.inputWidth.crypto = '' + this.input.crypto.offsetWidth + 'px';
      }
      if (this.input.fiat) {
        this.inputWidth.fiat = '' + this.input.fiat.offsetWidth + 'px';
      }
    };
  }

  nvsDetectClicked() {
    document.addEventListener('click', (event) => {
      const cName = (<HTMLInputElement>event.target).className;
      if ( (cName.search('nvs-item') === -1) && (cName.search('nvs-input') === -1) ) {
        Object.keys(this.nvsControls).forEach(key => {
          if ( ! this.nvsControls[key] ) {
            this.nvsControls[key] = true;
          }
        });
      }
    });
  }
}
