var createPolice=function(speed,stageCount){
	var randomCount=1;
	if(stageCount>20){
		randomCount=3;
	}else if(stageCount>10){
		randomCount=2;
	}
	cc.log("randomCount :"+randomCount+"stageCount :"+stageCount);
	
	
	var size = cc.winSize;
	var random=Math.floor(Math.random()*100);
	var policeNum=3;
	var addSpeed=0;
	
	if(stageCount>10&&random<50){
		policeNum=1;
		addSpeed=70
	}else if(stageCount>20&&random<75){
		policeNum=2;
		addSpeed=140
	}
	
	
	
	
	
	
	var police=cc.Sprite.createWithSpriteFrameName("police0"+policeNum+"_1.png");
	
	
	
	
	random=Math.floor(Math.random()*3);
	var line=random+1;
	
	
	police.setAnchorPoint(cc.p(0.5,0));
	police.attr({
		x: size.width,
		y: getPointByLine(line)
	});	
	police.policeNum=policeNum;
	police.line=line;
	police.speed=speed+addSpeed;	
	police.scheduleUpdate();
	police.update=function(dt) {
		if(allStop)
			return;
		this.x-=this.speed*dt;

	}
	var animFrames = [];
	for (var j = 0; j < 2; j++) {
		var str = "police0" + (policeNum)+"_"+(j+1) + ".png";
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
		cc.log("frame: "+str);
		animFrames.push(frame);
	}
	var animation = cc.Animation.create(animFrames, 0.1);
	var runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
	police.runAction(runningAction);
	return police;
}