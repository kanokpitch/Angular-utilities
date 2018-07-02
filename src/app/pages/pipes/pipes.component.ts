import { Component, OnInit } from '@angular/core';
import { SlugifyPipe } from 'ngx-pipes';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {
  orgTitle: string;

  constructor(private slugifyPipe: SlugifyPipe) { }

  ngOnInit() {
    this.orgTitle = 'ซื้อ  Bitcoins  ด้วยธนาคาร: โอนเงินผ่านธนาคารชาติ  ด้วย Thai Baht (THB)';
    const newSlug = this.slugifyPipe.transform(this.orgTitle);
    console.log(newSlug);
  }

}
