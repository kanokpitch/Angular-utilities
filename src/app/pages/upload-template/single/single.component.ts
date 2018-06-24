import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-single-upload',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleUploadComponent implements OnInit {
  same: any;
  fileSame: any;
  showSelectSameMessage: boolean;
  selectSameMessage: string;

  constructor(private uploadService: UploadService) { }

  selectImage(event: any) {
    const file = event.srcElement.files[0];
    const type = ( file ) ? file.type : '' ;
    const size = ( file ) ? file.size : 0 ;
    const name = ( file ) ? file.name : '' ;
    const tlwc = type.toLowerCase();
    console.log(tlwc, size, name);
    if (type) {
      if ( !(tlwc === 'image/jpg' || tlwc === 'image/jpeg' || tlwc === 'image/png' || tlwc === 'image/gif')) {
        this.showSelectSameMessage = true;
        this.selectSameMessage = 'File type is invalid!';
        console.log('type error...');
      } else {
        console.log('type ok...');
        if (size > 5242880) { // 5Mb
          this.showSelectSameMessage = true;
          this.selectSameMessage = 'File size more than 5Mb!';
        } else {
          const img = <HTMLElement>document.querySelector('#coverPreview img');
          img['src'] = file;

          const reader = new FileReader();

          reader.onload = (function(aImg) {
            return function(e: any) {
              aImg['src'] = e.target.result;
            };
          })(img);
          reader.readAsDataURL(file);

          this.fileSame = file;
          // this.callApiUploadCover(file);
          this.showSelectSameMessage = false;
        }
      }
    } else {
      alert(type);
    }
  }

  deleteFile() {
    const conf = confirm('ยืนยันการลบรูปภาพ?');

    if (conf) {
        this.fileSame = null;
        this.same = './assets/images/no-image.png';
        const img = <HTMLElement>document.querySelector('#coverPreview img');
        img['src'] = this.same;
    }
  }

  callApiUploadCover(file: any) {
    const inputs = new FormData();
    inputs.append('image', file);

    this.uploadService.addCoverImage(inputs).then(data => {
      const d: any = data;

      if (d.statusCode !== 200) {
        this.showSelectSameMessage = true;
        this.selectSameMessage = d.message;

        setTimeout(() => {
          this.selectSameMessage = '';
          this.showSelectSameMessage = false;
        }, 3000);
      }
    });
  }

  ngOnInit() {
    this.fileSame = null;
    this.same = './assets/images/no-image.png';
    this.showSelectSameMessage = false;
  }
}
