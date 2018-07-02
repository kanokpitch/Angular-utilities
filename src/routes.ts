import { Routes } from '@angular/router';
import { IndexComponent } from './app/pages/index.component';
import { ScrollComponent } from './app/pages/scroll-template/scroll.component';
import { NotifyComponent } from './app/pages/notify-template/notify.component';
import { SingleUploadComponent } from './app/pages/upload-template/single/single.component';
import { MultipleUploadComponent } from './app/pages/upload-template/multiple/multiple.component';
import { TranslateComponent } from './app/pages/translate-template/translate.component';
import { PipesComponent } from './app/pages/pipes/pipes.component';

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'scroll', component: ScrollComponent },
  { path: 'notify', component: NotifyComponent },
  { path: 'single-upload', component: SingleUploadComponent },
  { path: 'multiple-upload', component: MultipleUploadComponent },
  { path: 'pipe', component: PipesComponent },
  { path: 'translate', component: TranslateComponent }
];
