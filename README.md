KOF13

KOF(拳皇)系列对于很多朋友都很熟悉，最经典的97，是很多游戏人的回忆。我根据自己组合的框架warlock--一个使用nodejs搭建的websocket服务器。想让很多朋友可以在线体验kof13的打斗效果。主要目的还是分享web游戏技术。此版本游戏只做内部分享，不用盈利目的。本着开源的原则，在此分享源代码，希望有条件的朋友可以自己跑下这个程序，搭建自己的server。如有疑问，请致电vincent.liwq@gmail.com.

**Note:** 运行此程序需要nodejs环境和mongodb数据库。如果nodejs安装有疑问的朋友，请参考[http://nodejs.org/],对于mongodb安装使用有问题的朋友请参考[http://www.mongodb.org/]。

## Install
```sh
  $ git clone git://github.com/vincent-li/kof13
  $ node server.js
```

**NOTE:** your config files is in folder `config/..`

Then visit [http://localhost:3000/](http://localhost:3000/)

## Directory structure
```
-app/
  |__actions/
  |__models/
  |__controllers/
-config/
  |__routes.js
  |__environment.js
  |__database.json
  |__environments/
-db/
  |__schema.js
-log/
-webapp/
  |__app/
  |__gmres/
  |__css/
  |__images/
  |__libs/
  |__index.html
  |__index.js
  |__gamehall.html
  |__gamehall.js
  |__game.html
  |__main.js
-server.js
```

在使用过程如果大家有什么好的建议或者bug，请发到我的邮箱，我们会尽快完善，多谢 :)

---

## MIT License

Copyright (c) 2012 bashao < [vincent.liwq@gmail.com](mailto:vincent.liwq@gmail.com) >

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
