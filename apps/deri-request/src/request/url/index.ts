import { parseDomain } from 'parse-domain';
import { SSO_DOMAIN } from '../../constants';

export function parsePathname() {
  const pathname = location.pathname;
  const names = pathname.split('/').filter((v) => v !== '');
  return names[0];
}

/**
 * 获取当前环境的域名
 */
export function getDomain() {
  const hostname = location.hostname;
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    return void 0;
  }
  // 子域名
  // @ts-ignore
  const { subDomains } = parseDomain(hostname);
  if (!subDomains) {
    return void 0;
  }
  let domain;
  if (subDomains.length > 0) {
    domain = hostname.replace(subDomains.join('.') + '.', '');
  } else {
    domain = hostname;
  }
  return domain;
}

/**
 *  写入cookie时的域名
 */
export function getCookieDomain() {
  if (isEnergyCloud()) {
    const domains = location.hostname.split('.');
    domains.shift();
    return domains.join('.');
  } else {
    return;
  }
}

export const COOKIE_DOMAIN = getCookieDomain();

/**
 * 开发、测试、生产环境
 * @returns
 */
export function isEnergyCloud() {
  return location.hostname.endsWith(SSO_DOMAIN);
}

/**
 * 获取应用地址
 * @param domain
 * @returns
 */
export function getAppHost(name: string) {
  if (isEnergyCloud()) {
    const domains = location.hostname.split('.');
    domains[0] = name;
    return `${location.protocol}//${domains.join('.')}`;
  } else {
    return `/${name}`;
  }
}

// 登录页地址
export function getAuthHost() {
  return getAppHost('auth');
}

/**
 * 接口地址
 * @returns
 */
export function getAPIHost() {
  return getAppHost('api');
}

/**
 * 本地调试环境
 * @returns
 */
export function isLocal() {
  const domains = location.hostname.split('.');
  return domains[0] === 'local';
}
