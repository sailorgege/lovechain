AppMain = {
	init: function() {
		return AppMain.initUI();
	},

	// 初始化动态UI
	initUI: function() {
		console.log("IN initUI...");
		//window.location.href="addinfo.html";
		//window.location.href="bodydetail.html?1";
		
		//AppMain.cleanBox();
		
	},
	
	cleanBox: function() {
		console.log("IN cleanBox...");
		
		var controlbar = document.getElementById("right-box");
		var count = controlbar.getElementsByTagName("div").length;
		console.log("sub div count:" + count);

		for(var i = 0; i < 5; i ++){
			var elerow = "right-item-box-" + i;
			var removeObj = document.getElementById(elerow);
			if(removeObj && removeObj.parentNode){
				removeObj.parentNode.removeChild(removeObj);
				console.log("remove " + elerow);
			}
		}
	},
	
	onClickBtnAddInfo: function() {
		console.log("IN onClickBtnAddInfo...");
		window.location.href="addinfo.html";
	},
};

window.onload=function(){
	AppMain.init();
};
