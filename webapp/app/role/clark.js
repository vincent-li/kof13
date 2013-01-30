var CLARK= cc.Sprite.extend({
    id   : 'CLARK',
    fullname : 'Clark Still',
    name : '克拉克·司迪尔',
    des  : '在战场上克拉克被敌人俘虏，并用胶带把他的眼皮撑起来，让他眼睁睁的看他的同伴被杀，后来他爆发了，杀死了所有的敌人逃出来，可是他的眼睛变成了白色，就带上了墨镜，并发誓谁要让他再见到阳光，就一定要他死。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':200,'h':240,'p':cc.p(-145,-10),'fc':8},
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
        this.backpose.setPosition(-365,-95);
    }
});
CLARK.create = function(){
    var sg = new CLARK();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
