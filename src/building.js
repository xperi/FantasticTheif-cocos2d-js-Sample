var createBuilding=function(line,speed,money){
	var size = cc.winSize;
	var random=Math.floor(Math.random()*15);
	var houseNum=random+1;
	if(houseNum<10)
		houseNum="0"+houseNum;
	random=Math.floor(Math.random()*8);
	
	var building=cc.Sprite("res/house"+houseNum+".png");
	building.setAnchorPoint(cc.p(0.5,0));
	building.attr({
		x: size.width,
		y: getPointByLine(line)
	});	
	building.line=line;
	building.speed=speed;
	building.money=0;
	building.stealMoney=function(){
		var stealedMoney=this.money;
		this.money=0;
		this.removeAllChildren(true);
		if(g_useSound){
			var audioEngine = cc.AudioEngine.getInstance();
			//audioEngine.playEffect("res/coin.mp3");
		}
		return stealedMoney;
	}
	building.scheduleUpdate();
	building.update=function(dt) {
		if(allStop)
			return;
		this.x-=this.speed*dt;
		
	}
	building.setupMoney=function(){
		var random=Math.floor(Math.random()*100);
		if(random>40){
			this.money=0;
			return;
		}else if(random>20){
			this.money=1;
			var moneySprite=new cc.Sprite("res/money01.png");
			moneySprite.x=this.width/2;
			moneySprite.y=this.height+20;
			this.addChild(moneySprite,5);
		}else if(random>5){
			this.money=3;
			var moneySprite=new cc.Sprite("res/money02.png");
			moneySprite.x=this.width/2;
			moneySprite.y=this.height+20;
			this.addChild(moneySprite,5);
		}else{
			this.money=10;
			var moneySprite=new cc.Sprite("res/money03.png");
			moneySprite.x=this.width/2;
			moneySprite.y=this.height+20;
			this.addChild(moneySprite,5)
		}

	}
	building.setupMoney();
	return building;
}