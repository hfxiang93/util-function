/*
 * @Descripttion:
 * @Author: xianghaifeng
 * @Date: 2023-03-10 10:14:37
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-17 14:59:21
 */
import { Dispatch, List } from "../type/index";
// 发布订阅
export class DispatchEvent implements Dispatch {
  list: List;
  constructor() {
    // 用于存放注册的事件 key: function[]
    this.list = {};
  }
  on(event: string, callback: Function) {
    // 查询当前有没有注册过这个事件，有就返回，没有就给个空数组
    const callbackList = this.list[event] || [];
    // 把对应的回调添加到对应的事件中
    callbackList.push(callback);
    // 重新赋值list
    this.list[event] = callbackList;
  }
  once(event: string, fn: Function) {
    let decor = (...args: Array<any>) => {
      fn.apply(this, args);
      this.off(event, decor);
    };
    this.on(event, decor);
  }
  emit(event: string, ...args: Array<any>) {
    // 获取事件
    const callbackList = this.list[event] || [];
    // 如果有，则传入参数遍历执行
    if (callbackList) {
      callbackList.forEach((item) => {
        item.apply(this, args);
      });
    }
  }
  off(event: string, fn: Function) {
    // 查询事件名称
    const eventName = this.list[event];
    if (eventName && fn) {
      let index = eventName.findIndex((item) => item === fn);
      eventName.splice(index, 1);
    } else {
      console.log(`${event}事件未监听`);
    }
  }
}
