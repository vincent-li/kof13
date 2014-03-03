## Assets compiler for CompoundJS [<img src="https://secure.travis-ci.org/compoundjs/assets-compiler.png" />](http://travis-ci.org/#!/compoundjs/assets-compiler)

This package adds middleware for assets compilation. Supported asset types:

- less
- stylus
- sass
- coffee-script

## Installation

Step 1. install using npm:

    npm install co-assets-compiler --save

Step 2. add `co-assets-compiler` line to `config/autoload.js`, for example:

```javascript
module.exports = function (compound) {
    return [
        'ejs-ext',
        'jugglingdb',
        'seedjs',
        'co-assets-compiler'
    ].map(require);
};
```
