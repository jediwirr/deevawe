interface SingInUserResponse extends ErrorApiResponse {
	success: boolean;
	user: number;
	token: string;
}

interface ErrorApiResponse {
	message?: string;
	code?: number;
}

interface SuccessReturn {
	success: boolean;
	message?: string;
}

export {
	SingInUserResponse,
	ErrorApiResponse,
	SuccessReturn,
};
