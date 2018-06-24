import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-upload',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.css']
})
export class MultipleUploadComponent implements OnInit {
  multiImage: any[] = [];

  constructor() { }

  addAnother() {
    this.multiImage.push({'sameMulti': './assets/images/bitcoin.png', 'fileSameMulti': null});
  }

  deleteFile(i: any = null) {
    const conf = confirm('ยืนยันการลบรูปภาพ?');

    if (conf) {
      // this.multiImage.splice(i, 1);
    }
  }

  ngOnInit() {
    // this.defaultImg = './assets/images/bitcoin.png';
  }

}
