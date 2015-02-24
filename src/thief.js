var createThief=function(node,line){
	var size = cc.winSize;
	node.isJumping=false;
	node.isHide=false;
	node.setAnchorPoint(cc.p(0.5,0.5));
	node.attr({
		x: node.width+50,
		y: node.height /2+getPointByLine(line)
	});
	node.line=line;
	
	node.reset=function(){
	}
	node.jump=function(line){
		if(this.isJumping||this.line==line)
			return;
		this.isJumping=true;
		this.runAction(cc.sequence([cc.jumpTo(0.5,this.x,this.height /2+getPointByLine(line),50,1),cc.callFunc(this.endJump, this)]));
		this.line=line;
		if(g_useSound){
			var audioEngine = cc.AudioEngine.getInstance();
			//audioEngine.playEffect("res/jump.mp3");
		}
	}
	node.endJump=function(node){
		this.isJumping=false;
	}
	var animFrames = [];
	for (var i = 0; i < 2; i++) {
		var str = "thief0" + (i+1) + ".png";
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
		cc.log("frame: "+str);
		animFrames.push(frame);
	}
	var animation = cc.Animation.create(animFrames, 0.1);
	var ani=cc.Animate.create(animation);
	var runningAction = cc.RepeatForever.create(ani);
	node.runAction(runningAction);
	return node;
}