var TERRY= cc.Sprite.extend({
    id   : 'TERRY',
    fullname : 'Terry Bogard',
    name : '特瑞·伯格',
    des  : '第一代主角，南镇的传说，看来只有那爱睡觉的习惯看起来比较人性化',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':183,'h':229,'p':cc.p(-150,-10),'fc':9},
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
        this.backpose.setPosition(-385,-105);
    }
});
TERRY.create = function(){
    var sg = new TERRY();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
