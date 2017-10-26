apiready = function(){
	vm.init();
}

var vm = new Vue({
	el: ".main_dynamic",
	data:{
		list:[],
		pageNo:1
	},
	methods:{
		init:function(){
			var _self = this;
			var bMap = api.require('bMap');
			bMap.getLocation({
			    accuracy: '100m',
			    filter: 1,
			    autoStop: true
			}, function(rret, err){
				if(rret.status)
				{
					//定位成功
					//查询数据
		        	var data = {
						userNo :user.getuserNo(),
						pageNo: _self.pageNo, //第几页 
						pageSize:10, //分页条数
						lat1:rret.lat.toFixed(2),
						lng1:rret.lon.toFixed(2)
					};
					postAjax(ApiUrl.queryNearFriends,data, function (ret, err) {
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
				}else
				{
					toast(err.msg);
				}
			});    
		},
		next:function(){
			this.pageNo = this.pageNo + 1;
			this.init();
		},
		addFriends:function(friendUserNo,e){
			e.stopPropagation() 
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
        showFriendInfo:function(friendUserNo){
            var data = {
                info:{friendUserNo:friendUserNo},
                islogin:"1"
            }

            openWinFrame("friend_dynamic_info_frm", api.wgtRootDir+"/html/dynamic/friend_dynamic_info.html",data);
        }
	}
})

$(window).scroll(function () {
	    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
	    		vm.next();
	    }
	});