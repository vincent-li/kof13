var KDAS= cc.Sprite.extend({
    id   : 'KDAS',
    fullname : 'K\'',
    name : 'K\'',
    des  : 'N.E.S.T.S组织最强的改造战士，是1999-2001年的拳皇冠军。原本是为N.E.S.T.S效命，但为了找回失去的记忆而脱离了组织。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':152,'h':249,'p':cc.p(-145,-10),'fc':37},
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
        
        this.backpose.setPosition(-365,-105);
    }
});
KDAS.create = function(){
    var sg = new KDAS();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
