AddDetailInfo = {
	init: function() {
		return AddDetailInfo.initUI();
	},

	// 初始化动态UI
	initUI: function() {
		console.log("IN AddDetailInfo::initUI...");
	}
};

window.onload=function(){
	AddDetailInfo.init();
};
