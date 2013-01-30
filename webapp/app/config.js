var KOF = KOF || {};

(function () {
    var d = document;
    var c = {
        menuType : 'canvas', //whether to use canvas mode menu or dom menu
        COCOS2D_DEBUG : 2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        showFPS : false,
        frameRate : 60,
        tag : 'gameCanvas', //the dom element to run cocos2d on
        engineDir : '../libs/cocos2d/',
        loadExtension : true,
        //SingleEngineFile:'',
        appFiles:[
            'app/resource.js',
            'app/utils/idcards.js', 
            'app/utils/movement.js',
            'app/utils/gladiator.js',
            'app/utils/gladiator2.js',
            'app/scene/selectyourman.js',
            'app/scene/battleorder.js',
            'app/scene/fight.js'
        ]
    };
    d.ccConfig = c;
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

        //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        s.c = c;
        s.id = 'cocos2d-html5';
        d.body.appendChild(s);
    });
})();