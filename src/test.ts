/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);
