import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;

  constructor() { }

  ngOnInit() {
    this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
  }
}
