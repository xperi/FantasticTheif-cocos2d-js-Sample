
var GameMainLayer = cc.Layer.extend({
	mainNode:null,
	activeSoundBtn:null,
	nonActiveSoundBtn:null,
	ctor:function () {
		this._super();
		var root = ccs.csLoader.createNode("res/IntroScene.csb")
		this.mainNode=root.getChildByName("ProjectNode_1").getChildByName("Panel_14");
		this.addChild(root);
		
		var playBtn = this.mainNode.getChildByName("play_bt");
		playBtn.addTouchEventListener(this.playBtnClick, this);
		var rateBtn = this.mainNode.getChildByName("rate_bt");
		rateBtn.addTouchEventListener(this.rateBtnClick, this);
		var learderBtn = this.mainNode.getChildByName("learder_bt");
		learderBtn.addTouchEventListener(this.learderBtnClick, this);
		this.activeSoundBtn=this.mainNode.getChildByName("sound_bt");
		this.activeSoundBtn.addTouchEventListener(this.activeSoundBtnClick, this);

		this.nonActiveSoundBtn=this.mainNode.getChildByName("sound_bt_off");
		this.nonActiveSoundBtn.addTouchEventListener(this.nonActiveSoundBtnClick, this);
		this.soundUpdate();
		
			
		return true;
	},soundUpdate:function(){
		var ls = cc.sys.localStorage;
		var data = ls.getItem("soundDisable");
		if(data=="true"){
			this.activeSoundBtn.setOpacity(0);

			this.nonActiveSoundBtn.setOpacity(255);
			this.activeSoundBtn.setEnabled(false);
			this.nonActiveSoundBtn.setEnabled(true);
			g_useSound=false;
		}else{
			this.activeSoundBtn.setOpacity(255);
			this.nonActiveSoundBtn.setOpacity(0);
			this.activeSoundBtn.setEnabled(true);
			this.nonActiveSoundBtn.setEnabled(false);
			g_useSound=true;
		}
	},playBtnClick: function (sender, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			if(g_useSound){
				var audioEngine = cc.AudioEngine.getInstance();
				//audioEngine.playEffect("res/jump.mp3");
			}
			cc.director.runScene(new GamePlayScene());
		}


	},rateBtnClick: function (sender, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			if(g_useSound){
				var audioEngine = cc.AudioEngine.getInstance();
				//audioEngine.playEffect("res/jump.mp3");
			}
			if(cc.sys.os == cc.sys.OS_ANDROID){
				var ret2 = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/StealRun", "showRateUs","()V");
			}else if(cc.sys.os == cc.sys.OS_IOS){
				var ret = jsb.reflection.callStaticMethod("NativeOcClass","openRateusLink");
				cc.log("ret val is "+ret);

			}
		}


	},learderBtnClick: function (sender, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			if(g_useSound){
				var audioEngine = cc.AudioEngine.getInstance();
				//audioEngine.playEffect("res/jump.mp3");
			}
			if(cc.sys.os == cc.sys.OS_ANDROID){
				var ret2 = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/StealRun", "showScoreBoard","()V");
			}else if(cc.sys.os == cc.sys.OS_IOS){
				var ret = jsb.reflection.callStaticMethod("NativeOcClass","showLeaderboard");
				cc.log("ret val is "+ret);

			}
		}


	},activeSoundBtnClick: function (sender, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			var ls = cc.sys.localStorage;
			ls.setItem("soundDisable", "true");
			this.soundUpdate();
			if(g_useSound){
				var audioEngine = cc.AudioEngine.getInstance();
				//audioEngine.playEffect("res/jump.mp3");
			}
		}
	},nonActiveSoundBtnClick: function (sender, type) {
		if (type == ccui.Widget.TOUCH_ENDED) {
			var ls = cc.sys.localStorage;
			ls.setItem("soundDisable", "false");
			this.soundUpdate();
			if(g_useSound){
				var audioEngine = cc.AudioEngine.getInstance();
				//audioEngine.playEffect("res/jump.mp3");
			}
		}
	}
});

var GameMainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var audioEngine = cc.AudioEngine.getInstance();
		//audioEngine.preloadEffect("res/jump.mp3");
		var layer = new GameMainLayer();
		this.addChild(layer);
	}
});
