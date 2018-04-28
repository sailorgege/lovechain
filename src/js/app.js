App = {
	web3Provider: null,
	bodyList: [],
	contracts: {},
	
	init: function() {
		App.bodyList = [];
		return App.initWeb3();
	},
	
	initWeb3: function() {
		// Is there an injected web3 instance?
		if (typeof web3 !== 'undefined') {
			console.log('web3 已经注入！');
			App.web3Provider = web3.currentProvider;
		} else {
			console.log('web3 被重新实例化！');
			// If no injected web3 instance is detected, fall back to Ganache
			App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
		}
		web3 = new Web3(App.web3Provider);
		
		return App.initContract();
	},
	
	initContract: function() {
		// 加载LoveChain.json，保存了LoveChain的ABI（接口说明）信息及部署后的网络(地址)信息，它在编译合约的时候生成ABI，在部署的时候追加网络信息
		$.getJSON('LoveChain.json', function(data) {
			// 用LoveChain.json数据创建一个可交互的TruffleContract合约实例。
			var LoveChainArtifact = data;
			App.contracts.LoveChain = TruffleContract(LoveChainArtifact);
			
			// Set the provider for our contract
			App.contracts.LoveChain.setProvider(App.web3Provider);
			
			// Use our contract
			return App.markLoveChain();
		});
		return App.bindEvents();
	},
	
	bindEvents: function() {
		//$(document).on('click', '.btn-test1', App.handleTest1);
	},
	
	markLoveChain: function(data, account) {
		var param = window.location.search.substr(1);
		console.log('markLoveChain::param=' + param);
		if(param){
			return App.getBodyDetailPage(param);
		}
		
		var appInstance;
		
		App.contracts.LoveChain.deployed().then(function(instance) {
			appInstance = instance;
			
			// 调用合约的SayHi(), 用call读取信息不用消耗gas
			//return appInstance.SayHi.call();
			return appInstance.getAllBodyCount.call();
			
		}).then(function(total) {
			console.log('人物总数：' + total);
			App.updateListData(total);
			
		}).catch(function(err) {
			console.log('合约部署异常！' + err.message);
		});
	},
	
	updateListData: function(total) {
		console.log('updateListData::更新列表数据...total=' + total);
		
		AppMain.cleanBox();
		
		App.bodyList = [];
		for(var i = 0; i < total; i ++){
			App.getBodyDetailItem(i);
		}
	},
	
	// 获取个人详情
	getBodyDetailItem: function(i) {
		console.log('getBodyDetailItem::获取个人详情...i=' + i);
		var contractInstance;
		
		App.contracts.LoveChain.deployed().then(function(instance) {
			contractInstance = instance;
			
			return contractInstance.getBodyInfo(i);
		
		}).then(function(result) {
			console.log('getBodyDetailItem::' + result);
			
			var bodyObj = {};
			bodyObj.bodyID = result[0];
			bodyObj.bodyType = result[1];
			bodyObj.bodyName = result[2];
			bodyObj.bodySec = result[3];
			bodyObj.birthDay = result[4];
			bodyObj.linkMain = result[5];
			bodyObj.phone = result[6];
			bodyObj.bodyAddress = result[7];
			App.bodyList.push(bodyObj);
			
			console.log('bodyID:' + bodyObj.bodyID + ', bodyType:' + bodyObj.bodyType + ', bodyName:' + bodyObj.bodyName + ', bodyAddress:' + bodyObj.bodyAddress);
			
			App.updateBodyDetailItem(i, bodyObj);
			
		}).catch(function(err) {
			console.log('合约调用异常！' + err.message);
		});
	},
	
	updateBodyDetailItem: function(i, bodyObj) {
		console.log('updateBodyDetailItem::i:' + i + ', bodyID:' + bodyObj.bodyID + ', bodyType:' + bodyObj.bodyType + ', bodyName:' + bodyObj.bodyName + ', bodyAddress:' + bodyObj.bodyAddress);
		
		var controlbar = document.getElementById("right-box");
		
		var subelestr = '';
		subelestr += '<div id="right-item-box-' + i + '" class="right-item-box" onclick="App.onClickBtnRightItem(' + i + ');">';
		subelestr += '<div class="right-item-image-box">';
		subelestr += '<img src="images/body-image/';
		subelestr += bodyObj.bodySec==0 ? 'body-image-00.jpg' : 'body-image-01.jpg';
		subelestr += '" width="150" height="150">';
		subelestr += '</div>';
		subelestr += '<div class="right-item-text-box">';
		subelestr += '<span class="right-item-title">' + bodyObj.bodyName + '</span>';
		subelestr += '<span class="right-item-text">';
		subelestr += bodyObj.bodySec==0 ? '女宝' : '男宝';
		if(bodyObj.bodyType == 1){
			subelestr += '， 瓷娃娃病';
		}else if(bodyObj.bodyType == 2){
			subelestr += '， 月亮孩子病';
		}else if(bodyObj.bodyType == 3){
			subelestr += '， 黏宝宝病';
		}else if(bodyObj.bodyType == 4){
			subelestr += '， 玻璃人病';
		}else if(bodyObj.bodyType == 5){
			subelestr += '， 蝴蝶结病';
		}else{
			subelestr += '， 未知病种';
		}
		subelestr += '</span>';
		subelestr += '</div>';
		subelestr += '</div>';
		
		var rowdiv = document.createElement('div');
		rowdiv.innerHTML = subelestr;
		
		controlbar.append(rowdiv);
	},
	
	getBodyDetailPage: function(i) {
		console.log('getBodyDetailPage::获取个人详情...i=' + i);
		var contractInstance;
		
		App.contracts.LoveChain.deployed().then(function(instance) {
			contractInstance = instance;
			
			return contractInstance.getBodyInfo(i);
		
		}).then(function(result) {
			console.log('getBodyDetailPage::' + result);
			
			var bodyObj = {};
			bodyObj.bodyID = result[0];
			bodyObj.bodyType = result[1];
			bodyObj.bodyName = result[2];
			bodyObj.bodySec = result[3];
			bodyObj.birthDay = result[4];
			bodyObj.linkMain = result[5];
			bodyObj.phone = result[6];
			bodyObj.bodyAddress = result[7];
			App.bodyList.push(bodyObj);
			
			console.log('bodyID:' + bodyObj.bodyID + ', bodyType:' + bodyObj.bodyType + ', bodyName:' + bodyObj.bodyName + ', bodyAddress:' + bodyObj.bodyAddress);
			
			App.updateBodyDetailPage(i, bodyObj);
			
		}).catch(function(err) {
			console.log('合约调用异常！' + err.message);
		});
	},
	
	updateBodyDetailPage: function(i, bodyObj) {
		console.log('updateBodyDetailPage::i:' + i + ', bodyID:' + bodyObj.bodyID + ', bodyType:' + bodyObj.bodyType + ', bodyName:' + bodyObj.bodyName + ', bodyAddress:' + bodyObj.bodyAddress);
		
		var detailinfo_image = document.getElementById("detailinfo-image");
		var detailinfo_title = document.getElementById("detailinfo-title");
		var detailinfo_text_name = document.getElementById("detailinfo-text-name");
		var detailinfo_text_id = document.getElementById("detailinfo-text-id");
		var detailinfo_text_address = document.getElementById("detailinfo-text-address");
		var detailinfo_text_phone = document.getElementById("detailinfo-text-phone");
		var detailinfo_text_linkMain = document.getElementById("detailinfo-text-linkMain");
		
		detailinfo_image.src = bodyObj.bodySec==0 ? './images/body-image/body-image-00.jpg' : './images/body-image/body-image-01.jpg';
		detailinfo_title.innerText = bodyObj.bodyName;
		
		var textstr = '';
		textstr += '';
		textstr += '';
		textstr += '';
		textstr += bodyObj.bodySec==0 ? '女宝' : '男宝';
		if(bodyObj.bodyType == 1){
			textstr += '， 瓷娃娃病';
		}else if(bodyObj.bodyType == 2){
			textstr += '， 月亮孩子病';
		}else if(bodyObj.bodyType == 3){
			textstr += '， 黏宝宝病';
		}else if(bodyObj.bodyType == 4){
			textstr += '， 玻璃人病';
		}else if(bodyObj.bodyType == 5){
			textstr += '， 蝴蝶结病';
		}else{
			textstr += '， 未知病种';
		}
		detailinfo_text_name.innerText = textstr;
		detailinfo_text_id.innerText = '身份证号码：' + bodyObj.bodyID;
		detailinfo_text_address.innerText = '联系地址：' + bodyObj.bodyAddress;
		detailinfo_text_phone.innerText = '电话：' + bodyObj.phone;
		detailinfo_text_linkMain.innerText = '联系人：' + bodyObj.linkMain;
	},
	
	onClickBtnAddInfo: function() {
		console.log("IN AddInfo::onClickBtnAddInfo...");
		var myform = document.getElementById('myform');		//document.getElementById('myform').submit();
		var input_type = document.getElementById('input-type');
		var input_name = document.getElementById('input-name');
		var input_id = document.getElementById('input-id');
		var input_sex = document.getElementById('input-sex');
		var input_birth = document.getElementById('input-birth');
		var input_linkman = document.getElementById('input-linkman');
		var input_phone = document.getElementById('input-phone');
		var input_address = document.getElementById('input-address');
		var input_payment = document.getElementById('input-payment');
		var input_recorder = document.getElementById('input-recorder');
		var input_desc = document.getElementById('input-desc');
		
		console.log(myform);
		console.log("input_type:" + input_type.value);
		console.log("input_name:" + input_name.value);
		console.log("input_id:" + input_id.value);
		console.log("input_sex:" + input_sex.value);
		console.log("input_birth:" + input_birth.value);
		console.log("input_linkman:" + input_linkman.value);
		console.log("input_phone:" + input_phone.value);
		console.log("input_address:" + input_address.value);
		console.log("input_payment:" + input_payment.value);
		console.log("input_recorder:" + input_recorder.value);
		console.log("input_desc:" + input_desc.value);
		
/*
		var input_file = document.getElementById("input-image");
		var files = input_file.files;
		for(var i = 0; i < files.length; i ++){
			var file = files[i];
			console.log(file.name);
		}
*/
		
/*
		var fd = new FormData();
		for(var i = 0; i < files.length; i ++){
			var reader = new FileReader();
			reader.readAsDataURL(files[i]);
			fd.append(i, files[i]);
			console.log(fd);
			console.log(reader);
			//console.log(window.URL.createObjectURL(files[i]));
			console.log(files[i].getAsDataURL());
		}
*/
		
/*
		for(var i = 0; i < files.length; i ++){
			if (!input_file['value'].match(/.jpg|.gif|.png|.bmp/i)){　　//判断上传文件格式
				return console.log("上传的图片格式不正确，请重新选择")　　　　　　　　　
			}
			var reader = new FileReader();
			reader.readAsDataURL(files[i]);
			reader.onload = function(e){　　　　　　　　
				console.log("==>" + this.result);
			}
		}
*/
		console.log('onClickBtnAddInfo::准备添加新信息...');
		
		// 获取用户账号
		web3.eth.getAccounts(function(error, accounts) {
			if (error) {
				console.log('获取eth账户错误！err:' + error);
			}
			
			if(accounts.length == 0){
				console.log('eth账户列表为空！');
			}else{
				var account = accounts[0];
				console.log('默认eth账户：' + account);
			}
			
			App.contracts.LoveChain.deployed().then(function(instance) {
				contractInstance = instance;
				return contractInstance.createBody(input_id.value.toString(), Number(input_type.value), input_name.value.toString(), Number(input_sex.value), 
														input_birth.value.toString(), input_linkman.value.toString(), input_phone.value.toString(), 
														input_address.value.toString(), input_payment.value.toString(), input_recorder.value.toString(), input_desc.toString());
			
			}).then(function(result) {
				console.log(result);
			
			}).catch(function(err) {
				console.log('合约调用异常！' + err.message);
			});
		});
   
	},
	
	onClickBtnItem: function(t) {
		console.log("IN AddInfo::onClickBtnItem...t=" + t);
		
	},
	
	onClickBtnRightItem: function(i) {
		console.log("IN AddInfo::onClickBtnRightItem...i=" + i);
		window.location.href="bodydetail.html?" + i;
	}

};

$(function() {
	$(window).load(function() {
		App.init();
	});
});
