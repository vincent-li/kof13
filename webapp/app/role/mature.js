var MATURE= cc.Sprite.extend({
    id   : 'MATURE',
    fullname : 'Mature',
    name : '玛图尔',
    des  : '监视八神庵，但在比赛后被八神庵重创，没有被杀死，而左眼被八神攻击失明。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':180,'h':246,'p':cc.p(-150,-10),'fc':8},
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
        this.backpose.setPosition(-370,-125);
    }
});
MATURE.create = function(){
    var sg = new MATURE();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
