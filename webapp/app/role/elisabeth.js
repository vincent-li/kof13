var ELISABETH= cc.Sprite.extend({
    id   : 'ELISABETH',
    fullname : 'Elisabeth Branctorche',
    name : '伊丽莎白·布兰克托什',
    des  : '法国名门望族布兰克托什家族的后裔，能够使用光战斗，和遥远彼之地为敌对关系。个性不茍言笑的冷艳美女，对事情的批评通常也是不假辞色的严厉。 贯彻家族传统，不会用车代步，只会以马匹作载具。受到当地民众的景仰。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':117,'h':248,'p':cc.p(-155,-10),'fc':24},
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
ELISABETH.create = function(){
    var sg = new ELISABETH();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
