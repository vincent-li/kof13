var KIM= cc.Sprite.extend({
    id   : 'KIM',
    fullname : 'Kim Kaphwan',
    name : '金家藩',
    des  : '出身韩国，跆拳道高手',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':140,'h':257,'p':cc.p(-155,-10),'fc':10},
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
        this.backpose.setPosition(-385,-125);
    }
});
KIM.create = function(){
    var sg = new KIM();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
