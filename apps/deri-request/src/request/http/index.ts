import axios, {
  type AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios';
import { getCookieAsync } from '../storage';
import {
  LANGUAGE_COOKIE,
  TOKEN_COOKIE,
  SSO_TIMEOUT,
  TOKEN_PENDING_EXPIRED,
  TOKEN_INVALID
} from '../../constants';
import { getToken, backToLogin } from '../auth';
import { getAPIHost } from '../url';
import qs from 'qs';
import { trimStart, merge } from 'lodash-es';

export interface RequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
  headers: any;
}

export type ResponseData<T = any> = {
  code?: number;
  errorcode?: number;
  msg: string;
  message: string;
  data: T;
};

export type HTTPResponse<T> = Promise<ResponseData<T>>;

export type HTTPPageResponse<T> = Promise<ResponsePageData<T>>;

// 分页查询类型特殊处理
export type ResponsePageData<T = any> = {
  code?: number;
  msg: string;
  data: T;
  page_info: {
    page_no: number;
    page_num: number;
    page_size: number;
    total: number;
  };
};

// axios baseURL配置
let baseUrl = '';

export function initBaseUrl() {
  // 用于项目内覆盖默认生成的baseURL配置
  if (window.baseURL) {
    baseUrl = window.baseURL;
    return baseUrl;
  }
  // 开发、测试、生产环境
  baseUrl = getAPIHost();
  return baseUrl;
}

// 设置axios实例配置
const axiosInstance = axios.create({
  baseURL: initBaseUrl(),
  timeout: SSO_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// axios实例请求拦截器，请求头统一加上token、language字段
axiosInstance.interceptors.request.use(
  async (config: RequestConfig) => {
    const token = await getCookieAsync(TOKEN_COOKIE);
    if (token) {
      config.headers['token'] = token;
    }
    const language = await getCookieAsync(LANGUAGE_COOKIE);
    // 国际化语言
    if (language) {
      config.headers['language'] = language;
    }
    // 传递给网关的特殊请求头标记供用户分析用
    config.headers['Deri-Referer'] = window.location.href;
    // 默认deri-request库都是在浏览器中运行
    config.headers['Deri-RS'] = 'WEB';
    if (window.isApp) {
      config.headers['Deri-RS'] = 'APP';
    }
    // APP代码在微信小程序webview中访问
    if (navigator.userAgent.toLowerCase().includes('miniprogram')) {
      config.headers['Deri-RS'] = 'WEAPP';
    }
    if (config.method == 'delete' || config.method == 'get') {
      config.paramsSerializer = {
        encode: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
        serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
        indexes: false
      };
    }
    // 因为请求拦截器优先级比请求配置的优先级高，提供一个特殊参数去修改拦截器中默认定义的配置
    // @ts-ignore
    if (config.extraConfig) {
      // @ts-ignore
      return merge(config, config.extraConfig);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function processResponseData(respData: any) {
  if (respData) {
    // 处理错误信息字段
    respData.msg = respData.message = respData.msg || respData.message;
    const code = respData.code;
    // 虚拟电厂特殊处理
    const errorcode = respData.errorcode;
    if (code || errorcode) {
      // 判断平台状态码
      switch (code) {
        case TOKEN_PENDING_EXPIRED:
          // 待过期token(重新获取token)
          getToken();
          break;
        case TOKEN_INVALID:
          // 无效token(没有token或者token过期)
          backToLogin();
          break;
      }
      return Promise.reject(respData);
    } else {
      return Promise.resolve(respData);
    }
  } else {
    return Promise.reject({ code: 500, msg: '系统错误' });
  }
}

// 全局响应拦截器，处理异常code
axiosInstance.interceptors.response.use(
  // http状态码2xx以内的处理
  (response: AxiosResponse<ResponseData>): any => {
    const respData = response.data;
    return processResponseData(respData);
  },
  (error: any) => {
    // http状态码2xx以外的响应都处理为异常，并返回数据
    const respData = error.response.data;
    return processResponseData(respData);
  }
);

/**
 * 请求配置处理
 * @param url
 * @param method
 * @param params
 * @param options
 */
export function createRequestConfig(
  url: string,
  method: string,
  params?: any,
  options: AxiosRequestConfig = {}
) {
  const requestConfig = merge(
    {
      url,
      method
    },
    options
  );
  if (method === 'post' || method === 'put') {
    if (params) {
      //@ts-ignore
      if (requestConfig.headers) {
        if (requestConfig.headers['Content-Type'] == 'application/json') {
          requestConfig.data = JSON.stringify(params);
        } else {
          requestConfig.data = params;
        }
      } else {
        requestConfig.data = JSON.stringify(params);
      }
    }
  } else {
    if (params) {
      requestConfig.params = params;
    }
  }
  return requestConfig;
}

/**
 * 通用请求网关接口，没有对参数中url做任何处理
 * @param url
 * @param method
 * @param params
 * @param options
 */
export async function requestCommon<T>(
  url: string,
  method: string,
  params?: any,
  options: AxiosRequestConfig = {}
) {
  const requestConfig = createRequestConfig(url, method, params, options);
  return axiosInstance.request(requestConfig) as HTTPResponse<T>;
}

/**
 * 请求sso接口
 * @param url
 * @param method
 * @param params
 * @param options
 */
export function requestSSO<T>(
  url: string,
  method: string,
  params?: any,
  options: AxiosRequestConfig = {}
) {
  const requestURL = `/ecpp/sso/${trimStart(url, '/')}`;
  return requestCommon<T>(requestURL, method, params, options);
}

/**
 * 请求ecpp-auth接口
 * @param url
 * @param method
 * @param params
 * @param options
 * @returns
 */
export function requestECPPAuth<T>(
  url: string,
  method: string,
  params?: any,
  options: AxiosRequestConfig = {}
) {
  const requestURL = `/ecpp/ecpp-auth-v3/${trimStart(url, '/')}`;
  return requestCommon<T>(requestURL, method, params, options);
}

export { axios };
