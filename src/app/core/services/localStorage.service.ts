/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public setDataToStorage<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public async getItemLocalStorage<T>(key: string): Promise<T | null> {
    try {
      const result = await JSON.parse(localStorage.getItem(key) || '{}');
      return result;
    } catch (error) {
      return null;
    }
  }
}
