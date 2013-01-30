var MAI= cc.Sprite.extend({
    id   : 'MAI',
    fullname : 'Mai Shiranui',
    name : '不知火舞',
    des  : '继承不知火流忍术的女忍者，因为喜欢上了在自己祖父不知火半藏门下修行的安迪伯加德，在追随他的过程中卷入多场战斗。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':150,'h':195,'p':cc.p(-145,-10),'fc':15},
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
        this.backpose.setPosition(-365,-90);
    }
});
MAI.create = function(){
    var sg = new MAI();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
