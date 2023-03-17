/*
 * @Descripttion:
 * @Author: xianghaifeng
 * @Date: 2023-03-15 15:08:25
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-16 14:45:13
 */
import { Dictoraries } from "../enum/index";

export type Key = string;

export type Expire = Dictoraries.expire;

export interface StorageClass {
  set: <T>(key: Key, value: T, expire: Expire) => void;
  get: <T>(key: Key) => Result<T | null>;
  delete: (key: Key) => void;
  clear: () => void;
}

export interface Result<T> {
  message: string;
  value: T | null;
}

export interface Data<T> {
  value: T;
  [Dictoraries.expire]: Dictoraries.expire | number;
}

export interface Dispatch {
  on: (event: string, callback: Function) => void;
  once: (event: string, fn: Function) => void;
  off: (event: string, fn: Function) => void;
  emit: (event: string, agrs: Array<any>) => void;
}

export interface List {
  [key: string]: Array<Function>;
}
