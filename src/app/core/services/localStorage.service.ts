import { Injectable } from '@angular/core';
import type { UserData } from '../interfaces/localStorage.d';

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

  public async getUserId(): Promise<number> {
    try {
      const result = await this.getItemLocalStorage<UserData>('dataUser');
      return result!.id;
    } catch (error) {
      throw new Error('Not found userId in storage dataUser');
    }
  }
}
