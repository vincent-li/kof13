var TAKUMA= cc.Sprite.extend({
    id   : 'TAKUMA',
    fullname : 'Takuma Sakazaki',
    name : '坂崎琢磨',
    des  : '儿子坂崎良 女儿坂崎由莉 徒弟罗伯特',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':150,'h':225,'p':cc.p(-155,-10),'fc':9},
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
        this.backpose.setPosition(-400,-85);
    }
});
TAKUMA.create = function(){
    var sg = new TAKUMA();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
