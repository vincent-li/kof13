var SHEN= cc.Sprite.extend({
    id   : 'SHEN',
    fullname : 'ShenWoo',
    name : '神武',
    des  : '个性单纯、冲动，喜欢打架，希望和强者战斗来证明自己。因为在上海常年和地痞流氓、黑帮打架，所以得了个上海武神的称号，也因此招惹了不少仇家，KOF13赛前还趁黑帮新安清会老大摆寿宴的机会前往闹事。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':160,'h':239,'p':cc.p(-155,-10),'fc':12},
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
SHEN.create = function(){
    var sg = new SHEN();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
