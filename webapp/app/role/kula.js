var KULA= cc.Sprite.extend({
    id   : 'KULA',
    fullname : 'Kula Diamond',
    name : '库拉·戴尔蒙德',
    des  : 'N.E.S.T.S.的上级干部，外表虽然给人冷傲的感觉，但事实上，她和普通的十四岁女孩根本没有分别。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':130,'h':233,'p':cc.p(-145,-10),'fc':18},
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
        this.backpose.setPosition(-385,-90);
    }
});
KULA.create = function(){
    var sg = new KULA();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
