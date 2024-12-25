export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface Support {
    url: string;
    text: string;
}

export interface SingleUserResponse {
    data: User;
    support: Support;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
}

export interface RegisterResponse {
    id: number;
    token: string;
}

export interface LoginResponse {
    token: string;
}

export interface ErrorResponse {
    error: string;
}

export interface UpdateUserRequest {
    name?: string;
    job?: string;
}

export interface UpdateUserResponse {
    name: string;
    job: string;
    updatedAt: string;
}
