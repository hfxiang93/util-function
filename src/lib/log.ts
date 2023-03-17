/*
 * @Descripttion:
 * @Author: xianghaifeng
 * @Date: 2023-03-17 10:31:27
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-17 14:22:32
 */
import { LogType } from "../enum/index";
interface Log {
  capsule: (title: string, info: string, type: LogType.default) => void;
  colorful: (textArr: Array<TextItem>) => void;
  default: (text: string) => void;
  primary: (text: string) => void;
  warning: (text: string) => void;
  danger: (text: string) => void;
}
interface TextItem {
  text: string;
  type?: LogType;
}

export class Logger implements Log {
  /**
   * @description 打印一个 [ title | text ] 样式的信息
   * @param {String} title title text
   * @param {String} info info text
   * @param {String} type style
   */
  capsule(title: string, info: string, type: LogType = LogType.primary) {
    console.info(
      `%c ${title} %c ${info} %c`,
      "background:#35495E; padding: 3px 6px; border-radius: 3px 0 0 3px; color: #fff;",
      `background:${typeColor(
        type
      )}; padding: 3px 6px; border-radius: 0 3px 3px 0;  color: #fff;`,
      "background:transparent"
    );
  }
  /**
   * @description 打印彩色文字
   */
  colorful(textArr: Array<TextItem>) {
    console.info(
      `%c${textArr.map((t: TextItem) => t.text || "").join("%c")}`,
      ...textArr.map((t: TextItem) => `color: ${typeColor(t.type)};`)
    );
  }

  /**
   * @description 打印 default 样式的文字
   */
  default(text: string) {
    this.colorful([{ text }]);
  }

  /**
   * @description 打印 primary 样式的文字
   */
  primary(text: string) {
    this.colorful([{ text, type: LogType.primary }]);
  }

  /**
   * @description 打印 success 样式的文字
   */
  success(text: string) {
    this.colorful([{ text, type: LogType.success }]);
  }

  /**
   * @description 打印 warning 样式的文字
   */
  warning(text: string) {
    this.colorful([{ text, type: LogType.warning }]);
  }

  /**
   * @description 打印 danger 样式的文字
   */
  danger(text: string) {
    this.colorful([{ text, type: LogType.danger }]);
  }
}
/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
function typeColor(type: LogType = LogType.default) {
  let color = "";
  switch (type) {
    case LogType.default:
      color = "#35495E";
      break;
    case LogType.primary:
      color = "#3488ff";
      break;
    case LogType.success:
      color = "#43B883";
      break;
    case LogType.warning:
      color = "#e6a23c";
      break;
    case LogType.danger:
      color = "#f56c6c";
      break;
    default:
      break;
  }
  return color;
}
