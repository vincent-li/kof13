(function(){
    if(!window.MoveUtils){

        window.MoveUtils = {};

        MoveUtils.getStancePose = function(m){
            var w = m.stand.w;
            var h = m.stand.h;
            var fc = m.stand.fc;
            var id = m.id.toLowerCase();
            //init pose picture
            var manTexture = cc.TextureCache.getInstance().addImage(stancepose[id]);
            // set frame
            var animFrames = [];
            for (var i = 0; i < fc; i++) {
                var frame = cc.SpriteFrame.createWithTexture(manTexture, cc.rect(w*i, 0, w, h));
                animFrames.push(frame);
            };
            // ship animate
            var animation = cc.Animation.create(animFrames, 0.1);
            var animate = cc.Animate.create(animation);
            var minipose = cc.Sprite.createWithTexture(manTexture, cc.rect(w*0, 0, w, h));
            minipose.runAction(cc.RepeatForever.create(animate));
            minipose.setAnchorPoint(cc.p(0.5,0));
            return minipose;
        }
    }
    
})();