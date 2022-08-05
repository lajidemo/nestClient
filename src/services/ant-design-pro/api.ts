// @ts-ignore
/* eslint-disable */
import { localStorFn } from '@/utils';
import { message } from 'antd';
import { request } from 'umi';

const baseRequest = (method: 'GET' | 'POST', url: string, options?: { [key: string]: any }) => {
  const accessToken = localStorFn('get', 'accessToken') || '';
  console.log('accessToken===', accessToken);
  return request<Record<string, any>>(url, {
    ...options,
    headers: {
      accessToken,
      'Content-Type': 'application/json',
    },
    timeout: 3600,
    prefix: '/api',
    method,
  }).then(
    (res) => {
      console.log('res===', res);
      if (res.code === 200) {
        return res.data;
      }
    },
    () => {
      if (options?.unError) {
        return;
      }
      message.error('请求失败');
    },
  );
};

export const getRequest = <T>(
  url: string,
  params?: object,
  options?: { [key: string]: any },
): Promise<T> => {
  return baseRequest('GET', url, { params, ...options });
};

export const postRequest = <T>(
  url: string,
  params?: object,
  options?: { [key: string]: any },
): Promise<T> => {
  return baseRequest('POST', url, { data: params, ...options });
};

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  return getRequest<API.CurrentUser>('/currentUser');
  // return request<{
  //   data: API.CurrentUser;
  // }>('/api/currentUser', {
  //   method: 'GET',
  // });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(params: API.LoginParams, options?: any) {
  return postRequest('/user/signIn', params, options);
}

// export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
//   return request<API.LoginResult>('/api/login/account', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
