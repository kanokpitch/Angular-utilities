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
import { ThemeComponent } from './app/pages/material-template/theme/theme.component';
import { StaticComponent } from './app/pages/nvs/static/static.component';
import { DynamicComponent } from './app/pages/nvs/dynamic/dynamic.component';

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'scroll', component: ScrollComponent },
  { path: 'notify', component: NotifyComponent },
  {
    path: 'select',
    children: [
      { path: '', component: SelectComponent },
      { path: 'basic', component: SelectBasicComponent },
      { path: 'change', component: SelectChangeComponent },
      { path: 'dynamic', component: SelectDynamicComponent },
      { path: 'matcher', component: SelectMatcherComponent },
      { path: 'multiple', component: SelectMultipleComponent },
      { path: 'options', component: SelectOptionsComponent },
      { path: 'template', component: SelectTemplateComponent }
    ]
  },
  {
    path: 'nvs',
    children: [
      { path: 'static', component: StaticComponent },
      { path: 'dynamic', component: DynamicComponent }
    ]
  },
  { path: 'single-upload', component: SingleUploadComponent },
  { path: 'multiple-upload', component: MultipleUploadComponent },
  {
    path: 'material',
    children: [
      { path: '', component: MaterialTemplateComponent },
      { path: 'button', component: ButtonComponent },
      { path: 'input', component: InputComponent },
      { path: 'theme', component: ThemeComponent }
    ]
  },
  { path: 'pipe', component: PipesComponent },
  { path: 'translate', component: TranslateComponent }
];
