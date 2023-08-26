import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { StaffSharedModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(StaffSharedModule)
  .catch(err => console.error(err));
