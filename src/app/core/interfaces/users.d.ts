interface User {
  id: number;
  name: string;
  descriptions: string[];
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

type UpdateUser = Omit<User, 'connections'>;

export { User, Connection, UpdateUser };
