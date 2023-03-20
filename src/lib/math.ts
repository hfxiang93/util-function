/*
 * @Descripttion:
 * @Author: xianghaifeng
 * @Date: 2023-03-17 10:10:01
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-20 16:25:02
 */
/**
 * 返回数组中最大的值
 * @param array
 * @returns
 */
export function max(array: Array<number>): number {
  return Math.max(...array);
}
/**
 * 返回数组中最小的值
 * @param array
 * @returns
 */
export function min(array: Array<number>): number {
  return Math.min(...array);
}
/**
 * 将数组按指定大小分块
 * @param array 要切分的源数组
 * @param size 切分的大小
 * @returns
 */
export function chunk<T>(array: T[], size: number): T[][] {
  let index: number = 0;
  const newArray: T[][] = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += size)));
  }
  return newArray;
}
/**
 * 有一个长度为 n 的数组，请求出该数组的前 i 个元素之和。
 * @param array 长度为 n 的数组
 * @param index 前 i 个元素
 * @return {*}
 */
export function sum(
  array: Array<number>,
  index: number = array.length
): number {
  return array.splice(0, index).reduce((x, y) => {
    return x + y;
  });
}
