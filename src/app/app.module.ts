import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CommonService } from './services/common.service';
import { UploadService } from './services/upload.service';

import { AppComponent } from './app.component';
import { ScrollComponent } from './pages/scroll-template/scroll.component';
import { IndexComponent } from './pages/index.component';
import { NotifyComponent } from './pages/notify-template/notify.component';
import { SingleUploadComponent } from './pages/upload-template/single/single.component';
import { MultipleUploadComponent } from './pages/upload-template/multiple/multiple.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ScrollComponent,
    IndexComponent,
    NotifyComponent,
    SingleUploadComponent,
    MultipleUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-right'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    SharedModule
  ],
  providers: [CommonService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
