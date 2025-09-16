/**
 * TOKEN
 */
export const TOKEN_REFRESH_INTERVAL = 10 * 1e3; // token刷新周期
export const TOKEN_EXPIRES = window.isApp ? 2592000 * 1e3 : 2 * 60 * 60 * 1e3; // token过期时间
export const TOKEN_COOKIE = 'deri_sso_token';
/**
 * SSO COOKIE
 */
export const LANGUAGE_COOKIE = 'deri_sso_lang';
export const USER_INFO_COOKIE = 'deri_sso_userInfo';
export const RT_COOKIE = 'deri_sso_rt';
export const SSO_DOMAIN = '.energy.cloud';
export const SSO_TIMEOUT = 30 * 1e3;

/** 网关公共错误码  */

// token待过期
export const TOKEN_PENDING_EXPIRED = 10631;
// 无效token(没有token或者token过期)
export const TOKEN_INVALID = 10303;
// 接口需要二次验证
export const NEED_SECOND_VALID = 10302;
