var thiefSpeed=100;
var policeSpeed=250;
var buildingSpeed=180;
var totalMoney=0;
var totalStage=1;
var allStop=false;
var stageCount=0;
var GamePlayLayer = cc.Layer.extend({
	thief:null,
	polices:null,
	buildings:null,
	mainNode:null,
	moneyLabel:null,
	ctor:function () {
		this._super();
		allStop=false;
		totalMoney=0;
		stageCount=0;
		policeSpeed=250;
		this.buildings=new buckets.LinkedList();
		this.polices=new buckets.LinkedList();
		var root = ccs.csLoader.createNode("res/PlayScene.csb")
		this.mainNode=root.getChildByName("mainNode").getChildByName("mainPanel");
		this.addChild(root);
		for (var i in this.mainNode.getChildren()){
			var chiled=this.mainNode.getChildren()[i];
			cc.log("chiled "+chiled.getName());
		}
		
		
		
		this.moneyLabel = this.mainNode.getChildByName("money_label");
		this.moneyLabel.setString(totalMoney+"");
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames("res/thief.plist");
		cc.SpriteFrameCache.getInstance().addSpriteFrames("res/police.plist");
		this.thief = createThief(cc.Sprite.createWithSpriteFrameName("thief01.png"),2);
		this.addChild(this.thief,5);
		this.scheduleUpdate();
		
		
		
		
		
		
		
		
		for(var i=0;i<3;i++){
			for(var j=0;j<3;j++){
				var house=createBuilding(j+1,buildingSpeed,j+1);
				house.x=house.x+i*200;
				this.addChild(house,0);
				this.buildings.add(house);
			}
			
		}
		for(var i=0;i<3;i++){
			var police=createPolice(policeSpeed,stageCount);
				police.x=police.x+i*200;
				this.addChild(police,5);
				this.polices.add(police);
		}
		for(var i=0;i<3;i++){
			var cloud=createCloud(10*i+200);
			cloud.x=cloud.x+i*200;
			var random=Math.floor(Math.random()*5);
			cloud.y=random*30+600;
			this.addChild(cloud,5);
		}
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan
		}, this); 
		if(g_useSound){
			var audioEngine = cc.AudioEngine.getInstance();
			audioEngine.playMusic("res/bg.mp3",true);
		}
		
		return true;
	},update:function (dt) {
		this.checkCollision();
		this.checkStealMoney();
		this.checkHouse();
		this.checkPolice();
		
	},checkCollision:function(){
		var policesArray=this.polices.toArray();
		for(var i in policesArray){
			var police=policesArray[i];
				if(cc.rectIntersectsRect(this.thief.getBoundingBox(),police.getBoundingBox())){
					this.stageReset();
					return;
				}
			}
		
	},checkStealMoney:function(){
		var box=this.thief.getBoundingBox();
		var buildingsArray=this.buildings.toArray();
		for(var i in buildingsArray){
			var building=buildingsArray[i];
			if (cc.rectContainsPoint(building.getBoundingBox(),cc.p(box.x+box.width/2,box.y+box.height/2) )) {
				if(building.money==0)
					return;

				var money=building.stealMoney();
				totalMoney+=money;
				this.updateMoney();
				return;
				
			}

		}
	},checkHouse:function(){
		var newHouses=new buckets.LinkedList();
		var buildingsArray=this.buildings.toArray();
		
		
		for(var i in buildingsArray){
			var house=buildingsArray[i];
			if(house.x<0){
				cc.log("checkHouse :"+house.line);
				var newhouse=createBuilding(house.line,house.speed,house.money);
				newHouses.add(newhouse);
				cc.log("newhouse :"+house.y);
				this.buildings.remove(house,function(house1,house2){
					
					return(house1.x==house2.x)&&(house1.y==house2.y);
				});
				
			}
		}
		var newHouseArray=newHouses.toArray();
		for(var i in newHouseArray){
			var size = cc.winSize;
			var house=newHouseArray[i];
			cc.log("newHouses :"+house.y);
			house.x= size.width+150;
			this.addChild(house,3);
			this.buildings.add(house);
		}
		
	},checkPolice:function(){
		var newPolices=new buckets.LinkedList();
		var policesArray=this.polices.toArray();

		var maxX=0;
		for(var i in policesArray){
			var police=policesArray[i];
			if(police.x>maxX){
				maxX=police.x+police.speed/2;
			}
			if(police.x<0){
				if(policeSpeed<350)
				policeSpeed+=2;
				stageCount++;
				var newpolice=createPolice(policeSpeed,stageCount);
				newPolices.add(newpolice);
				this.polices.remove(police,function(police1,police2){
					
					return(police1.x==police2.x)&&(police1.y==police2.y);
				});

			}
		}
		var newPoliceArray=newPolices.toArray();
		for(var i in newPoliceArray){
			var size = cc.winSize;
			var police=newPoliceArray[i];
			police.x= Math.max(size.width,maxX)+150;
			this.addChild(police,5);
			this.polices.add(police);
		}

	},updateMoney:function(){
		this.moneyLabel.setString((totalMoney*10)+"");
		
		
	},onTouchBegan:function(touch, event) {
		var location=touch.getLocation();
		if(!allStop)
		event.getCurrentTarget().jumpSprite(location.y);

		return true;
	},jumpSprite:function(y){
		
		var line=this.thief.line;
		cc.log("line :"+line);
		if(this.thief.y<y){
			line++
		}else if(this.thief.y>y){
			line--
		}
		cc.log("line :"+line+" this.thief.y :"+this.thief.y+" y:"+y);
		line=Math.min(line,3);
		line=Math.max(line,1);
		this.thief.jump(line);
	},stageReset:function(){
		this.unscheduleUpdate();
		this.thief.stopAllActions();
		cc.log("stageReset :");
		allStop=true;
		
		this.thief.runAction(cc.jumpBy(1,0,-500,250,1));	
		var audioEngine = cc.AudioEngine.getInstance();
		if(g_useSound){
			
			//audioEngine.playEffect("res/end.mp3");
		}
		audioEngine.stopMusic("res/bg.mp3");
		this.runAction(cc.sequence([cc.delayTime(2),cc.callFunc(this.moveSecene, this)]));
		
	},moveSecene:function(){
		cc.director.runScene(new GameEndScene());
	}
});

var GamePlayScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var audioEngine = cc.AudioEngine.getInstance();
		//audioEngine.preloadEffect("res/coin.mp3");
		//audioEngine.preloadEffect("res/end.mp3");
		//audioEngine.preloadEffect("res/jump.mp3");
		audioEngine.preloadMusic("res/bg.mp3");
		var layer = new GamePlayLayer();
		this.addChild(layer);
		
	}
});
