var createCloud=function(speed){
	var size = cc.winSize;
	var cloud=cc.Sprite("res/cloud.png");
	cloud.speed=speed;	
	cloud.scheduleUpdate();
	cloud.update=function(dt) {
		if(allStop)
			return;
		this.x-=this.speed*dt;
		if(this.x+this.width<0){
			this.x=size.width+this.width;
			var random=Math.floor(Math.random()*5);
			this.y=random*30+600;
			random=Math.floor(Math.random()*3);
			this.speed=10*random+200;
		}
	}
	return cloud;
}