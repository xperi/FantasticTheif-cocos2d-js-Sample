
var GameEndLayer = cc.Layer.extend({
	mainNode:null,
	ctor:function () {
		this._super();
		var root = ccs.csLoader.createNode("res/EndScene.csb")
		this.mainNode=root.getChildByName("ProjectNode_1").getChildByName("Panel_10");
		this.addChild(root);
	
		
		
		var replayBtn = this.mainNode.getChildByName("replay_bt");
		replayBtn.addTouchEventListener(this.replayBtnClick, this);
		
		var shareBtn = this.mainNode.getChildByName("share_bt");
		shareBtn.addTouchEventListener(this.shareBtnClick, this);
		
		var mainBtn = this.mainNode.getChildByName("main_bt");
		mainBtn.addTouchEventListener(this.mainBtnClick, this);
		
		var moneyLabel = this.mainNode.getChildByName("totalmoney_label");
		moneyLabel.setString(totalMoney*10+"");
		var ls = cc.sys.localStorage;
		var data = ls.getItem("record");
		if(totalMoney>data){
			ls.setItem("record", totalMoney);
		}
		data = ls.getItem("record");
		if(cc.sys.os == cc.sys.OS_ANDROID){
			var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/StealRun", "reportScore","(Ljava/lang/String;)V",parseInt(totalMoney*10)+"");
			if(g_game_count%3==0){
				var ret2 = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/StealRun", "showAd","()V");
				cc.log("ret2 val is "+ret2);
			}

		}else if(cc.sys.os == cc.sys.OS_IOS){
			var ret = jsb.reflection.callStaticMethod("NativeOcClass","reportScore:",parseInt(totalMoney*10)+"");
			cc.log("ret val is "+ret);
			if(g_game_count%3==0){
				var ret2 = jsb.reflection.callStaticMethod("NativeOcClass","showFullAd");
				cc.log("ret2 val is "+ret2);
			}
		}
		
		
		var bestLabel = this.mainNode.getChildByName("best_label");
		bestLabel.setString("BEST "+data*10+"");
		g_game_count++;
		
		return true;
	},replayBtnClick: function (sender, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			if(g_useSound){
				var audioEngine = cc.AudioEngine.getInstance();
				//audioEngine.playEffect("res/jump.mp3");
			}
			cc.director.runScene(new GamePlayScene());
		}


	},shareBtnClick: function (sender, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			if(g_useSound){
				var audioEngine = cc.AudioEngine.getInstance();
				//audioEngine.playEffect("res/jump.mp3");
			}
			if(cc.sys.os == cc.sys.OS_ANDROID){
				var ret = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/StealRun", "showShare","(Ljava/lang/String;)V",parseInt(totalMoney*10)+"");
			}else if(cc.sys.os == cc.sys.OS_IOS){
				var ret = jsb.reflection.callStaticMethod("NativeOcClass","shareLink:",parseInt(totalMoney*10)+"");
				cc.log("ret val is "+ret);

			}

		}

	},mainBtnClick: function (sender, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			if(g_useSound){
				var audioEngine = cc.AudioEngine.getInstance();
				//audioEngine.playEffect("res/jump.mp3");
			}
			cc.director.runScene(new GameMainScene());
		}

	}
});

var GameEndScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var audioEngine = cc.AudioEngine.getInstance();
		//audioEngine.preloadEffect("res/jump.mp3");
		var layer = new GameEndLayer();
		this.addChild(layer);
	}
});
