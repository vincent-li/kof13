var MAXIMA= cc.Sprite.extend({
    id   : 'MAXIMA',
    fullname : 'Maxima',
    name : '马克西马',
    des  : '马克西马是NESTS(音巢)以人体制造而成的半人半机械战士,原本是为了实验而做的,可后来当他知道了自己原本的身份后,和k\'一起叛逃组织,并到处破坏组织的分支基地,和组织对抗',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':194,'h':267,'p':cc.p(-145,-10),'fc':12},
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
        this.backpose.setPosition(-385,-95);
    }
});
MAXIMA.create = function(){
    var sg = new MAXIMA();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
