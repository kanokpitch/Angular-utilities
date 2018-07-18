import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  data: any;
  constructor() { }

  ngOnInit() {
    this.data = [{image: {id: 0}}];


    const myId = this.data[0].image.id;

  }

}
