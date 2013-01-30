//人物名称对应的人物类-sprite
var P1 = {
    DOWNKEY : '',
    KEYS : {},
    ISDOING : false,
    KEYCOUNT : 0,
    PRESSKEY : [],
    PRESSKEYS: '',
    PRESSLENGTH : 1 //记录PRESSKEYS前一个状态的长度
};
var Gladiator = cc.Sprite.extend({
    speed : 180,
    movelist : ['W','D','A','DD','AA'],
    ctor:function (f) {
        cc.associateWithNative( this, cc.Sprite );
        //绑定当前对象
        this.fighter = f;
        this.hp = 1000;
        this.sp = 100;
        this.dp = 100;
        this.moveframes = {};
        this.standframes = [];
        var id = this.fighter.id.toLowerCase();
        var w = this.fighter.stand.w;
        var h = this.fighter.stand.h;
        var camp = this.fighter.L_R;
        var manTexture = cc.TextureCache.getInstance().addImage(stancepose[id]);
        this.initWithTexture(manTexture, cc.rect(0, 0, w, h));

        this.getActionFrames();
        this.setPosition(0,0);
        this.relativepos = camp;
        this.posture = 'stand';
        this.mode = 'stand';
        this.scheduleUpdate();
        this.schedule(this._displayFrame,0.06);
    },
    //当前展示layer在帧时间间隔执行
    update : function(dt){
        //console.log(dt);
        var _keys = P1.KEYS;
        var self = this;
        //判断2个keyup的时间间隔
        if(P1.PRESSKEY.length){
            //如果小于间隔，继续加
            if(P1.KEYCOUNT < 10){ 
                //如果没有超时，这个时候_presskeys长度发生变化，重置时间
                if(P1.PRESSLENGTH !== P1.PRESSKEY.length){
                    P1.PRESSLENGTH = P1.PRESSKEY.length;
                    P1.KEYCOUNT = 0;
                }else{
                  P1.KEYCOUNT++;  
                  //console.log(P1.KEYCOUNT);
                }
                return false;
            }else{//否则超时，超时执行keypress方法，各参数归零
                P1.PRESSKEYS = P1.PRESSKEY.join(''); 
                P1.PRESSKEY = [];
                P1.PRESSLENGTH = 1;
                P1.KEYCOUNT = 0;
            }
        }else{
            //if(!P1.KEYCOUNT) P1.KEYCOUNT++;
            if(P1.DOWNKEY){
                //console.log(P1.DOWNKEY);
                var kindex = Fighting.KEYBOARDS.indexOf(P1.DOWNKEY);
                if(kindex > -1 && kindex < 4){
                    self.move(dt);
                }else if(kindex > 3){
                    if(!P1.ISDOING){
                        var _k = P1.DOWNKEY;
                        if(self.posture==='crouch'){
                            _k = 'S'+_k;
                        }
                        if(self.posture==='jump'){
                            _k = 'W'+_k;
                        }
                        self.beat(_k);
                    }
                }
            }else{
                //console.log(P1.PRESSKEYS);
                if(P1.PRESSKEYS){
                    if(P1.PRESSKEYS.length > 1){
                        self.handleGroupKeys(P1.PRESSKEYS);
                    }
                    P1.PRESSKEYS = '';
                }
                
            }
        }
    },
    _displayFrame : function(){
        //console.log(this.animateName+'-----'+this.frameIndex);
        this.setDisplayFrameWithAnimationName(this.animateName,this.frameIndex);
        if(this.frameIndex < this.frameLimit-1){
            this.frameIndex ++;
        }else{
            P1.ISDOING = false;
            if(!self.changeposture){
                P1.ISMOVING = false;
            }
            var _sta = this.fighter.id.toLowerCase()+'_'+this.fighter.L_R+'_'+this.posture;
            if(this.animateName !== _sta){
                this.animateName = _sta;
            }
            this.frameIndex = 0;
            this.frameLimit = this.fighter.rects[this.posture][3];
        }
    },
    getActionFrames : function(){
        var w = this.fighter.stand.w;
        var h = this.fighter.stand.h;
        var fc = this.fighter.stand.fc;
        var id = this.fighter.id.toLowerCase();
        var camp = this.fighter.L_R;
        var rects = this.fighter.rects;
        //init pose picture
        var fightTexture = cc.TextureCache.getInstance().addImage(fightMovements[id]);
        for(var k in rects){
            if(!this.moveframes[k]){
                this.moveframes[k] = [];
            }
            var temp = rects[k];
            for (var i = 0; i < temp[3]; i++) {
                var frame = cc.SpriteFrame.createWithTexture(fightTexture, cc.rect((temp[0]*i+temp[2].x),temp[2].y,temp[0],temp[1]));
                this.moveframes[k].push(frame);
            };
            var _animation = cc.Animation.create(this.moveframes[k], 0.1);
            frameName = id+'_'+camp+'_'+k;
            cc.AnimationCache.getInstance().addAnimation(_animation,frameName);
        }
        this.animateName = id+'_'+camp+'_stand';
        this.frameIndex = 0;
        this.frameLimit = this.fighter.rects['stand'][3];
    },
    beat : function(keys){
        var self = this;
        if(keys){
            P1.ISDOING = true;
            self.displayAnimate(keys);
        }
    },
    setPos : function(k,dt){
        var self = this;
        var pos = self.getPosition();
        if(!Fighting.collide){
            if (k==='D') {
                pos.x += dt * self.speed;
            }
            if (k==='DD') {
                pos.x += dt * self.speed;
            }
        }
        if (k==='W') {
        //pos.y += dt * this.speed;
        }
        if(k==='S'){
            //pos.y -= dt * this.speed;
        }
        if (k==='A' && pos.x >= 0) {
            pos.x -= dt * self.speed;
        }
        
        self.setPosition( pos );
    },
    move : function(dt){
        var self = this;
        var k = P1.DOWNKEY;
        if(!P1.ISMOVING){
            if(self.posture && self.posture==='crouch' && (P1.DOWNKEY==='A'|| P1.DOWNKEY==='D')){
                return false;
            }
            P1.ISMOVING = true;
            if(P1.PRESSKEYS && P1.DOWNKEY && P1.PRESSKEYS===P1.DOWNKEY && P1.DOWNKEY==='D'){
                k = 'DD';
            }
            if(k==='S' && self.posture==='stand'){
                self.posture = 'crouch';
                self.changeposture = true;
                self.displayAnimate('S2C');
            }else{
                self.changeposture = false;
                self.displayAnimate(k);
            }
        }
        self.setPos(k,dt);
    },
    stopmove : function(k){
        var self = this;
        if(k==='S' && self.posture==='crouch'){
            self.displayAnimate('C2S');
            self.changeposture = true;
        }else{
            self.displayAnimate('stand');
        }
        self.posture = 'stand';
    },
    handleGroupKeys : function(keys){
        var self = this;
        if(keys && self.fighter.rects[keys]){
            P1.ISDOING = true;
            self.displayAnimate(keys);
        }
    },
    displayAnimate : function(keys){
        var self = this;
        if(keys && self.fighter.rects[keys]){
            var id = self.fighter.id.toLowerCase();
            var camp = self.fighter.L_R;
            self.animateName = id+'_'+camp+'_'+keys;
            self.frameIndex = 0;
            self.frameLimit =  self.fighter.rects[keys][3];
        }
    },
    collideRect:function(){
        var p = this.getPosition();
        var s = this.getTextureRect().size;
        //console.log(this.getTextureRect());
        x = p.x;
        if(this.relativepos=='R'){
           x = p.x-s.width; 
        }
        return cc.rect(x,p.y,s.width-20,s.height);
    }
});