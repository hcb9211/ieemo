apiready = function(){
	vm.init();
	
	//搜索
	$(".addfriend_sousuo").click(function(){
		var UISearchBar = api.require('UISearchBar');
	    UISearchBar.open({
	        placeholder: '姓名/昵称',
	        historyCount: 10,
	        showRecordBtn: false,
	        dataBase:"mobile_search_index",
	        texts: {
	            cancelText: '取消',
	            clearText: '清除搜索记录'
	        },
	        styles: {
	            navBar: {
	                bgColor: '#d0302f',
	                borderColor: '#000'
	            },
	            searchBox: {
	                bgImg: '',
	                color: '#000',
	                height: 44
	            },
	            cancel: {
	                bg: 'rgba(0,0,0,0)',
	                color: '#fff',
	                size: 16
	            },
	            list: {
	                color: '#696969',
	                bgColor: '#FFFFFF',
	                borderColor: '#eee',
	                size: 16
	            },
	            clear: {
	                color: '#000000',
	                borderColor: '#ccc',
	                size: 16
	            }
	        }
	    }, function(ret, err) {
	        if (ret) {
	            var condition = ret.text;
	            vm.condition = condition;
	        }
	       });
	});
}

var vm = new Vue({
	el: ".main_dynamic",
	data:{
		mobilelist:[],
		mobileStr:"",
		mylist:{},
		list:[],
		condition:""
	},
	methods:{
		init:function(){
			var _self = this;
			var contacts = api.require('contacts');
			contacts.queryByPage({
			    pageIndex: 0
			}, function(ret, err) {
			    if (ret) {
			        if(ret.status){
			        	var mobileStr = "";
			        	//获取成功
			        	for(var j = 0; j < ret.contacts.length; j++){
			        		var bean = ret.contacts[j];
			        		
			        		var phoneArr = bean.phones;
			        		if(!phoneArr){
			        			continue;
			        		}
			        		for(var i = 0; i < phoneArr.length; i++){
			        			for(var k in phoneArr[i]){
			        				var obj = {
				        				name:bean.fullName,
				        				phone:phoneArr[i][k].replace("+86", "").replace(/-/g, "")
//										phone:phoneArr[i][k]
				        			};
				        			
				        			mobileStr += ";" + obj.phone;
			        				_self.mobilelist.push(obj);
			        			}
			        		}
			        	}
			        	
			        	if(mobileStr.length > 0)
			        	{
			        		_self.mobileStr = mobileStr.substring(1);
			        	}
			        	
			        	
			        	//查询我的数据
			        	var data = {
							userNo :user.getuserNo(),
							mobiles: _self.mobileStr
			
						};
						
						postAjax(ApiUrl.queryFriendsByMobile,data, function (ret, err) {
							
							if (ret) {
								if(ret.retCode=='0'){
								  if(ret.data){
								  	_self.mylist = ret.data;
								  }
								 
								 //匹配
								 for(var i = 0; i < _self.mobilelist.length; i++){
									var bean = _self.mobilelist[i];
							
									var obj = {
										isInvite:"",
										realName:bean.name,
										nickname:bean.phone,
										headPortrait:"",
										mobile:bean.phone
									};
									
									if(_self.mylist[bean.phone].length == 0){
										obj.isInvite = "0";
										_self.list.push(obj);
									}else {
										for(var k = 0; k < _self.mylist[bean.phone].length; k++){
											var temp = _self.mylist[bean.phone][k];
											obj.userNo = temp.userNo;
											obj.headPortrait = temp.headPortrait;
											obj.nickname = temp.nickname;
											obj.mobile = temp.mobile;
											obj.isFriend = temp.isFriend;
											_self.list.push(obj);
										}
									}
								}
							}else{
							 return false;
							}
						} else {
							
			                return false;
						}
					},{islogin:"1",progress:"1"});
			       }
			       
			    } else {
			        alert(JSON.stringify(err));
			        
			        return false;
			    }
			});
		},
		addFriends:function(friendUserNo){
			var _self = this;
			
			api.showProgress({
				style: 'default',
				animationType: 'fade',
				title: '添加好友中',
				text: '请稍候',
				modal: true
			});
			
        	//查询我的数据
        	var data = {
				userNo :user.getuserNo(),
				friendUserNo: friendUserNo
			};
			
			postAjax(ApiUrl.addFriendsInvite,data, function (ret, err) {
				api.hideProgress();	
				var dialog = new auiDialog({});
				
				if (ret) {
						if(ret.retCode=='0'){
						   toast("已发送好友申请");
						   return false;
						}else{
							toast(ret.retMsg);
						 return false;
						}
					} else {
						toast("添加好友失败");
		                return false;
					}
			});
       },
		invite:function(friendMobile){
			var _self = this;
			
			api.showProgress({
				style: 'default',
				animationType: 'fade',
				title: '邀请中',
				text: '请稍候',
				modal: true
			});
			
        	//查询我的数据
        	var data = {
				userNo :user.getuserNo(),
				friendMobile: friendMobile
			};

			postAjax(ApiUrl.smsInviteForFriends,data, function (ret, err) {
			//alert(JSON.stringify(err));
				api.hideProgress();	
				var dialog = new auiDialog({});
				
				if (ret) {
						if(ret.retCode=='0'){
						  toast("邀请成功");
						}else{
							toast(ret.retMsg);
						 	return false;
						}
					} else {
						toast("邀请失败");
		                return false;
					}
			});
       },
       search:function(bean){
       	if( "" != this.condition){
	       	if( (bean.realName && bean.realName != '' && -1 != bean.realName.indexOf(this.condition)) ||
	       		(bean.nickname && bean.nickname != '' && -1 != bean.nickname.indexOf(this.condition))
	       	 ){
//	       	 alert(JSON.stringify(bean));
	       		return true;
	       	}else {
	       		return false;
	       	}
       	}else{
       		//bean.nickname = bean.nickname;
       		return true;
       	}
       }
	}
})