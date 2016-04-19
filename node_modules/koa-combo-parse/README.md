# koa-combo-parse

一个简单的koa中间件, 用于解析combo的url.

## 安装

```javascript
npm install koa-combo-parse --save
```

## 例子

```javascript
const path = require('path');
const app = require('koa')();
const comboParse = require('koa-combo-parse');

app.use(comboParse({
    miniCSS: true,
    base: path.resolve(__dirname, './htdocs')
}));

```

## 参数说明

### miniCSS(boolean)

标识是否压缩`CSS`, 默认为`false`.

提供两种方式标识是否压缩`CSS`

> 全局设置`miniCSS`之后，会忽略`_mcss`的值. 若压缩出现异常, 则会返回未压缩的代码

1. 初始化插件的时候设置`miniCSS`为`true`, 则所有combo的css都会压缩之后输出到客户端
2. 单个combo的url中增加`_mcss`字段,设置为`true`或`y`, 则该url对应的文件压缩后输出

例: 

```javascript
// 第一种情况(两个URL中解析出的CSS, 均会做压缩处理)
http://www.ooxx.com/??a.css,b.css&_mcss=true
http://www.ooxx.com/??a.css,b.css

// 第二种情况(前两个URL解析出的CSS会做压缩处理)
http://www.ooxx.com/??a.css,b.css&_mcss=true
http://www.ooxx.com/??a.css,b.css&_mcss=y
http://www.ooxx.com/??a.css,b.css&_mcss=1
http://www.ooxx.com/??a.css,b.css
```

### base(string)

静态资源根目录(解析结果会拼接该目录和pathname作为文件所在目录)

## 解析规则

以上方demo中的配置为例

```javascript
目标URL: http://www.ooxx.com/js/lib/??a.js,b.js,c.js

path.resolve(__dirname, './htdocs') => /home/ooxx/www/htdocs

/home/ooxx/www/htdocs/js/lib/a.js
/home/ooxx/www/htdocs/js/lib/b.js
/home/ooxx/www/htdocs/js/lib/c.js
```

url中只会获取`?`开头的数据, 即`http://www.ooxx.com/js/lib/??a.js,b.js,c.js&_=12323`中`&`后的数据会被抛弃(使用过程中, 应避免在query里出现多个以`?`开头的数据)

## DEBUG

```javascript
DEBUG=koa-combo-parse
```