/****************************************************************************
 http://www.cocos2d-x.org


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
 ****************************************************************************/

var cocos2dApp = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5').c,
    ctor:function (scene) {
        this._super();
        this.scene = scene;
        cc.COCOS2D_DEBUG = this.config.COCOS2D_DEBUG;
        //cc.IS_SHOW_DEBUG_ON_PAGE = true;
        cc.setup(this.config.tag);
        //cc.AudioEngine.getInstance().init("mp3,ogg");
        cc.Loader.getInstance().onloading = function () {
            cc.LoaderScene.getInstance().draw();
        };
        cc.Loader.getInstance().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };
        cc.Loader.getInstance().preload(g_ressources);
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

        // turn on display FPS
        director.setDisplayStats(this.config.showFPS);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config.frameRate);

        // run
        this._scene = new this.scene();
        director.runWithScene(this._scene);

        return true;
    },
    changeScene : function(scene){
        var _layers = this._scene._children;
        
        this._scene = new scene();
        // initialize director
        var director = cc.Director.getInstance();
         // run
        director.replaceScene(this._scene);

        return true;
    }
});
//
var myApp = new cocos2dApp(SelectRole.scene);
//var myApp = new cocos2dApp(ManFight.scene);

//坐标位置
/*
*        0,1     0.5,1      1,1    
*          \ ______|_______ /
*           *      *       *
*           |              |
*           |   0.5,0.5    |
*     0,0.5 *      *       *  1,0.5
*           |              |
*           |              |
*           *______*_______*
*          /       |        \
*        0,0     0.5,0      1,0
*    y
*    |__x
*/

var AnchorPointTopLeft = new cc.Point(0, 1);
var AnchorPointTop = new cc.Point(0.5, 1);
var AnchorPointTopRight = new cc.Point(1, 1);
var AnchorPointLeft = new cc.Point(0, 0.5);
var AnchorPointCenter = new cc.Point(0.5, 0.5);
var AnchorPointRight = new cc.Point(1, 0.5);
var AnchorPointBottomLeft = new cc.Point(0, 0);
var AnchorPointBottom = new cc.Point(0.5, 0);
var AnchorPointBottomRight = new cc.Point(1, 0);