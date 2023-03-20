/*
 * @Descripttion:
 * @Author: xianghaifeng
 * @Date: 2023-03-20 15:50:43
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-20 17:06:45
 */
interface ListItem {
  id: number;
  pid: number;
  name: string;
  code: string;
}
interface TreeItem extends ListItem {
  children: Array<TreeItem>;
}
interface TreeMap {
  [key: string]: TreeItem;
}
interface WaitPushObj {
  [key: string]: Array<TreeItem>;
}
export const listToTree = (list: Array<ListItem> = []): Array<TreeItem> => {
  const tree: Array<TreeItem> = [];
  const map: TreeMap = {};
  const waitPushObj: WaitPushObj = {};
  list.forEach((item: ListItem) => {
    const newItem: TreeItem = {
      id: item.id,
      pid: item.pid,
      name: item.name,
      code: item.code,
      children: [],
    };

    map[item.id] = newItem;
    // 判断是否是根节点
    if (item.pid === -1) {
      tree.push(newItem);
    } else if (map[item.pid]) {
      map[item.pid].children.push(newItem);
    } else {
      if (!waitPushObj[item.pid]) {
        waitPushObj[item.pid] = [];
      }
      waitPushObj[item.pid].push(newItem);
    }

    // 判断暂存区是否有自己的子节点
    if (waitPushObj[item.id]) {
      newItem.children = waitPushObj[item.id];
      delete waitPushObj[item.id];
    }

    // 可以不加这个判断
    if (!map[item.id]) {
      map[item.id] = newItem;
    }
  });
  return tree;
};
