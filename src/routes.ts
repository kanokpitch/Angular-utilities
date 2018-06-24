import { Routes } from '@angular/router';
import { IndexComponent } from './app/pages/index.component';
import { ScrollComponent } from './app/pages/scroll-template/scroll.component';
import { NotifyComponent } from './app/pages/notify-template/notify.component';

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'scroll', component: ScrollComponent },
  { path: 'notify', component: NotifyComponent }
];
