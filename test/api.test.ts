import axios from 'axios';
import { expect } from 'chai';
import {
    SingleUserResponse,
    RegisterResponse,
    LoginResponse,
    UpdateUserResponse,
    RegisterRequest,
    LoginRequest,
    UpdateUserRequest
} from '../src/interfaces/api.interfaces';

const BASE_URL = 'https://reqres.in/api';

describe('Reqres API Tests', () => {
    describe('GET Single User', () => {
        it('should get a single user successfully', async () => {
            const response = await axios.get<SingleUserResponse>(`${BASE_URL}/users/2`);
            // Check status code
            expect(response.status).to.equal(200);
            // Check data structure
            expect(response.data.data).to.have.property('id');
            expect(response.data.data).to.have.property('email');
            expect(response.data.data).to.have.property('first_name');
            expect(response.data.data).to.have.property('last_name');
            expect(response.data.data).to.have.property('avatar');
            // Check support object structure
            expect(response.data.support).to.have.property('url');
            expect(response.data.support).to.have.property('text');

        });

    });

    describe('POST Register', () => {
        it('should register successfully', async () => {
            const userData: RegisterRequest = {
                email: "eve.holt@reqres.in",
                password: "pistol"
            };

            const response = await axios.post<RegisterResponse>(`${BASE_URL}/register`, userData);
            
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('id');
            expect(response.data).to.have.property('token');
            expect(response.data.id).to.equal(4);
            expect(response.data.token).to.equal('QpwL5tke4Pnpja7X4');
        });

        it('should fail registration without password', async () => {
            const userData: RegisterRequest = {
                email: "sydney@fife",
                password: ""
            };

            try {
                await axios.post(`${BASE_URL}/register`, userData);
                throw new Error('Expected 400 error but got success');
            } catch (error) {
                const axiosError = error as any;
                expect(axiosError.response?.status).to.equal(400);
                expect(axiosError.response?.data).to.have.property('error');
                expect(axiosError.response?.data.error).to.equal('Missing password');
            }
        });

        it('should fail registration without email', async () => {
            const userData: RegisterRequest = {
                email: "",
                password: "pistol"
            };

            try {
                await axios.post(`${BASE_URL}/register`, userData);
                throw new Error('Expected 400 error but got success');
            } catch (error) {
                const axiosError = error as any;
                expect(axiosError.response?.status).to.equal(400);
                expect(axiosError.response?.data).to.have.property('error');
                expect(axiosError.response?.data.error).to.equal('Missing email or username');
            }
        });
    });

    describe('POST Login', () => {
        it('should login successfully', async () => {
            const loginData: LoginRequest = {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            };

            const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, loginData);
            
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('token');
            expect(response.data.token).to.equal('QpwL5tke4Pnpja7X4');
        });

        it('should fail login without password', async () => {
            const userData: RegisterRequest = {
                email: "sydney@fife",
                password: ""
            };

            try {
                await axios.post(`${BASE_URL}/login`, userData);
                throw new Error('Expected 400 error but got success');
            } catch (error) {
                const axiosError = error as any;
                expect(axiosError.response?.status).to.equal(400);
                expect(axiosError.response?.data).to.have.property('error');
                expect(axiosError.response?.data.error).to.equal('Missing password');
            }
        });

        it('should fail login without email', async () => {
            const userData: RegisterRequest = {
                email: "",
                password: "pistol"
            };

            try {
                await axios.post(`${BASE_URL}/login`, userData);
                throw new Error('Expected 400 error but got success');
            } catch (error) {
                const axiosError = error as any;
                expect(axiosError.response?.status).to.equal(400);
                expect(axiosError.response?.data).to.have.property('error');
                expect(axiosError.response?.data.error).to.equal('Missing email or username');
            }
        });

        it('should fail login with invalid credentials - user not found', async () => {
            const loginData: LoginRequest = {
                email: "user-not-found@klaven",
                password: "pistol"
            };

            try {
                await axios.post(`${BASE_URL}/login`, loginData);
                throw new Error('Expected 400 error but got success');
            } catch (error) {
                const axiosError = error as any;
                expect(axiosError.response?.status).to.equal(400);
                expect(axiosError.response?.data).to.have.property('error');
                expect(axiosError.response?.data.error).to.equal('user not found');
            }
        });
    });

    describe('PATCH Update User', () => {
        it('should update user successfully - both name and job', async () => {
            const updateData: UpdateUserRequest = {
                name: "morpheus",
                job: "zion resident"
            };

            const response = await axios.patch<UpdateUserResponse>(`${BASE_URL}/users/2`, updateData);
            
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('name', updateData.name);
            expect(response.data).to.have.property('job', updateData.job);
            expect(response.data).to.have.property('updatedAt');

            expect(response.data.name).to.equal(updateData.name);
            expect(response.data.job).to.equal(updateData.job);
        });

        it('should update user successfully - only name', async () => {
            const updateData: UpdateUserRequest = {
                name: "neo",
            };

            const response = await axios.patch<UpdateUserResponse>(`${BASE_URL}/users/2`, updateData);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('updatedAt');
            expect(response.data).to.have.property('name', updateData.name);
            expect(response.data.name).to.equal(updateData.name);
        });

        it('should update user successfully - only job', async () => {
            const updateData: UpdateUserRequest = {
                job: "the chosen one",
            };

            const response = await axios.patch<UpdateUserResponse>(`${BASE_URL}/users/2`, updateData);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('updatedAt');
            expect(response.data).to.have.property('job', updateData.job);
            expect(response.data.job).to.equal(updateData.job);
        });

        it('should update user successfully - empty body', async () => {
            const updateData: UpdateUserRequest = {
            };

            const response = await axios.patch<UpdateUserResponse>(`${BASE_URL}/users/2`, updateData);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('updatedAt');
        });
    });
});
