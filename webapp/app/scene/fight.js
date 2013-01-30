menfolks.LeftGuys = ['kyo','benimaru'];
var Fighting = {
    BattleFieldSize : {w : 1024,h : 580},
    isFighting : false,
    timeOut : false,
    KEYBOARDS : ['W','S','A','D','J','K','U','I'],
    collide : false,
    modes : ['beated','stand','jump','crouch','commonbeat','mustkill','superkill','guard','neokill']
};
//var gongfu = ['guard','weekpauch','hardpauch','weekkick','hardkick','mustkill','superkill','neokill'];
var FightBackground = cc.Layer.extend({
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var flag = false;
        if (this._super()) {
            var n = Math.abs(6-Math.floor(Math.random()*10));
            var bg = cc.Sprite.create(fightUI['bg'+n]); 
            bg.setPosition(512,291);
            this.addChild(bg);
            flag = true;
        }
        return flag;
    }
});

FightBackground.create = function () {
    var sg = new FightBackground();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
var NEOMAX = cc.Layer.extend({
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var flag = false;
        if (this._super()) {
            //var 
            //this.init
            
            flag = true;
        }
        return flag;
    }

});

NEOMAX.create = function () {
    var sg = new NEOMAX();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var ManFight = cc.Layer.extend({
    hero : null,
    enemy : null,
    heromove : {},
    heropos : null,
    hero_blood : null,
    hero_power : null,
    enemymove : {},
    enemypos : null,
    enemy_blood : null,
    enemy_power : null,
    body_wb : 1024,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var flag = false;
        if (this._super()) {
            
            this.hero = new Gladiator(man2class[menfolks.LeftGuys[0]]);
            this.hero.setAnchorPoint(AnchorPointBottomLeft);
            this.hero.setPosition(240,60);
            this.heropos = cc.p(240,60);
            this.addChild(this.hero, 10, 1);

            this.enemy = new Gladiator2(man2class[menfolks.LeftGuys[1]]);
            this.enemy.setFlipX(true);
            this.enemy.setAnchorPoint(AnchorPointBottomRight);
            this.enemy.setPosition(744,60);
            this.enemypos = cc.p(744,60);
            this.addChild(this.enemy, 10, 2);

            // Fighting.LeftGuy = this.hero;
            // Fighting.RightGuy = this.enemy;
            this.scheduleUpdate();
            this.setKeyboardEnabled(true);
            flag = true;
        }
        return flag;
    },
    update:function (a, b) {
        var aRect = this.hero.collideRect();
        var bRect = this.enemy.collideRect();
        if (cc.rectIntersectsRect(aRect, bRect)) {
            Fighting.collide = true;
        }else{
            Fighting.collide = false;
        }
        //this.synchronous();
    },
    onKeyDown : function(key){
        var k = String.fromCharCode(key);
        var keyboards = Fighting.KEYBOARDS;
        if(keyboards.indexOf(k)>-1 && !P1.KEYS[k]){
            P1.KEYS[k] = true;
            P1.DOWNKEY = k;
        }else{
            return false;
        }
    },
    onKeyUp : function(key){
        var k = String.fromCharCode(key);
        var keyboards = Fighting.KEYBOARDS;
        if(keyboards.indexOf(k)>-1){
            if(P1.KEYS[k] && k===P1.DOWNKEY){
                P1.PRESSKEY.push(k);
            }
            P1.KEYS[k] = false;
            if(P1.DOWNKEY && k===P1.DOWNKEY){
                P1.DOWNKEY = '';
            }
            P1.PRESSKEYS = '';
            P1.ISMOVING = false;
            if(['S','A','D'].indexOf(k)>-1){
                this.hero.stopmove(k);
            }
        }else{
            return false;
        }
    },
    setOtherLayer : function(bg,nm,pb,ff){
        this._bg = bg;
        this._nm = nm;
        this._pb = pb;
        this._ff = ff;
    },
    synchronous : function(){
        // if(Fighting.beat){
        //     this._pb.setBlood();
        //     this._ff.setFlick();
        // }
    }

});

ManFight.create = function () {
    var sg = new ManFight();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var POWERBLOOD = cc.Layer.extend({
    blood : null,
    hp : null,
    ehp : null,
    hpower : null,//能量条边框
    epower : null,//能量条边框
    hpow1 : null,//能量条上边蓝条
    hpow2 : null,//能量条下边黄条
    epow1 : null,
    epow2 : null,
    head_wb : 1215,
    timer0 : [],
    timer10 : [],
    Timer : 90,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var flag = false;
        if (this._super()) {
            this.initBlood();
            this.initPower();
            this.initTimer();
            this.schedule(this.updateTimer,1);
            flag = true;
        }
        return flag;
    },
    initBlood : function(){
        this.blood = cc.Sprite.create(fightUI['blood_bar']);
        //获取左右两个对战人物信息
        var lt = man2class[menfolks.LeftGuys[0]];
        var rt = man2class[menfolks.LeftGuys[1]];
        //设置左边人物的名称和头像
        var lname = cc.LabelTTF.create(lt.name, "Arial", 18);
        lname.setPosition(240,43);
        var lhTexture = cc.TextureCache.getInstance().addImage(roleFightFasces[lt.id.toLowerCase()]);
        var lhead = cc.Sprite.createWithTexture(lhTexture);
        lhead.setPosition(lt.head);
        this.blood.addChild(lhead,-1);
        this.blood.addChild(lname);
        //设置右边人物的名称和头像
        var rname = cc.LabelTTF.create(rt.name, "Arial", 18);
        rname.setPosition(975,43);
        var rhTexture = cc.TextureCache.getInstance().addImage(roleFightFasces[rt.id.toLowerCase()]);
        var rhead = cc.Sprite.createWithTexture(rhTexture);
        rhead.setFlipX(true);
        rhead.setPosition((this.head_wb-rt.head.x),rt.head.y);
        this.blood.addChild(rhead,-1);
        this.blood.addChild(rname);

        var bar = cc.TextureCache.getInstance().addImage(fightUI['b_p']);
        this.hp = cc.Sprite.createWithTexture(bar, cc.rect(0, 0, 432, 20));
        this.hp.setAnchorPoint(AnchorPointRight);
        this.hp.setPosition(553,69);
        this.blood.addChild(this.hp,-1);

        this.ehp = cc.Sprite.createWithTexture(bar, cc.rect(0, 23, 432, 20));
        this.ehp.setAnchorPoint(AnchorPointLeft);
        this.ehp.setPosition(657,69);
        this.blood.addChild(this.ehp,-1);

        this.blood.setScale(0.8);
        this.blood.setPosition(512,490);
        this.addChild(this.blood);
    },
    initPower : function(){
        var bar = cc.TextureCache.getInstance().addImage(fightUI['b_p']);
        var powserTexture = cc.TextureCache.getInstance().addImage(fightUI['power_bar']);
        //初始化左边能量条
        this.hpower = cc.Sprite.createWithTexture(powserTexture);
        this.hpower.setScale(0.8);
        this.hpower.setPosition(180,50);
        this.hpow1 = cc.Sprite.createWithTexture(bar, cc.rect(0, 51, 223, 11));
        this.hpow1.setAnchorPoint(AnchorPointLeft);
        this.hpow1.setPosition(94,31);
        this.hpower.addChild(this.hpow1,-10);
        this.hpow2 = cc.Sprite.createWithTexture(bar, cc.rect(0, 66, 223, 17));
        this.hpow2.setAnchorPoint(AnchorPointLeft);
        this.hpow2.setPosition(94,12);
        this.hpower.addChild(this.hpow2,-10);
        this.addChild(this.hpower);

        this.epower = cc.Sprite.createWithTexture(powserTexture);
        this.epower.setFlipX(true);
        this.epower.setScale(0.8);
        this.epower.setPosition(844,50);
        this.epow1 = cc.Sprite.createWithTexture(bar, cc.rect(0, 51, 223, 11));
        this.epow1.setAnchorPoint(AnchorPointRight);
        this.epow1.setPosition(247,31);
        this.epower.addChild(this.epow1,-10);
        this.epow2 = cc.Sprite.createWithTexture(bar, cc.rect(0, 66, 223, 17));
        this.epow2.setFlipX(true);
        this.epow2.setAnchorPoint(AnchorPointRight);
        this.epow2.setPosition(246,12);
        this.epower.addChild(this.epow2,-10);
        this.addChild(this.epower);
    },
    initTimer : function(){
        for (var i = 0; i < 10; i++) {
            var t10 = cc.Sprite.create(uiIamges['s_time_'+i]);
            t10.setScale(0.8);
            t10.setPosition(500,500);
            t10.setVisible(false);
            var t0 = cc.Sprite.create(uiIamges['s_time_'+i]);
            t0.setScale(0.8);
            t0.setPosition(525,500);
            t0.setVisible(false);
            this.addChild(t10);
            this.addChild(t0);
            this.timer0.push(t0);
            this.timer10.push(t10);
        };
        this.timer10[Math.floor(this.Timer/10)].setVisible(true);
        this.timer0[this.Timer%10].setVisible(true);
    },
    updateTimer : function(){
        if(Fighting.isFighting){
            this.timer10[Math.floor(this.Timer/10)].setVisible(false);
            this.timer0[this.Timer%10].setVisible(false);
            this.Timer--;
            this.timer10[Math.floor(this.Timer/10)].setVisible(true);
            this.timer0[this.Timer%10].setVisible(true);
        }
    },
    setBlood : function(){

    },
    setPower : function(){

    }

});

POWERBLOOD.create = function () {
    var sg = new POWERBLOOD();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var FIGHTFLICKER = cc.Layer.extend({
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var flag = false;
        if (this._super()) {
            //var 
            //this.init
            
            flag = true;
        }
        return flag;
    },
    setFlick : function(){

    }

});

FIGHTFLICKER.create = function () {
    var sg = new FIGHTFLICKER();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

ManFight.scene = function () {
    var scene = cc.Scene.create();
    //var multilayer = cc.LayerMultiplex.create();
    var bglayer = FightBackground.create();
    scene.addChild(bglayer);
    var neolayer = NEOMAX.create();
    scene.addChild(neolayer);
    var fightlayer = ManFight.create();
    scene.addChild(fightlayer);
    var pblayer = POWERBLOOD.create();
    scene.addChild(pblayer);
    var fflayer = FIGHTFLICKER.create();
    scene.addChild(fflayer);
    fightlayer.setOtherLayer(bglayer,neolayer,pblayer,fflayer);
    return scene;
};