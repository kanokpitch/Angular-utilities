import { Component, OnInit } from '@angular/core';
import { GoogleService, GoogleObj } from '../../services/google.services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  public googleObj: GoogleObj = new GoogleObj();
  customObj: any;
  key: string;
  public result = '';
  private btnSubmit: any;

  constructor(private _google: GoogleService) { }

  ngOnInit() {
    this.key = environment.googleApiKey;
    this.customObj = this.googleObj;
    this.customObj.target = 'th';
    this.customObj.q = 'My home is your home.';
    // googleObj.q
    this.btnSubmit = document.getElementById('btnSubmit');
  }

  send() {
    this.btnSubmit.disabled = true;
    this._google.translate(this.customObj, this.key).subscribe(
      (res: any) => {
        this.btnSubmit.disabled = false;
        this.result = res.data.translations[0].translatedText;
      },
      err => {
        console.log(err);
      }
    );
  }

}
