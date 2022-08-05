import { postRequest } from './api';

export function login(params: API.LoginParams, options?: any) {
  return postRequest<API.LoginResult>('/user/signIn', params, options);
}
