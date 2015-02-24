cc.game.onStart = function(){
	cc.view.adjustViewPort(true);
	cc.view.setDesignResolutionSize(450, 800, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
    //load resources
	if (cc.sys.isNative) {

		var searchPaths = jsb.fileUtils.getSearchPaths();
		searchPaths.push('script');
		searchPaths.push('src');
		var paths = [
		             'res',
		             'res/Default'		             ]; 
		for (var i = 0; i < paths.length; i++) {
			searchPaths.push(paths[i]);
		}
		jsb.fileUtils.setSearchPaths(searchPaths);
	}
	for (var i in res) {
		g_resources.push(res[i]);
	}
    cc.LoaderScene.preload(g_resources, function () {
    	cc.director.runScene(new GameMainScene());
    }, this);
};
cc.game.run();