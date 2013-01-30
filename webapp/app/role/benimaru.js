var BENIMARU= cc.Sprite.extend({
    id   : 'BENIMARU',
    fullname : 'Benimaru Nikaido',
    name : '二阶堂红丸',
    des  : '日美混血儿，拥有堪比一流模特的容貌，而且多才多艺，至今没有被什么难倒过，更何况还是二阶堂集团的会长之子，拥有着一般人无可比拟的优越环境，在格斗技这个领域内也称得上是天才。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':140,'h':267,'p':cc.p(-150,-10),'fc':9},
    fightparam : {
        'head' : cc.p(45,85)
    },
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
        this.backpose.setPosition(-380,-70);
    }
});
BENIMARU.create = function(){
    var sg = new BENIMARU();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
