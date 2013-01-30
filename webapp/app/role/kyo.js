var KYO = cc.Sprite.extend({
    id   : 'KYO',
    fullname : 'Kyo Kusanagi',
    name : '草雉京',
    des  : '他是守护神器草薙剑的草薙一族后裔，与守护神器八尺琼勾玉的八神一族中的八神庵是天生的宿敌。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':128,'h':237,'p':cc.p(-150,-10),'fc':11},
    fightparam : {
        'head' : cc.p(30,75)
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
        this.backpose.setPosition(-385,-105);
    }
});
KYO.create = function(){
    var sg = new KYO();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
