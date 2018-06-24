import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }

  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');
  }

  showError() {
    this.toastrService.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastrService.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastrService.info('Just some information for you.');
  }
}
