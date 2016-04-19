var BattleOrder = cc.Layer.extend({
    init : function(){
        var bRet = false;
        if (this._super()) {
            //添加背景
            var backS = cc.Sprite.create(uiIamges['s_bg2']);
            backS.setScaleX(0.8);
            backS.setScaleY(0.76);
            backS.setAnchorPoint(cc.p(0, 0));
            this.addChild(backS, -10, 1);
            
            bRet = true;
        }
        return bRet;
    }
});

BattleOrder.create = function () {
    var sg = new BattleOrder();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

BattleOrder.scene = function () {
    var scene = cc.Scene.create();
    var layer = BattleOrder.create();
    scene.addChild(layer);
    return scene;
};