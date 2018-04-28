pragma solidity ^0.4.18;

//import "./Ownable.sol";
//import "./ERC721.sol";

/// 为应用提供主合约逻辑，主要数据结构及方法
//contract LoveChain is Ownable, ERC721 {
contract LoveChain {

    /*** 数据 ***/
    
    // 人物的数据结构
	struct BodyInfo {
		string bodyID;				// 身份证号码、个人唯一ID
		uint16 bodyType;			// 患病类型
		string bodyName;			// 名字
		uint16 bodySec;				// 性别
		string birthDay;			// 生日
		string linkMain;			// 联系人
		string phone;				// 联系电话
		string bodyAddress;				// 联系地址
		string payment;				// 收款信息
		string recorder;			// 录入人
		string bodyDesc;			// 简介
	}
		
	// 保存所有人员信息
	BodyInfo[] bodyInfos;
	
	/*** 事件 ***/
	
	// 每当有新数据被添加时，就会触发该事件
	event AddBodyInfo(string bodyID);
	
	/*** 公有方法 ***/
	
	// 定义项目名称
	function name() public pure returns (string _name){
		return "LoveChain";
	}
	
	// 定义代币符号
	function symbol() public pure returns (string _symbol){
		return "LCC";
	}
	
	// 创建一条新的信息
	function createBody(string _bodyID, uint16 _bodyType, string _bodyName, uint16 _bodySec, string _birthDay, string _linkMain
						, string _phone, string _bodyAddress, string _payment, string _recorder, string _bodyDesc) public returns (uint256) {
		return _createBody(_bodyID, _bodyType, _bodyName, _bodySec, _birthDay, _linkMain, _phone, _bodyAddress, _payment, _recorder, _bodyDesc);
	}
	
	// 返回所有人员总数
	function getAllBodyCount() external view returns(uint256 bodyCount){
        bodyCount = bodyInfos.length;
    }
    
    // 获取指定人员的详细信息
	function getBodyInfo(uint256 _bodyIndex) external view returns (
													string _bodyID,
													uint16 _bodyType,
													string _bodyName,
													uint16 _bodySec,
													string _birthDay,
													string _linkMain,
													string _phone,
													string _bodyAddress) {
        BodyInfo storage bodyInfo = bodyInfos[_bodyIndex];
        _bodyID = bodyInfo.bodyID;
        _bodyType = bodyInfo.bodyType;
        _bodyName = bodyInfo.bodyName;
        _bodySec = bodyInfo.bodySec;
        _birthDay = bodyInfo.birthDay;
        _linkMain = bodyInfo.linkMain;
        _phone = bodyInfo.phone;
        _bodyAddress = bodyInfo.bodyAddress;
        
    }
	
	// 获取指定人员的详细信息
    	
	/*** 内部方法 ***/
	
	// 使用指定的属性，创建一条信息，并保存起来
	function _createBody(string _bodyID, uint16 _bodyType, string _bodyName, uint16 _bodySec, string _birthDay, string _linkMain
						, string _phone, string _bodyAddress, string _payment, string _recorder, string _bodyDesc) public returns (uint256) {
		BodyInfo memory _bodyInfo = BodyInfo({
            bodyID: _bodyID,
            bodyType: _bodyType,
            bodyName: _bodyName,
            bodySec: _bodySec,
            birthDay: _birthDay,
            linkMain: _linkMain,
            phone: _phone,
            bodyAddress: _bodyAddress,
            payment: _payment,
            recorder: _recorder,
            bodyDesc: _bodyDesc
        });
        uint256 newBodyId = bodyInfos.push(_bodyInfo);

        // 确保新id不过超过40多亿的上限（虽然可能性非常低）
        require(newBodyId == uint256(uint32(newBodyId)));

        // 触发添加新消息事件
        AddBodyInfo(_bodyID);

        return newBodyId;
    }
    
    /// 测试函数
    function SayHi() pure public returns (string) {
		return "Hi~ LoveChain!";
	}
	
	function SayHi2() pure public returns (string) {
		return "Hi~2 My LoveChain!";
	}
}
