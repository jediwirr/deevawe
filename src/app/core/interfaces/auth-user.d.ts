interface UserDataVerify {
	code: string;
	email: string;
	type: 'activation';
}

interface AuthUserData {
	email: string;
	password: string;
}

export { UserDataVerify, AuthUserData };
