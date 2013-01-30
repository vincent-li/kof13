var YOURI= cc.Sprite.extend({
    id   : 'YOURI',
    fullname : 'Youri Sakazaki',
    name : '坂崎由莉',
    des  : '坂崎家族中的小妹，继承优秀的格斗传统。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':103,'h':222,'p':cc.p(-145,-10),'fc':9},
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
        this.backpose.setScale(0.7);
        this.backpose.setPosition(-365,-105);
    }
});
YOURI.create = function(){
    var sg = new YOURI();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
