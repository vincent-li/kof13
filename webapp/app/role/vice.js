var VICE= cc.Sprite.extend({
    id   : 'VICE',
    fullname : 'vice',
    name : '维斯',
    des  : '本着监视八神的目的与八神一起出场，但由于八神自身也流有大蛇的血，当其复苏后两人被打倒，生死不明。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':160,'h':243,'p':cc.p(-150,-10),'fc':9},
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
        this.backpose.setPosition(-395,-70);
    }
});
VICE.create = function(){
    var sg = new VICE();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
