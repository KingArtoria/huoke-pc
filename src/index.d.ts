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