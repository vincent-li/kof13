var HWA= cc.Sprite.extend({
    id   : 'HWA',
    fullname : 'Hwa Jai',
    name : '霍查',
    des  : '前吉斯的爪牙，现在和金组队,酒鬼，喝酒后能力斐然',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':146,'h':249,'p':cc.p(-155,-10),'fc':10},
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
        //this.backpose.setScale(0.8);
        this.backpose.setPosition(-365,-95);
    }
});
HWA.create = function(){
    var sg = new HWA();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
