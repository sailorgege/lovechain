AddInfo = {
	init: function() {
		return AddInfo.initUI();
	},

	// 初始化动态UI
	initUI: function() {
		console.log("IN AddInfo::initUI...");
		
	},
};

window.onload=function(){
	AddInfo.init();
};
