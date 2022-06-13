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

// 获取会员记录
export const getVipOrder = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/index/getVipOrder',
  });
};
// 获取Banner
export const getBanner = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/index/getBanner',
  });
};
// 获取分类菜单
export const getMenu = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/index/getMenu',
  });
};
// 获取人脉
export const getRecommendList = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/index/getRecommendList',
  });
};
// 获取首页右侧热门数据
export const getHot = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/index/getHot',
  });
};
// 获取首页列表数据
export const getListData = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/index/index',
    data
  });
};
// 搜索
export const searchApi = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/index/search',
    data
  });
};
// 项目详情
export const projectInfoAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/comprehensive/Info',
    data
  });
};
// 项目详情-获取联系方式
export const contactInfoAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/comprehensive/GetContactInfo',
    data
  });
};
// 项目发布-获得省份
export const provinceAPI = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/area/getProvince',
  });
};
// 项目发布-获得城市
export const cityAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/area/getCity',
    data
  });
};
// 项目发布
export const saveProjectAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/Comprehensive/comprehensiveAdd',
    data
  });
};
// 项目发布-获取下拉框选项
export const typeListAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/Comprehensive/typeList',
    data
  });
};
// 个人中心-我的好友
export const getFriendListAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/Friend/getFriendList',
    data
  });
};
// 个人中心-修改手机号
export const changephoneAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/changephone',
    data
  });
};
// 个人中心-我的发布
export const memberProjectAPI = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/member_project',
  });
};
// 个人中心-获取二级行业
export const getIndustryInfoAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/getIndustryInfo',
    data
  });
};
// 个人中心-获取一级行业
export const getIndustryListAPI = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/getIndustryList',
  });
};
// 个人中心-获取学校
export const getSchoolListAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/getSchoolList',
    data
  });
};
// 个人中心-修改个人信息
export const memberInfoEditAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/memberInfoEdit',
    data
  });
};
// 个人中心-我的道具
export const userCouponsAPI = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/user_coupons',
  });
};
// 个人中心-兑换记录
export const couponsLogAPI = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/coupons_log',
  });
};
// 变色卡置顶卡使用
export const useCouponsAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/coupons/useCoupons',
    data
  });
};
// 道具卡使用 及变色卡置顶卡列表
export const useCouponsListAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/coupons/useCouponsList',
    data
  });
};
// 获取商品
export const goodslistAPI = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/order/goodslist',
    data
  });
};

// 上传文件
export const uploadFile = (data: any): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/upload',
    data
  });
};
// 个人中心
export const userInfoAPI = (): AxiosPromise<any> => {
  return request({
    method: 'POST',
    url: 'web_v1/member/index',
  });
};