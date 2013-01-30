var JOE= cc.Sprite.extend({
    id   : 'JOE',
    fullname : 'Joe Higashi',
    name : '东丈',
    des  : '泰拳高手，饿狼队的生力军！',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':158,'h':256,'p':cc.p(-145,-10),'fc':10},
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
        this.backpose.setPosition(-390,-105);
    }
});
JOE.create = function(){
    var sg = new JOE();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
