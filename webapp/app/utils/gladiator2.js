//人物名称对应的人物类-sprite
var P2 = {};
var Gladiator2 = cc.Sprite.extend({
    ctor:function (f) {
        cc.associateWithNative( this, cc.Sprite );
        //绑定当前对象
        this.fighter = f;
        this.hp = 1000;
        this.sp = 100;
        this.dp = 100;
        this.moveframes = {};

        var id = this.fighter.id.toLowerCase();
        var w = this.fighter.stand.w;
        var h = this.fighter.stand.h;
        var camp = this.fighter.L_R;
        var fightTexture = cc.TextureCache.getInstance().addImage(fightMovements[id]);
        this.initWithTexture(fightTexture, cc.rect(0, 0, w, h));
    
        this.getActionFrames(fightTexture);
        this.setPosition(0,0);
        this.relativepos = camp;
        this.posture = 'stand';
        //this.scheduleUpdate();
        this.schedule(this._displayFrame,0.08);
    },
    //当前展示layer在帧时间间隔执行
    update : function(dt){
        //console.log(dt);
        var _keys = P2.KEYS;
        var self = this;
        //判断2个keyup的时间间隔
        if(P2.PRESSKEY.length){
            //如果小于间隔，继续加
            if(P2.KEYCOUNT < 10){ 
                //如果没有超时，这个时候_presskeys长度发生变化，重置时间
                if(P2.PRESSLENGTH !== P2.PRESSKEY.length){
                    P2.PRESSLENGTH = P2.PRESSKEY.length;
                    P2.KEYCOUNT = 0;
                }else{
                  P2.KEYCOUNT++;  
                  //console.log(P2.KEYCOUNT);
                }
                return false;
            }else{//否则超时，超时执行keypress方法，各参数归零
                P2.PRESSKEYS = P2.PRESSKEY.join(''); 
                P2.PRESSKEY = [];
                P2.PRESSLENGTH = 1;
                P2.KEYCOUNT = 0;
            }
        }else{
            //if(!P2.KEYCOUNT) P2.KEYCOUNT++;
            if(P2.DOWNKEY){
                //console.log(P2.DOWNKEY);
                var kindex = Fighting.KEYBOARDS.indexOf(P2.DOWNKEY);
                if(kindex > -1 && kindex < 4){
                    self.move(dt);
                }else if(kindex > 3){
                    if(!P2.ISDOING){
                        var _k = P2.DOWNKEY;
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
                //console.log(P2.PRESSKEYS);
                if(P2.PRESSKEYS){
                    if(P2.PRESSKEYS.length > 1){
                        self.handleGroupKeys(P2.PRESSKEYS);
                    }
                    P2.PRESSKEYS = '';
                }
                
            }
        }
    },
    _displayFrame : function(){
        //console.log(this.animateName+'-----'+this.frameIndex);
        this.setDisplayFrameWithAnimationName(this.animateName,this.frameIndex);
        //console.log(this.frameLimit);
        if(this.frameIndex < this.frameLimit-1){
            this.frameIndex ++;
        }else{
            var _sta = this.fighter.id.toLowerCase()+'_'+this.fighter.L_R+'_'+this.posture;
            if(this.animateName !== _sta){
                this.animateName = _sta;
            }
            this.frameIndex = 0;
            this.frameLimit = this.fighter.rects[this.posture][3];
        }
    },
    getActionFrames : function(fightTexture){
        var w = this.fighter.stand.w;
        var h = this.fighter.stand.h;
        var fc = this.fighter.stand.fc;
        var id = this.fighter.id.toLowerCase();
        var camp = this.fighter.L_R;
        var rects = this.fighter.rects;
        //init pose picture
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
            P2.ISDOING = true;
            self.displayAnimate(keys);
        }
    },
    setPos : function(k,dt){
        var self = this;
        var pos = self.getPosition();
        if (k==='W') {
            pos.y += dt * this.speed;
        }
        if(k==='S'){
            pos.y -= dt * this.speed;
        }
        if (k==='A' && pos.x >= 0) {
            pos.x -= dt * self.speed;
        }
        if (k==='D') {
            if((pos.x+dt * self.speed) < (P2.BattleFieldSize.w-self.fighter.body.b)){
                pos.x += dt * self.speed;
            }
        }
        if (k==='DD') {
            console.log(P2.BattleFieldSize.w);
            if((pos.x + dt * self.fighter.runspeed) < (P2.BattleFieldSize.w - self.fighter.body.r)){
                pos.x += dt * self.fighter.runspeed;
            }
        }
        self.setPosition( pos );
    },
    move : function(dt){
        var self = this;
        var k = P2.DOWNKEY;
        if(!P2.ISMOVING){
            if(self.posture && self.posture==='crouch' && (P2.DOWNKEY==='A'|| P2.DOWNKEY==='D')){
                return false;
            }
            P2.ISMOVING = true;
            if(P2.PRESSKEYS && P2.DOWNKEY && P2.PRESSKEYS===P2.DOWNKEY && P2.DOWNKEY==='D'){
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
            P2.ISDOING = true;
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
        var x = p.x;
        if(this.relativepos=='R'){
           x = p.x-s.width; 
        }
        x += 20;
        //console.log(this.getTextureRect());
        return cc.rect(x,p.y,s.width-20,s.height);
    }
});