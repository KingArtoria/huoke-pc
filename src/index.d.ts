/**
 * 接口返回的数据结构
 */
interface IRes {
  code: number; // 状态码
  msg: string; // 消息
  data: any; // 数据体
}

/**
 * label-value结构
 */
interface ILV {
  label: string; // 文本
  value: number | string; // 值
}

/**
 * 用户信息
 */
interface IUser {
  /**
   * 头像
   */
  head: string;
  /**
   * 用户id
   */
  member_id: number;
  /**
   * 昵称
   */
  nick_name: string;
  token: string;
  /**
   * vip等级
   */
   maxvip: string;
   /**
    * 所在公司
    */
   company: string
}