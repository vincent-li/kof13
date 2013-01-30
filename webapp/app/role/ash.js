var ASH= cc.Sprite.extend({
    id   : 'ASH',
    fullname : 'Ash Crimson',
    name : '阿修·克里门森',
    des  : '讨厌麻烦的无聊的事情，觉得运动很烦，使用翠绿色的火焰，在03年的KOF大会上趁乱夺取了神乐千鹤的神器八咫之镜。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':110,'h':243,'p':cc.p(-155,-10),'fc':30},
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
        this.backpose.setPosition(-375,-95);
    }
});
ASH.create = function(){
    var sg = new ASH();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
