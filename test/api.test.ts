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
            
            expect(response.status).to.equal(200);
            
            // Check data structure
            expect(response.data.data).to.have.property('id');
            expect(response.data.data).to.have.property('email');
            expect(response.data.data).to.have.property('first_name');
            expect(response.data.data).to.have.property('last_name');
            expect(response.data.data).to.have.property('avatar');

            // Check specific values for user data
            expect(response.data.data.id).to.equal(2);
            expect(response.data.data.email).to.equal('janet.weaver@reqres.in');
            expect(response.data.data.first_name).to.equal('Janet');
            expect(response.data.data.last_name).to.equal('Weaver');
            expect(response.data.data.avatar).to.equal('https://reqres.in/img/faces/2-image.jpg');

            // Check support object structure
            expect(response.data.support).to.have.property('url');
            expect(response.data.support).to.have.property('text');

            // Check specific values for support object
            expect(response.data.support.url).to.equal('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
            expect(response.data.support.text).to.equal('Tired of writing endless social media content? Let Content Caddy generate it for you.');

            // Alternative way to check the entire response at once
            expect(response.data).to.deep.equal({
                data: {
                    id: 2,
                    email: 'janet.weaver@reqres.in',
                    first_name: 'Janet',
                    last_name: 'Weaver',
                    avatar: 'https://reqres.in/img/faces/2-image.jpg'
                },
                support: {
                    url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
                    text: 'Tired of writing endless social media content? Let Content Caddy generate it for you.'
                }
            }); 
        });

        it('should return 404 for non-existent user', async () => {
            try {
                await axios.get(`${BASE_URL}/users/23`);
                throw new Error('Expected 404 error but got success');
            } catch (error) {
                const axiosError = error as any;
                expect(axiosError.response?.status).to.equal(404);
            }
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

        it('should fail login with invalid credentials', async () => {
            const loginData: LoginRequest = {
                email: "peter@klaven",
                password: ""
            };

            try {
                await axios.post(`${BASE_URL}/login`, loginData);
                throw new Error('Expected 400 error but got success');
            } catch (error) {
                const axiosError = error as any;
                expect(axiosError.response?.status).to.equal(400);
                expect(axiosError.response?.data).to.have.property('error');
                expect(axiosError.response?.data.error).to.equal('Missing password');
            }
        });
    });

    describe('PATCH Update User', () => {
        it('should update user successfully', async () => {
            const updateData: UpdateUserRequest = {
                name: "morpheus",
                job: "zion resident"
            };

            const response = await axios.patch<UpdateUserResponse>(`${BASE_URL}/users/2`, updateData);
            
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('name', updateData.name);
            expect(response.data).to.have.property('job', updateData.job);
            expect(response.data).to.have.property('updatedAt');
        });
    });
});
