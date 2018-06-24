import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.bodyHeight();
  }

  bodyHeight() {
    setTimeout(() => {
      document.getElementById('inner').style.display = 'block';
    }, 3000);

    let i = 0;
    const count = setInterval(() => {
      const body = document.body;
      const html = document.documentElement;
      const loadEle = document.getElementById('inner');
      const bsch = body.scrollHeight;
      const bosh = body.offsetHeight;
      const hclh = html.clientHeight;
      const hsch = html.scrollHeight;
      const hosh = html.offsetHeight;
      const height = Math.max(bsch, bosh, hclh, hsch, hosh);
      console.log(i, bsch, bosh, hclh, hsch, hosh, loadEle.scrollHeight, height);
      if ( loadEle.scrollHeight !== 0 ) {
        clearInterval(count);
      }
      i++;
    }, 10);
  }
}
