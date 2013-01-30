var DAIMON= cc.Sprite.extend({
    id   : 'DAIMON',
    fullname : 'Goro Daimon',
    name : '大门五郎',
    des  : '木讷的柔道家',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':185,'h':288,'p':cc.p(-145,-10),'fc':15},
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
        this.backpose.setPosition(-370,-95);
    }
});
DAIMON.create = function(){
    var sg = new DAIMON();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
