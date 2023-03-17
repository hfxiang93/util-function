/*
 * @Descripttion: storage封装
 * @Author: xianghaifeng
 * @Date: 2023-03-15 13:39:36
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-17 10:08:22
 */
import { StorageClass, Key, Result, Data } from "../type/index";
import { Dictoraries } from "../enum/index";
export class Storage implements StorageClass {
  /**
   * 设置
   * @param key
   * @param value
   * @param expire
   */
  public set<T>(key: Key, value: T, expire: Dictoraries.expire) {
    const data = {
      value,
      [Dictoraries.expire]: expire,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }
  /**
   * 获取
   * @param key
   * @returns
   */
  public get<T = any>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key);
    if (value) {
      // 判断值有没有过期，没过期直接返回，过期了就不返回，并且删除对应的值
      const obj: Data<T> = JSON.parse(value);
      const now = new Date().getTime();
      if (
        typeof obj[Dictoraries.expire] === "number" &&
        obj[Dictoraries.expire] < now
      ) {
        this.delete(key);
        return {
          message: `您的${key}已过期`,
          value: null,
        };
      } else {
        return {
          message: "获取成功",
          value: obj.value,
        };
      }
    } else {
      return {
        message: "key值无效",
        value: null,
      };
    }
  }
  /**
   * 删除某一个
   * @param key
   */
  public delete(key: Key) {
    localStorage.removeItem(key);
  }
  /**
   * 清空
   */
  public clear() {
    localStorage.clear();
  }
}
