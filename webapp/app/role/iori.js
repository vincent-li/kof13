var IORI= cc.Sprite.extend({
    id   : 'IORI',
    fullname : 'Iori Yagami',
    name : '八神 庵',
    des  : '庵是八神家族最年轻的后裔，八神氏曾经叫八尺琼，一个曾经在公元八世纪前和草剃家联盟，又在八咫家（现在的神乐千鹤家族曾经的姓氏，属于神战士守护者）的帮助下，将大蛇封印至永远的睡眠。他们是通过用八酒杯禁制住大蛇后，再被草剃之剑削弱，八尺琼封印，最后由八咫监禁起来． 时间流逝，八尺琼不想生活在草稚的“阴影”下，大蛇召唤他，两者签定了“血契”后，便给予了八尺琼家族无穷的力量，并要求八尺琼改姓八神，但代价是放弃守护大蛇封印的使命。草剃家意识到了他们的背叛，开始了反击。从那以后，两家的争斗从未停止，实力也一直不分高低。 因为得到大蛇的力量，八神家的力量之火为紫色，也获得了大蛇之力的奥义——八稚女。',
    pos  : 'L',//L--左边，R--右边
    backpose : null,//角色选择页面 sprite--背景人物
    mandes : null,//角色选择页面 sprite--人物信息
    stance : null,//角色选择页面 sprite--人物展示台动作
    stanceparam : {'w':180,'h':242,'p':cc.p(-150,-10),'fc':16},
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
IORI.create = function(){
    var sg = new IORI();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}
