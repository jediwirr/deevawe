import { Injectable } from '@angular/core';
import { SendVerifyCodeResponse, VerifyUserResponse } from '../interfaces/api';
import { UserDataVerify } from '../interfaces/auth-user';
import { Api } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyApiService extends Api {
  public async sendCode(email: string): Promise<SendVerifyCodeResponse> {
    const result = await this.request<
      { email: string },
      SendVerifyCodeResponse
    >('send_verify_code', 'post', { email });
    return result;
  }

  public async sendUser(userData: UserDataVerify): Promise<VerifyUserResponse> {
    const result = await this.request<UserDataVerify, VerifyUserResponse>(
      'verify_user',
      'post',
      userData
    );
    return result;
  }
}
