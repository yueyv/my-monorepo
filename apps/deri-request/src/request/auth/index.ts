import {
  TOKEN_REFRESH_INTERVAL,
  RT_COOKIE,
  TOKEN_COOKIE,
  USER_INFO_COOKIE,
  TOKEN_EXPIRES,
} from '../../constants';
import { decrypt, encrypt } from '../crypto';
import { requestSSO, type ResponseData, type HTTPResponse } from '../http';
import { getAuthHost, COOKIE_DOMAIN } from '../url';
import {
  clearAllCookie,
  getCookie,
  getCookieAsync,
  setCookie,
  setCookieAsync,
} from '../storage';

export interface UserInfo {
  alias: string;
  avatar: string;
  clients: number;
  createBy: null;
  createTime: string;
  deviceVerify: number;
  forceVerify: number;
  locationVerify: number;
  openId: string;
  smsCount: number;
  updateSelfInfo: number;
  updateTime: string;
  userEmail: string;
  userId: number;
  userName: string;
  userPhone: string;
  userPwd?: null;
  userRemark: string;
  userStatus: number;
  userType: number;
  wechat?: {
    createTime: string;
    openId: string;
    wechatAvatar: string | null;
    wechatNickName: string | null;
  };
}

export interface TokenInfo {
  token: string;
  expireTime: number;
}

export interface LoginInfo extends TokenInfo {
  selfZone: number[];
  userInfo: UserInfo;
}

// 登录一般返回
export interface LoginCommonResponseData {
  expireTime: number;
  token: string;
  newDeviceId?: string | null;
  ip: string;
  newLocate?: string | null;
  deviceName: string;
}

// 登录多账号返回
export interface LoginMultiResponseData {
  contextToken: string;
  mutiAccountDOS: {
    userId: number;
    parentId: number | null;
    userName: string;
    alias: string;
    lastLoginTime: string;
    loginCode: string;
  }[];
}

export interface ChildAccountInfo {
  userId: number;
  parentId: number | null;
  userName: string;
  alias: string;
  lastLoginTime: string;
  loginCode: string;
}

/**
 * 查用户信息
 * @returns
 */
function querySelfInfo(): HTTPResponse<UserInfo> {
  return requestSSO('/common/user/getSelfInfo', 'get');
}

/**
 * 存储用户信息
 * @param userInfo
 */
export async function storeUserInfo(userInfo?: UserInfo) {
  try {
    if (!userInfo) {
      const { data } = await querySelfInfo();
      userInfo = data;
    }
  } catch (e) {}
  // 用户信息加密存储
  const currentDate = Date.now();
  const expireMillisecond = currentDate + 1e3 * 86400 * 365;
  const expireDate = new Date(expireMillisecond);
  setCookie(USER_INFO_COOKIE, encrypt(JSON.stringify(userInfo)), {
    expires: expireDate,
    domain: COOKIE_DOMAIN,
  });
  return userInfo;
}

/**
 * 获取用户账号信息
 * @returns
 */
export function getUserInfo() {
  const userInfoStr = getCookie(USER_INFO_COOKIE);
  if (userInfoStr) {
    const userInfo = decrypt(userInfoStr);
    return JSON.parse(userInfo);
  } else {
    return null;
  }
}

export async function getUserInfoAsync() {
  const userInfoStr = await getCookieAsync(USER_INFO_COOKIE);
  if (userInfoStr) {
    const userInfo = decrypt(userInfoStr);
    return JSON.parse(userInfo);
  } else {
    return null;
  }
}

/**
 * 登录后存储登录信息
 * @param info
 */
export async function storeLoginState(info: LoginCommonResponseData) {
  const { token, expireTime } = info;
  // tokne过期时间
  const tokenExpires = expireTime * 1e3;
  const currentDate = Date.now();
  const expireMillisecond = currentDate + tokenExpires;
  const expireDate = new Date(expireMillisecond);
  await setCookieAsync(TOKEN_COOKIE, token, {
    expires: expireDate,
    domain: COOKIE_DOMAIN,
  });
  // token刷新时间
  await setCookieAsync(RT_COOKIE, currentDate.toString(), {
    expires: new Date('9999-01-01'),
    domain: COOKIE_DOMAIN,
  });
}

/**
 * 更新token
 */
export async function getToken() {
  const token = await getCookieAsync(TOKEN_COOKIE);
  const resp = (await requestSSO('/auth/update/token', 'get', {
    token: token,
  })) as ResponseData<LoginCommonResponseData>;
  await storeLoginState(resp.data);
}

/**
 * 刷新token
 * @param {string} token
 */
export async function refreshToken() {
  const currentTime = Date.now();
  const rt = (await getCookieAsync(RT_COOKIE)) || '0';
  const lastRefreshTime = parseInt(rt);
  // 距过期时间不足2min时更新token
  const timeDiff = TOKEN_EXPIRES - 2 * 60 * 1e3;
  if (currentTime - lastRefreshTime >= timeDiff) {
    try {
      await getToken();
    } catch (e) {
      await getToken();
    }
  }
}

/**
 * 定时刷新token
 */
function refreshTokenInterval() {
  if (!window.tokenIntervalID) {
    window.tokenIntervalID = setInterval(async () => {
      const token = await getCookieAsync(TOKEN_COOKIE);
      if (!token) {
        clearInterval(window.tokenIntervalID);
        return;
      }
      refreshToken();
    }, TOKEN_REFRESH_INTERVAL);
  }
}

/**
 * 账号密码登录
 * @param params
 * @param deviceId
 */
export async function loginWebSystem(
  params: {
    userName: string;
    userPwd: string;
    captchaId?: string;
    verifyId?: string;
    keepLogin?: boolean;
  },
  deviceId?: string,
): HTTPResponse<LoginCommonResponseData | LoginMultiResponseData> {
  // 登录
  return requestSSO('/noIntercept/login', 'post', params, {
    headers: {
      deviceId: deviceId,
    },
  });
}

/**
 * 手机号验证码登录
 * @param phone
 * @param code
 */
export async function loginSystemByPhone(
  params: {
    account: string;
    verifyCode: string;
    keepLogin?: boolean;
  },
  deviceId?: string,
): HTTPResponse<LoginCommonResponseData | LoginMultiResponseData> {
  return requestSSO('/noIntercept/verifySmsCodeLogin', 'post', params, {
    headers: {
      deviceId: deviceId,
    },
  });
}

/**
 * 邮箱验证码登录
 * @param phone
 * @param code
 */
export function loginSystemByMail(
  params: {
    account: string;
    verifyCode: string;
    keepLogin?: boolean;
  },
  deviceId?: string,
): HTTPResponse<LoginCommonResponseData | LoginMultiResponseData> {
  return requestSSO('/noIntercept/verifyEmailCodeLogin', 'post', params, {
    headers: {
      deviceId: deviceId,
    },
  });
}

/**
 * 子账号选择登录
 * @param params
 * @returns
 */
export function loginByChildAccount(
  params: {
    contextToken: string;
    loginCode: string;
    keepLogin?: boolean;
  },
  deviceId?: string,
): HTTPResponse<LoginCommonResponseData | LoginMultiResponseData> {
  return requestSSO('/noIntercept/mutiAccountLogin', 'post', params, {
    headers: {
      deviceId: deviceId,
    },
  });
}

/**
 * 信任环境
 * @param params
 * @returns
 */
export function trustEnv(
  params: {
    newLocate: string | null;
    newDeviceId: string | null;
    ip: string;
    deviceName: string | null;
  },
  deviceId?: string,
) {
  return requestSSO('/common/safe/trustEnv', 'post', params, {
    headers: {
      deviceId: deviceId,
    },
  });
}

/**
 * 返回到登录页
 * @param redirect
 * @param clearCookie
 */
export async function backToLogin(redirect = true, clearCookie = true) {
  if (clearCookie) {
    await clearAllCookie({
      domain: COOKIE_DOMAIN,
    });
  }
  const uri = encodeURIComponent(location.href);
  setTimeout(() => {
    //判断是否是app
    if (window.isApp) {
      window.router.replace({
        name: 'Login',
      });
    } else {
      const authHost = getAuthHost();
      if (redirect) {
        location.href = `${authHost}?redirect_uri=${uri}`;
      } else {
        location.href = authHost;
      }
    }
  });
}

async function systemInit() {
  // 免登录访问页面
  const userInfo = await getCookieAsync(USER_INFO_COOKIE);
  if (!userInfo) {
    await storeUserInfo();
  }
  await refreshToken();
  refreshTokenInterval();
}

//定时更新token
if (!getCookie(TOKEN_COOKIE)) {
  clearInterval(window.tokenIntervalID);
} else {
  systemInit();
}

/**
 * 登出后清除登录状态
 */
export async function logoutSystem() {
  const token = await getCookieAsync(TOKEN_COOKIE);
  await requestSSO('/common/logout', 'get', {
    token,
  });
  await backToLogin();
}
