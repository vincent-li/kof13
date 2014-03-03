Test coverage tool. It generates html [report like that](http://1602.ws/railwayjs/test-coverage)

## Installation

    npm install semicov

## It works only...

...only if your code has semicolons. And it will break badly-written javascript:

```javascript
if (condition) doSomething();
else doSomethingElse();
```

So, basically it should work very well for any code passed following [jslint](http://www.jslint.com) validations:

- [semicolons](http://www.jslint.com/lint.html#semicolon)
- [required blocks](http://www.jslint.com/lint.html#required)

## Usage

Put following line before very first line of your code

    var semicov = require('semicov');
    semicov.init('lib', 'My Awesome Lib Name'); // First argument 'lib' is name of dir with code
    process.on('exit', semicov.report);

And it will generate `./coverage/index.html` for you.

## MIT License

```
Copyright (C) 2013 by Anatoliy Chakkaev <mail [åt] anatoliy [døt] in>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
