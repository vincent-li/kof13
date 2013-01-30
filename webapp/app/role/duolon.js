var DUOLON= cc.Sprite.extend({
    id   : 'DUOLON',
    fullname : 'Duolon',
    name : '堕珑',
    des  : '',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':196,'h':227,'p':cc.p(-155,-10),'fc':9},
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
DUOLON.create = function(){
    var sg = new DUOLON();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
