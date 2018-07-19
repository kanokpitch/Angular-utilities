import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { ToastrModule } from 'ngx-toastr';
import { NgPipesModule } from 'ngx-pipes';
import { SlugifyPipe } from 'ngx-pipes';
import { Select2Module } from 'ng2-select2';

import { GoogleService } from './services/google.services';
import { CommonService } from './services/common.service';
import { UploadService } from './services/upload.service';
import { DataService } from './services/data.service';
import { PostService } from './services/post.service';

import { AppComponent } from './app.component';
import { ScrollComponent } from './pages/scroll-template/scroll.component';
import { IndexComponent } from './pages/index.component';
import { NotifyComponent } from './pages/notify-template/notify.component';
import { SingleUploadComponent } from './pages/upload-template/single/single.component';
import { MultipleUploadComponent } from './pages/upload-template/multiple/multiple.component';
import { SharedModule } from './shared/shared.module';
import { AutocompleteTemplateComponent } from './pages/autocomplete-template/autocomplete-template.component';
import { TranslateComponent } from './pages/translate-template/translate.component';
import { PipesComponent } from './pages/pipes/pipes.component';
import { SelectComponent } from './pages/select-template/select.component';
import { SelectBasicComponent } from './pages/select-template/basic/basic.component';
import { SelectChangeComponent } from './pages/select-template/change/change.component';
import { SelectDynamicComponent } from './pages/select-template/dynamic/dynamic.component';
import { SelectMatcherComponent } from './pages/select-template/matcher/matcher.component';
import { SelectMultipleComponent } from './pages/select-template/multiple/multiple.component';
import { SelectOptionsComponent } from './pages/select-template/options/options.component';
import { SelectTemplateComponent } from './pages/select-template/template/template.component';
import { MaterialTemplateComponent } from './pages/material-template/material-template.component';
import { ButtonComponent } from './pages/material-template/button/button.component';
import { InputComponent } from './pages/material-template/input/input.component';
import { ThemeComponent } from './pages/material-template/theme/theme.component';
import { StaticComponent } from './pages/nvs/static/static.component';
import { DynamicComponent } from './pages/nvs/dynamic/dynamic.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollComponent,
    IndexComponent,
    NotifyComponent,
    SingleUploadComponent,
    MultipleUploadComponent,
    AutocompleteTemplateComponent,
    TranslateComponent,
    PipesComponent,
    SelectComponent,
    SelectBasicComponent,
    SelectChangeComponent,
    SelectDynamicComponent,
    SelectMatcherComponent,
    SelectMultipleComponent,
    SelectOptionsComponent,
    SelectTemplateComponent,
    MaterialTemplateComponent,
    ButtonComponent,
    InputComponent,
    ThemeComponent,
    StaticComponent,
    DynamicComponent
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
    NgPipesModule,
    Select2Module,
    SharedModule,
    MaterialModule
  ],
  providers: [
    SlugifyPipe,
    GoogleService,
    CommonService,
    UploadService,
    DataService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
