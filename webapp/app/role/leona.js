var LEONA= cc.Sprite.extend({
    id   : 'LEONA',
    fullname : 'Leona Heidern',
    name : '雷欧娜·海登',
    des  : '雷欧娜是"八杰集"之一的加迪路的女儿，所以他身体也流淌着大蛇之血。暴走之后很可怕！',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':177,'h':244,'p':cc.p(-145,-10),'fc':10},
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
        this.backpose.setPosition(-365,-85);
    }
});
LEONA.create = function(){
    var sg = new LEONA();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
