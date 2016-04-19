var menfolks = {
    IsTimeOut : false,
    LeftGuys : [],
    RightGuys : []
};
//选择界面背景
var FiltManBackground = cc.Layer.extend({
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var flag = false;
        if (this._super()) {
            var backS = cc.Sprite.create(uiIamges['s_bg1']);
            backS.setScaleX(0.8);
            backS.setScaleY(0.76);
            backS.setPosition(512,290);
            this.addChild(backS, 0);

            //添加字体
            var sblabel = cc.LabelTTF.create("Select Your Menfolks", "Arial bold", 20);
            sblabel.setColor({r:255,g:235,b:33});
            sblabel.setPosition(500,530);
            this.addChild(sblabel, 1, 1);

            flag = true;
        }
        return flag;
    }
});

FiltManBackground.create = function () {
    var sg = new FiltManBackground();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
var TimerLayer = cc.Layer.extend({
    timer10 : [],
    timer0  : [],
    roll    : null,
    RotaDegree  : 160,
    Timer : 10,
    IsTimeOut : false,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var flag = false;
        if (this._super()) {
            var tb = cc.Sprite.create(uiIamges['s_time']);

            for (var i = 0; i < 10; i++) {
                var t10 = cc.Sprite.create(uiIamges['s_time_'+i]);
                //t10.setScale(0.8);
                t10.setPosition(55,80);
                t10.setVisible(false);
                var t0 = cc.Sprite.create(uiIamges['s_time_'+i]);
                //t0.setScale(0.8);
                t0.setPosition(90,80);
                t0.setVisible(false);
                tb.addChild(t10);
                tb.addChild(t0);
                this.timer0.push(t0);
                this.timer10.push(t10);
            };
            this.timer10[Math.floor(this.Timer/10)].setVisible(true);
            this.timer0[this.Timer%10].setVisible(true);
            this.roll = cc.Sprite.create(uiIamges['s_time_l']);
            this.roll.setPosition(72,75);
            tb.addChild(this.roll,-1);
            this.roll.setRotation(this.RotaDegree);
            //this.roll.runAction(cc.RotateBy.create(1,-360));
            tb.setPosition(512,430);
            this.addChild(tb);
            this.schedule(this.update, 1);
            flag = true;
        }
        return flag;
    },
    update : function(){
        if(this.Timer > 0){
            this.updateTimer();
            this.Timer--;
        }else{
            this.IsTimeOut = true;
            this.resetTimer();
        }
        this.roll.runAction(cc.RotateBy.create(1,-360));
    },
    resetTimer : function(){
        this.IsTimeOut = false;
        this.Timer = 90;
        this.timer10[0].setVisible(false);
        this.timer10[9].setVisible(true);
    },
    updateTimer : function(){
        var t = this.Timer;
        var t_1 = t - 1;
        this.timer0[t%10].setVisible(false);
        this.timer0[t_1%10].setVisible(true);
        this.timer10[Math.floor(t/10)].setVisible(false);
        this.timer10[Math.floor(t_1/10)].setVisible(true);
    },
    timeCount : function(){
        console.log('----fds');
    },
    timeOut : function(){
        menfolks.IsTimeOut = true;
    }
});

TimerLayer.create = function () {
    var sg = new TimerLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var ShowCaseLayer = cc.Layer.extend({
    name : '',
    boothIndex : 0,
    boothmen : [],
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var flag = false;
        if (this._super()) {
            this.addBooth();
            this.generateMan();
            this.changeBootMan(0);
            flag = true;
        }
        return flag;
    },
    generateMan : function(){
        for (var i = 0; i < rolenames.length; i++) {
            var _r = man2class[rolenames[i]];
            var man = cc.Sprite.create();

            //back pose
            var backpose = cc.Sprite.create(backposes[_r.id.toLowerCase()]);
            backpose.setScale(_r.bps || 0.8);
            backpose.setPosition(_r.bp);
            man.addChild(backpose,1,1);

            var _d = this.getDescription(_r);
            man.addChild(_d,1,1);

            var _s = MoveUtils.getStancePose(_r);
            _s.setScale(0.8);
            _s.setPosition(_r.stand.p);
            
            man.addChild(_s,1,1);
            man.setPosition(512,290);
            man.setVisible(false);
            this.boothmen.push(man);
            this.addChild(man,2,1);
        };
    },
    addBooth : function(){
        var _redbooth = cc.Sprite.create(uiIamges['s_red_floor']);
        _redbooth.setScale(0.8);
        _redbooth.setPosition(360,320);
        this.addChild(_redbooth,1,1);
    },
    getDescription : function(_r){
        var fightman = _r

        var _mandes = cc.Sprite.create(uiIamges['s_des']);

        var _name = cc.LabelTTF.create(fightman.id, "Arial bold", 20);
        _name.setColor({r:255,g:235,b:33});
        _name.setPosition(90,13);
        _mandes.addChild(_name, 1, 1);

        
        var _des = cc.LabelTTF.create(fightman.des, "Arial", 16);
        _des.setColor({r:198,g:198,b:198});
       // _des.setDimensions({width:430,height:16});
        
        // var scrollsprite = cc.Sprite.create();
        // var scrolltext = cc.ScrollView.create(430,_des);
        // //scrolltext.addChild(_des);
        // //scrolltext.setPosition(0,0);
        // //scrolltext.setAnchorPoint(cc.p(0,0));
        // scrolltext.setContentSize(430);
        // scrolltext.resume();
        //_mandes.addChild(_des, -10, 1);

        var _cname = cc.LabelTTF.create(fightman.name, "Arial bold", 18);
        _cname.setPosition(890,13);
        _cname.setColor({r:198,g:198,b:198});
        _mandes.addChild(_cname, 1, 1);

        _mandes.setScale(0.8);
        _mandes.setPosition(0,-35);
        //_mandes.setPosition(-390,-50);

        return _mandes;
    },
    changeBootMan : function(index){
        this.boothmen[this.boothIndex].setVisible(false);
        this.boothmen[index].setVisible(true);
        this.boothIndex = index;
    }
});

ShowCaseLayer.create = function () {
    var sg = new ShowCaseLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var SelectBox = cc.Sprite.extend({
    sblight_down : null,
    sblight_up : null,
    up : -90,
    down : 90,
    sy : 0,
    init : function(){
        var flag = true;
        if(this._super()){
            //添加高亮选择框
            var sb = cc.Sprite.create(uiIamges['s_1p']);
            sb.setScale(0.8);
            this.addChild(sb);

            this.sblight_down = cc.Sprite.create(uiIamges['s_1p_l']);
            this.sblight_down.setScale(0.75);
            this.sblight_down.setScaleY(0);
            this.addChild(this.sblight_down);

            this.sblight_up = cc.Sprite.create(uiIamges['s_1p_l']);
            this.sblight_up.setScale(0.75);
            this.sblight_up.setRotation(180);
            //this.sblight_up.setPosition(0,-90);
            this.sblight_up.setScaleY(0);
            this.addChild(this.sblight_up);
           
            var sblabel = cc.LabelTTF.create("1P", "Arial bold", 20);
            sblabel.setColor({r:255,g:235,b:33});
            sblabel.setPosition(0,30);
            this.addChild(sblabel);

            this.schedule(this.updateLight, 0.05);

            flag = true;
        }
        return flag;
    },
    updateLight : function(){
        if(this.up < -6){
            this.sy += 0.011;
        }else{
            this.sy = 0;
        }
        this.up = (90*this.sy)/2-45;
        this.down = 45 - (90*this.sy)/2;
        this.sblight_up.setScaleY(this.sy);
        this.sblight_up.setPosition(0,this.up);
        this.sblight_down.setScaleY(this.sy);
        this.sblight_down.setPosition(0,this.down);
    }
});

SelectBox.create = function(){
    var sg = new SelectBox();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
}

var SelectRole = cc.Layer.extend({
    _roles : [],
    _roleCount : 0,
    selectBox : null,//选择人物框对象--sprite
    selectBoxX : [102,151,197,245,295,345,515,681,731,781,825,875,925,101,151,201,245,295,345,390,440,490,535,585,635,681,731,781,825,875,925],//横向位置索引
    selectBoxY : [190,85],//纵向位置索引
    bxi : 0,//标识当前选择框的横向位置
    byi : 0,//标识当前选择框的纵向位置
    booth : null,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            this.generateMenfolks();
            //加载选择框
            this.selectBox = SelectBox.create();
            this.selectBox.setPosition(101,190);
            this.addChild(this.selectBox, 11, 1);

            this.setKeyboardEnabled(true);
            bRet = true;
        }

        return bRet;
    },
    setBooth : function(b){
        this.booth = b;
    },
    generateMenfolks : function(){
        var boxP = [150,295,730,875,150,295,440,585,730,875];
        var k = 0;
        var rolePx = [102,151,197,247,295,345,681,731,779,827,875,924,101,151,201,245,295,345,390,440,490,535,585,635,681,731,781,825,875,925];
        var j = 0;
        for(var index=1; index < 37; index++){
            if(index%3==0 && [7,8,9,10,11,12].indexOf(index)<0){
                var _b = cc.Sprite.create(uiIamges['s_b_group']);
                _b.setScale(0.8);
                _b.setPosition(boxP[k],(index > 18 ? 85 : 190));
                this.addChild(_b, 10, 1);
                k ++;
            }
            if([7,8,9,10,11,12].indexOf(index)<0){
                var _r = cc.Sprite.create(roleSelectFaces[(index > 12 ? index-5 : index).toString()]);
                _r.setScale(0.8);
                _r.setPosition(rolePx[j],(index > 18 ? 85 : 190));
                this.addChild(_r, 9, 1);
                this._roles.push(_r);
                j++;
            }else{
                if(index == 7 ){
                    var _ra = cc.Sprite.create(uiIamges['s_random']);
                    _ra.setScale(0.8);
                    _ra.setPosition(415,190);
                    this.addChild(_ra, 9, 1);
                    var _s = cc.Sprite.create(uiIamges['s_star']);
                    _s.setPosition(480,190);
                    this.addChild(_s, 9, 1);
                }
                if(index == 10){
                    var _r = cc.Sprite.create(roleSelectFaces['7']);
                    _r.setScale(0.8);
                    _r.setPosition(515,190);
                    this.addChild(_r, 9, 1);
                    this._roles.push(_r);
                }
                if(index == 12){
                    var _s = cc.Sprite.create(uiIamges['s_star']);
                    _s.setPosition(550,190);
                    this.addChild(_s, 9, 1);
                    var _ra = cc.Sprite.create(uiIamges['s_random']);
                    _ra.setScale(0.8);
                    _ra.setPosition(610,190);
                    this.addChild(_ra, 9, 1);
                }
            }
        }
    },
    onKeyDown : function(key){
        // if(this.selectBox && this.timer){
        //     if(this.timer.timeOut){
        //         this.selectTheMan();
        //     }
        // }else{
        //     return false;
        // }
        //alert(key);
        switch(key){
            case 87 :{
                this.byi--;
                if(this.byi < 0){
                    this.byi = this.selectBoxY.length-1;
                }
                if(this.bxi == 6){
                    this.bxi = 21;
                }else if(this.bxi > 18 && this.bxi < 25){
                    this.bxi = 6;
                }else if(this.byi == 0){
                    this.bxi = this.bxi > 12 ? (this.bxi < 19 ? this.bxi-13 : this.bxi-18) : this.bxi;
                }else if(this.byi == 1){
                    this.bxi = this.bxi < 13 ? (this.bxi < 6 ? this.bxi+13 : this.bxi+18) : this.bxi;
                }

                this.selectBox.setPosition(this.selectBoxX[this.bxi],this.selectBoxY[this.byi]);
                break;
            }
            case 83 : {
                this.byi++;
                if(this.byi > this.selectBoxY.length-1){
                    this.byi = 0;
                }
                if(this.bxi == 6){
                    this.bxi = 21;
                }else if(this.bxi > 18 && this.bxi < 25){
                    this.bxi = 6;
                }else if(this.byi == 0){
                    this.bxi = this.bxi > 12 ? (this.bxi < 19 ? this.bxi-13 : this.bxi-18) : this.bxi;
                }else if(this.byi == 1){
                    this.bxi = this.bxi < 13 ? (this.bxi < 6 ? this.bxi+13 : this.bxi+18) : this.bxi;
                }
                this.selectBox.setPosition(this.selectBoxX[this.bxi],this.selectBoxY[this.byi]);
                break;
            }
            case 68 : {
                this.bxi ++;
                if(this.bxi > this.selectBoxX.length-1){
                    this.bxi = 0;
                    this.byi = 0;
                }else if(this.bxi > 12){
                    this.byi = 1;
                }
                this.selectBox.setPosition(this.selectBoxX[this.bxi],this.selectBoxY[this.byi]);
                break;
            }
            case 65 : {
                this.bxi --;
                if(this.bxi < 0){
                    this.bxi = this.selectBoxX.length-1;
                    this.byi = this.selectBoxY.length-1;
                }else if(this.bxi < 13){
                    this.byi = 0;
                }
                this.selectBox.setPosition(this.selectBoxX[this.bxi],this.selectBoxY[this.byi]);
                break;
            }
            case 13 : {
                this.selectTheMan();
                break;
            }
            default : return false;
        }
        if([87,83,68,65].indexOf(key) > -1){
            this.showManPose(this.bxi);
        }
        //console.log(this.bxi + '---' + this.byi);
    },
    selectTheMan : function(){
        var name = rolenames[this.bxi];
        if(!name || menfolks.LeftGuys.indexOf(name) > -1){
            this.onKeyDown(68);
            return false;
        }else{
            var sel = this._roles[this.bxi];
            var _r = man2class[rolenames[this.bxi]];
            var select = cc.Sprite.create(uiIamges['s_2p']);
            select.setPosition(20,57);
            sel.addChild(select,10,1);
            this.haveSelectedMan(_r);
            menfolks.LeftGuys.push(name);
            this._roleCount++;
            this.onKeyDown(68);
        }
        if(this._roleCount > 2){
            this.gotoBattleOrder();
        }
        
    },
    showManPose : function(index){
        this.booth.changeBootMan(index);
    },
    gotoBattleOrder : function(){
        //this.runAction(cc.FadeOut.create(2));
        setTimeout(function(){
            //myApp.changeScene(BattleOrder.scene);
            myApp.changeScene(ManFight.scene);
        },1000);
        //myApp.changeScene(BattleOrder.scene);
    },
    haveSelectedMan : function(man){
        var pos = [645,790,930];
        var sm = cc.Sprite.create();
        var _s = MoveUtils.getStancePose(man);
        _s.setScale(0.6);
        _s.setPosition(0,10);
        var _namebar = cc.Sprite.create(uiIamges['s_s_n_b']);
        _namebar.setScale(0.6);
        var _name = cc.LabelTTF.create(man.name, "Arial", 20);
        _name.setColor({r:255,g:235,b:33});
        _name.setPosition(140,15);
        _namebar.addChild(_name);
        sm.setAnchorPoint(cc.p(0,0));
        sm.addChild(_s);
        sm.addChild(_namebar);
        sm.setPosition(cc.p(950,320));
        sm.runAction(cc.MoveTo.create(0.15,cc.p(pos[this._roleCount],320)));
        this.addChild(sm,15,'f_'+name);
    }

});

SelectRole.create = function () {
    var sg = new SelectRole();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

SelectRole.scene = function () {
    var scene = cc.Scene.create();
    var fmb = FiltManBackground.create();
    scene.addChild(fmb);
    var tl = TimerLayer.create();
    scene.addChild(tl);
    var scl = ShowCaseLayer.create();
    scene.addChild(scl);
    var slr = SelectRole.create();
    slr.setBooth(scl);
    scene.addChild(slr);
    return scene;
};
