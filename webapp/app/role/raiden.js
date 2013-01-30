var RAIDEN= cc.Sprite.extend({
    id   : 'RAIDEN',
    fullname : 'Raiden',
    name : '莱丁',
    des  : '和HWA一样都是吉斯的爪牙，脾气暴躁!',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':225,'h':261,'p':cc.p(-145,-10),'fc':10},
    fightparam : {'stance' : cc.p(-230,-230)},
    body : {},
    init : function(){
        var flag = false;
        if(this._super){
            this.initBackPose();
            flag = true;
        }
        return flag;
    },
    initBackPose : function(){
        this.backpose = cc.Sprite.create(backposes[this.id.toLowerCase()]);
        this.backpose.setScale(0.8);
        this.backpose.setPosition(-385,-105);
    }
});
RAIDEN.create = function(){
    var sg = new RAIDEN();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
