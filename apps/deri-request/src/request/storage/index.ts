import Cookies from 'js-cookie';
import { LANGUAGE_COOKIE, RT_COOKIE, TOKEN_COOKIE, USER_INFO_COOKIE } from '../../constants';
import dayjs from 'dayjs';
import { COOKIE_DOMAIN } from '../url';

window.Cookies = Cookies;

/**
 *
 * 为兼容原能量云程序，getCookie为读取页面cookie数据
 * 新增getCookieAsync方法将云端和APP公共库统一，内部统一使用async方法获取数据
 *
 */
function getExpireKey(name: string) {
  return `${name}_EXPIRE`;
}

/**
 * 获取Cookie
 * @param name
 * @returns
 */
export function getCookie(name: string) {
  return Cookies.get(name) || '';
}

// cookie操作，为兼容APP统一使用异步方法
/**
 * 获取cookie
 * @param name
 * @returns
 */
export async function getCookieAsync(name: string) {
  if (window.isCapacitor) {
    // 检查cookie是否过期
    const expireKey = getExpireKey(name);
    let expireTime: number;
    const { value } = await window.CapacitorPreferences.get({ key: expireKey });
    if (value) {
      expireTime = parseInt(value);
      // cookie过期
      if (Date.now() >= expireTime) {
        await window.CapacitorPreferences.remove({ key: name });
        await window.CapacitorPreferences.remove({ key: expireKey });
        return null;
      } else {
        const { value } = await window.CapacitorPreferences.get({ key: name });
        return value;
      }
    } else {
      const { value } = await window.CapacitorPreferences.get({ key: name });
      return value;
    }
  } else {
    return getCookie(name);
  }
}

/**
 * 设置cookie
 * @param name
 * @param value
 * @param options
 */
export function setCookie(name: string, value: string, options: Cookies.CookieAttributes = {}) {
  Cookies.set(name, value, options);
}

/**
 * 设置cookie
 * @param name
 * @param value
 * @param options
 */
export async function setCookieAsync(
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {}
) {
  if (window.isCapacitor) {
    // 设置过期时间
    if (options.expires) {
      const expireKey = getExpireKey(name);
      const expires = dayjs(options.expires).valueOf().toString();
      await window.CapacitorPreferences.set({ key: expireKey, value: expires });
    }
    await window.CapacitorPreferences.set({ key: name, value });
  } else {
    setCookie(name, value, options);
  }
}

/**
 * 删除Cookie
 * @param name
 * @param options
 */
export function removeCookie(name: string, options: Cookies.CookieAttributes = {}) {
  Cookies.remove(name, options);
}

/**
 * 删除Cookie
 * @param name
 * @param options
 */
export async function removeCookieAsync(name: string, options: Cookies.CookieAttributes = {}) {
  if (window.isCapacitor) {
    const expireKey = getExpireKey(name);
    await window.CapacitorPreferences.remove({ key: expireKey });
    await window.CapacitorPreferences.remove({ key: name });
  } else {
    removeCookie(name, options);
  }
}

/**
 * 获取sessionStorage
 * @param name
 * @returns
 */
export function getStorage(name: string) {
  return sessionStorage.getItem(name);
}

/**
 * 获取sessionStorage、异步兼容APP
 * @param name
 * @returns
 */
export async function getStorageAsync(name: string) {
  if (window.isCapacitor) {
    const value = await getCookieAsync(name);
    return value;
  } else if (window.isApp) {
    return localStorage.getItem(name);
  } else {
    return getStorage(name);
  }
}

/**
 * 设置sessionStorage
 * @param name
 * @param value
 */
export function setStorage(name: string, value: string) {
  sessionStorage.setItem(name, value);
}

/**
 * 设置sessionStorage、异步兼容APP
 * @param name
 * @param value
 */
export async function setStorageAsync(name: string, value: string) {
  if (window.isCapacitor) {
    await setCookieAsync(name, value);
  } else if (window.isApp) {
    localStorage.setItem(name, value);
  } else {
    setStorage(name, value);
  }
}

/**
 * 删除sessionStorage，异步兼容APP
 * @param name
 */
export function removeStorage(name: string) {
  sessionStorage.removeItem(name);
}

/**
 * 删除sessionStorage
 * @param name
 */
export async function removeStorageAsync(name: string) {
  if (window.isCapacitor) {
    await removeCookieAsync(name);
  } else if (window.isApp) {
    localStorage.removeItem(name);
  } else {
    removeStorage(name);
  }
}

/**
 * 清空登录信息
 */
export async function clearAllCookie(options: Cookies.CookieAttributes = {}) {
  const cookieOptions = Object.assign(options, {
    domain: COOKIE_DOMAIN,
  });
  await removeCookieAsync(TOKEN_COOKIE, cookieOptions);
  await removeCookieAsync(RT_COOKIE, cookieOptions);
  await removeCookieAsync(USER_INFO_COOKIE, cookieOptions);
}

/**
 * 获取当前语言
 */
export function getLanguage() {
  return getCookie(LANGUAGE_COOKIE) || navigator.language;
}

/**
 * 获取当前语言
 */
export async function getLanguageAync() {
  const language = await getCookieAsync(LANGUAGE_COOKIE);
  return language || navigator.language;
}
