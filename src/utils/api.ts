import request from './request';
import qs from 'qs';
import { AxiosPromise } from 'axios';
/* 密码登录 */
export const loginApi = (data: any): AxiosPromise<IRes> => {
  return request({
    method: 'POST',
    url: 'web_v1/login/doLogin',
    data: qs.stringify(data),
  });
};
/* 发送短信验证码 */
export const smsApi = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/Alibabasms/sms',
    data: qs.stringify(data),
  });
};
/* 手机验证码登录 */
export const loginnopassApi = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/login/loginnopass',
    data: qs.stringify(data),
  });
};
/* 忘记密码 */
export const forgetPassApi = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/login/forgetPass',
    data: qs.stringify(data),
  });
};
/* 注册用户 */
export const signApi = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/login/sign',
    data: qs.stringify(data),
  });
};
/* 查企业 */
export const apicurl = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'api/apicurl/curl',
    data: qs.stringify(data),
  });
};
/* 意见反馈 */
export const feedback = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/feedback',
    data: qs.stringify(data),
  });
};
/* 首页推荐 */
export const comprehensiveIndex = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/comprehensive/comprehensiveIndex',
    params,
  });
};
/* 详情 */
export const getObtainInfo = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/comprehensive/getObtainInfo',
    params,
  });
};
/* 查看手机号 */
export const getContactInfo = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/Comprehensive/getContactInfo',
    data: qs.stringify(data),
  });
};
/* 查询新媒体 */
export const getResponses = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/Queryrel/getResponses',
    params,
  });
};
/* 查询新媒体详情 */
export const getMediaInfo = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/Queryrel/getMediaInfo',
    params,
  });
};
/* 收藏和取消收藏 */
export const sidesKeep = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/keep/sidesKeep',
    data: qs.stringify(data),
  });
};
/* 网站列表 */
export const webList = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/Queryrel/webList',
    params,
  });
};
/* 网站详情查询 */
export const getWebInfo = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/Queryrel/getWebInfo',
    params,
  });
};
/* 域名列表 */
export const domainList = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/Queryrel/domainList',
    params,
  });
};
/* 域名查询详情 */
export const getDomainInfo = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/Queryrel/getDomainInfo',
    params,
  });
};
/* 账号信息 */
export const getMemberInfo = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/member/getMemberInfo',
    params,
  });
};
/* 好友列表 */
export const getFriendList = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/Friend/getFriendList',
    data: qs.stringify(data),
  });
};
/* 检测用户是不是好友 */
export const getFriendRelation = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/Friend/getFriendRelation',
    data: qs.stringify(data),
  });
};
/* 发送消息检测敏感词 */
export const messageVerify = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/Friend/messageVerify',
    data: qs.stringify(data),
  });
};
/* 删除好友 */
export const putDelFriend = (params: any): AxiosPromise<any> => {
  return request({
    method: 'GET',
    url: 'web_v1/Friend/putDelFriend',
    params,
  });
};