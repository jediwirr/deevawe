import { ErrorApiResponse } from './api';

interface User extends ErrorApiResponse {
  id: number;
  name: string;
  features: string[];
  connections: Connection[];
  image: string;
}

interface Connection {
  user_id: number;
  approve: boolean;
  can_change: boolean;
  show: boolean;
}


export { User, Connection };
