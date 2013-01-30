var ATHENA= cc.Sprite.extend({
    id   : 'ATHENA',
    fullname : 'Athena Asamiya',
    name : '麻宫雅典娜',
    des  : '一个日本女学生的，雅典娜与Kensou以正义的名义参战。被认为是“英雄之光”(从Shiguma手中拯救了世界)之一的转世。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':150,'h':213,'p':cc.p(-145,-10),'fc':30},
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
        this.backpose.setPosition(-375,-135);
    }
});
ATHENA.create = function(){
    var sg = new ATHENA();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
