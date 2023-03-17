<!--
 * @Descripttion:
 * @Author: xianghaifeng
 * @Date: 2023-03-17 15:53:43
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-17 16:00:26
-->

# util-function

## example

```javascript
import { Storage, Logger, chunk } from "util-function";
const storage = new Storage();
storage.set("a", "{name:22}");
storage.get("a");

const logger = new Logger();
logger.capsule("util-funcrion", "some function");
```
