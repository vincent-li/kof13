var ANDY= cc.Sprite.extend({
    id   : 'ANDY',
    fullname : 'Andy Bogard',
    name : '安迪',
    des  : '有个大波老婆的幸福迟钝男人',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':137,'h':215,'p':cc.p(-145,-10),'fc':13},
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
        this.backpose.setScale(0.75);
        this.backpose.setPosition(-385,-105);
    }
});
ANDY.create = function(){
    var sg = new ANDY();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
