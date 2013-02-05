This is a real game engine solutions. you can use the base cammand to create a websocket server. and your browser can connect to the server. and the demo is a real time talk room.

**Note:** You need to have node.js and mongodb installed and running

## Install
```sh
  $ git clone git://github.com/vincent-li/warlock
  $ npm install
  $ wl/warlock -i/init
  $ wl server 4000
```

**NOTE:** your config files is in folder `config/..`

Then visit [http://localhost:4000/](http://localhost:4000/)

## Directory structure
```
-app/
  |__actions/
  |__models/
  |__controllers/
-config/
  |__routes.js
  |__config.js
  |__passport.js (auth config)
```

If you are looking for a specific feature, please use the issue tracker. I will try to come
up with a demo as earliest as I can. Please feel free to fork and send updates :)

---

## MIT License

Copyright (c) 2012 bashao < [vincent.liwq@gmail.com](mailto:vincent.liwq@gmail.com) >

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
