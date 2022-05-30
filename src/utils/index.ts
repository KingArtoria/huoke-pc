/* 工具类 */

/**
 * 根据数值从数组里招到对应的文本名称
 * @param value 数值
 * @param arr 文本与数值映射的数组 
 * @returns 数值对应的文本
 */
export const matchLabel = (value: number, arr: ILV[]) => {
  const item = arr.find((val: ILV) => val.value == value)
  return item ? item.label : value
}