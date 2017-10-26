apiready = function(){
	var condition = api.pageParam.condition;
	vm.init(condition);
	
	//搜索
	$(".addfriend_cx").click(function(){
		var UISearchBar = api.require('UISearchBar');
	    UISearchBar.open({
	        placeholder: '用户名/手机号码',
	        historyCount: 10,
	        showRecordBtn: false,
	        dataBase:"friend_add_index",
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
	            var data = {
	                info:{condition:condition},
	                url:{
	                    url: api.wgtRootDir+"/html/dynamic/friend_add_search.html",
	                    name:"添加好友搜索结果",
	                    title:"添加好友搜索结果"
	                }
	            }
	            openWinFrame("friend_add_search", api.wgtRootDir+"/html/comm/head_back.html",data);
	        }
	       });
	});
}

var vm = new Vue({
	el: ".main_dynamic",
	data:{
		list:[],
	},
	methods:{
		init:function(condition){
			var _self = this;
			        	
        	//查询我的数据
        	var data = {
				userNo :user.getuserNo(),
				condition: condition

			};
			
			postAjax(ApiUrl.queryFriendsByCondition,data, function (ret, err) {
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					  	_self.list = ret.data;
					  }
				}else{
				 return false;
				}
			} else {
				
                return false;
			}
		},{islogin:"1",progress:"1"});
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
						   	api.alert({
						   	    title: '消息',
						   	    msg: '已发送好友申请',
						   	}, function(ret, err) {
						   	    api.closeWin()
						   	});
						}else{
							// openDialog('0',ret.retMsg);
						 	 toast(ret.retMsg);
						 return false;
						}
					} else {
						 toast("添加好友失败");
		                return false;
					}
			});
       }
	}
})