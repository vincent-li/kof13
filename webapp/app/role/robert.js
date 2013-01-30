var ROBERT= cc.Sprite.extend({
    id   : 'ROBERT',
    fullname : 'Robert Garcia',
    name : '罗伯特·加西亚',
    des  : '出身名门，家财万贯，但是不喜欢继承家族生意，立志成为格斗家。在掌握一定格斗技后挑战各路豪杰，一日来到极限流挑战，将所有喽啰打败后，板崎琢磨令板崎良出战，板崎良用一个手指便屡次将他打倒在地。从此罗伯特拜在极限流门下，最终成为和板崎良齐名的最强之虎。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':146,'h':255,'p':cc.p(-150,-10),'fc':15},
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
        this.backpose.setPosition(-365,-130);
    }
});
ROBERT.create = function(){
    var sg = new ROBERT();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
