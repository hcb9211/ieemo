apiready = function(){
	vm.init();
	
	//添加好友
	$(".mine_friend_top").click(function(){
		var data = {
                url:{
                    url: api.wgtRootDir+"/html/dynamic/friend_add.html",//frm地址
                    name:"friend_add",//frm的名字
                    title:"添加好友"//窗口的title
                }
            }

            openWinFrame("head_back", api.wgtRootDir+"/html/comm/head_back.html",data);
	});
}

var vm = new Vue({
	el: ".main_dynamic",
	data:{
		list:[]
	},
	methods:{
		init:function(){
			var _self = this;
			//查询数据
        	var data = {
				userNo :user.getuserNo()
			};
			
			postAjax(ApiUrl.queryFriends,data, function (ret, err) {
//					alert(JSON.stringify(ret));
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
		showFriendInfo:function(friendUserNo){
			var data = {
                info:{friendUserNo:friendUserNo},
                islogin:"1"
            }

            openWinFrame("friend_dynamic_info_frm", api.wgtRootDir+"/html/dynamic/friend_dynamic_info.html",data);
		}
	}
})