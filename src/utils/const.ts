/* 常量 */
export const TOKEN = "token_v2"
// 用户信息
export const USER = "user_v2"
// 合作种类
export const COOPERATION_TYPES = [
  { label: '供应', value: 1 },
  { label: '需求', value: 2 },
  { label: '优质资源', value: 3 },
  { label: '销售渠道', value: 4 },
  { label: '资源互换', value: 5 },
  { label: '流量互换', value: 6 },
  { label: '招商加盟', value: 7 },
  { label: '线下广告', value: 8 },
  { label: '线下场地', value: 9 },
  { label: '免费福利', value: 10 },
  { label: '海外项目', value: 11 },
]
/**
 * 商品种类
 */
export const GOOD_TYPE = {
  /**
   * 会员
   */
  HY: 'HY',
  /**
   * 道具卡
   */
  DJK: 'DJK',
}

/**
 * 静态资源域名
 */
export const DOMAIN = 'http://39.106.208.234'

/**
 * API域名
 */
export const API_DOMAIN = 'http://nad.bdhuoke.com/'

/**
 * 头像图片域名
 */
export const HEAD_DOMAIN = 'https://admin.bdhuoke.com/'

/**
 * 会员等级
 */
export const VIP_LEVEL = {
  /**
   * 普通用户
   */
  ORDINARY: 'ordinary',
  /**
   * 普通会员
   */
  VIP: 'vip',
  /**
   * 超级会员
   */
  SVIP: 'svip',
  /**
   * 企业会员
   */
  FVIP: 'fvip',
  /**
   * 黑卡会员
   */
  BVIP: 'bvip',
}

/**
 * 发布/订阅事件名称
 */
export const EVENT = {
  /**
   * 好友请求
   */
  FRIEND_REQUEST: 'friend_request',
  /**
   * 会话更新
   */
   CONVERSATIONS_UPDATED: 'CONVERSATIONS_UPDATED',
}