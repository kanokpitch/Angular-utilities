import { Routes } from '@angular/router';
import { IndexComponent } from './app/pages/index.component';
import { ScrollComponent } from './app/pages/scroll-template/scroll.component';
import { NotifyComponent } from './app/pages/notify-template/notify.component';
import { SingleUploadComponent } from './app/pages/upload-template/single/single.component';
import { MultipleUploadComponent } from './app/pages/upload-template/multiple/multiple.component';
import { TranslateComponent } from './app/pages/translate-template/translate.component';
import { PipesComponent } from './app/pages/pipes/pipes.component';
import { SelectComponent } from './app/pages/select-template/select.component';
import { SelectBasicComponent } from './app/pages/select-template/basic/basic.component';
import { SelectChangeComponent } from './app/pages/select-template/change/change.component';
import { SelectDynamicComponent } from './app/pages/select-template/dynamic/dynamic.component';
import { SelectMatcherComponent } from './app/pages/select-template/matcher/matcher.component';
import { SelectMultipleComponent } from './app/pages/select-template/multiple/multiple.component';
import { SelectOptionsComponent } from './app/pages/select-template/options/options.component';
import { SelectTemplateComponent } from './app/pages/select-template/template/template.component';
import { MaterialTemplateComponent } from './app/pages/material-template/material-template.component';
import { ButtonComponent } from './app/pages/material-template/button/button.component';
import { InputComponent } from './app/pages/material-template/input/input.component';

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'scroll', component: ScrollComponent },
  { path: 'notify', component: NotifyComponent },
  { path: 'select', component: SelectComponent },
  { path: 'select-basic', component: SelectBasicComponent },
  { path: 'select-change', component: SelectChangeComponent },
  { path: 'select-dynamic', component: SelectDynamicComponent },
  { path: 'select-matcher', component: SelectMatcherComponent },
  { path: 'select-multiple', component: SelectMultipleComponent },
  { path: 'select-options', component: SelectOptionsComponent },
  { path: 'select-template', component: SelectTemplateComponent },
  { path: 'single-upload', component: SingleUploadComponent },
  { path: 'multiple-upload', component: MultipleUploadComponent },
  {
    path: 'material',
    children: [
      { path: '', component: MaterialTemplateComponent },
      { path: 'button', component: ButtonComponent },
      { path: 'input', component: InputComponent }
    ]
  },
  { path: 'pipe', component: PipesComponent },
  { path: 'translate', component: TranslateComponent }
];
