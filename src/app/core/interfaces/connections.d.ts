import { Connection } from './users';

type ConnectionParams = Omit<Connection, 'can_change' | 'show'>;

interface ConnectionApproveParams extends ConnectionParams {
	connected_user: number;
}

export { ConnectionApproveParams };
