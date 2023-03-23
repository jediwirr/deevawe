interface SendVerifyCodeResponse {
	success: boolean;
}

interface VerifyUserResponse extends ErrorApiResponse {
	success: boolean;
}

interface SingInUserResponse extends ErrorApiResponse {
	success: boolean;
	user: number;
	token: string;
}

interface SignUpUserResponse extends ErrorApiResponse {
	success: boolean;
}

interface ChangePasswordResponse extends ErrorApiResponse {
	success: boolean;
}

interface SignOutResponse extends ErrorApiResponse {
	success?: boolean;
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
	SendVerifyCodeResponse,
	VerifyUserResponse,
	SingInUserResponse,
	SignUpUserResponse,
	ChangePasswordResponse,
	SignOutResponse,
	ErrorApiResponse,
	SuccessReturn,
};
