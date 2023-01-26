import { Injectable } from '@angular/core';
import { SuccessReturn } from '../interfaces/api';
import { ConnectionApproveParams } from '../interfaces/connections';
import { Api } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsService extends Api {
  public async approveOrHideConnection(
    connectionParams: ConnectionApproveParams,
  ): Promise<SuccessReturn> {
    const result = await this.sendRequest<ConnectionApproveParams, SuccessReturn>(
      'approve_connection',
      'post',
      connectionParams
    );
    return result;
  }
}
