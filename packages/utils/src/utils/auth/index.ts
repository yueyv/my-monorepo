/**
 * 用户权限相关
 */
import { requestSG, requestSG2 } from '../sg';
import queryString from 'query-string';

async function getFunctionRoute(functionId: string) {
  const resp = await requestSG('WRP-Runtime-GetFunctionRoute', {
    functionId,
  });
  return resp;
}

async function validUserMenuByUrl(params: { MId: string; Url: string }) {
  const resp = await requestSG('SYSSrv-ValidUserMenuByUrl', {
    param: JSON.stringify(params),
  });
  return resp;
}

/**
 * 获取当前页面的菜单id
 * @returns
 */
function getMId(url?: string) {
  let query: any;
  if (url) {
    query = queryString.parse(url);
  }
  const mid = query.mid;
  return mid;
}

/**
 * 校验当前用户的菜单权限
 */
export async function validateUserMenu(url?: string) {
  const mid = getMId(url);
  if (!mid) {
    return false;
  }
  const { data } = await getFunctionRoute(mid);
  const { NavigateURL, FunctionID } = data;
  console.log(NavigateURL, FunctionID);
  const { data: validateCode } = await validUserMenuByUrl({
    MId: FunctionID,
    Url: NavigateURL,
  });
  console.log(validateCode);
  if (validateCode === 2) {
    return true;
  }
  return false;
}

/**
 * 获取当前登录用户信息
 */
export async function getCurrentUser(): Promise<{
  Account: string;
  CompanyId: string;
  CompanyName: string;
  CustomerID: string;
  DepartmentId: string;
  DepartmentName: string;
  EMail: string;
  Mobile: string;
  UserId: string;
  UserName: string;
  WorkGroupId: string;
  WorkGroupName: string;
}> {
  if (!window.currentUser) {
    const resp = await requestSG('WRPFrame-GetCurrentUser');
    const info = resp.CurUserForWebUI;
    window.currentUser = info;
    return info;
  } else {
    return window.currentUser;
  }
}

export async function getCurrentUser2(): Promise<{
  Account: string;
  CompanyId: string;
  CompanyName: string;
  CustomerID: string;
  DepartmentId: string;
  DepartmentName: string;
  EMail: string;
  Mobile: string;
  UserId: string;
  UserName: string;
  WorkGroupId: string;
  WorkGroupName: string;
}> {
  if (!window.currentUser) {
    const resp = await requestSG2('WRPFrame-GetCurrentUser');
    const info = resp.CurUserForWebUI;
    window.currentUser = info;
    return info;
  } else {
    return window.currentUser;
  }
}
