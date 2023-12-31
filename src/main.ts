import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as moment from 'moment';

import { AppModule } from './app/app.module';
import { ENV } from './environments/environment';

if (ENV.production) {
	enableProdMode();
}

moment.locale('ru');

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
