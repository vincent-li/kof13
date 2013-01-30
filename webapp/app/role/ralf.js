var RALF= cc.Sprite.extend({
    id   : 'RALF',
    fullname : 'Ralf Jones',
    name : '拉尔夫·琼斯',
    des  : '哈迪伦的部下，官阶为大佐（上校），个性易怒冲动，责任感极强，对部下没有半点长官的架子，非常关心同为怒队成员的伙伴们。非常讨厌蛇，原因是自己养的鸟曾经被蛇吃掉过。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':172,'h':266,'p':cc.p(-145,-10),'fc':32},
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
        this.backpose.setPosition(-385,-95);
    }
});
RALF.create = function(){
    var sg = new RALF();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
