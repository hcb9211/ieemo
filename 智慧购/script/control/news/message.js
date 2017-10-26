//用户ID
//var userNo = localStorage.getItem("userNo");
//
//var messahe = new Vue({
//	el
//});
//亿猫大喇叭页面跳转
function registerView(){
	var data = {
	    url:{
	    	url: api.wgtRootDir+"/html/news/broadcast.html",
	    	name:"register",
	    	title:"亿猫大喇叭"
	    }
	}
	openWinFrame("register_head", api.wgtRootDir+"/html/comm/head_back.html",data);
}
//系统消息跳转页面
function winmsd(){
	var data = {
	    url:{
	    	url: api.wgtRootDir+"/html/news/winmsd.html",
	    	name:"winmsd",
	    	title:"系统消息"
	    }
	}
	openWinFrame("winmsd_head", api.wgtRootDir+"/html/comm/head_back.html",data);
}

function friendsmessagepage(){
	var data = {
	    url:{
	    	url: api.wgtRootDir+"/html/news/friendmessage/addfriendsmessage.html",
	    	name:"addfrendsmessage_frm",
	    	title:"好友申请信息"
	    },
	    islogin:"1"
	}
	openWinFrame("addfrendsmessage_win", api.wgtRootDir+"/html/comm/head_back.html",data);
}
/**
 * 进入添加家庭成员申请列表
 * @return {[type]} [description]
 */
function familymessagepage(){
	var data = {
	    url:{
	    	url: api.wgtRootDir+"/html/news/family/addfamilymessage.html",
	    	name:"addfamilymessage_frm",
	    	title:"家庭成员申请信息"
	    },
	    islogin:"1"
	}
	openWinFrame("addfamilymessage_win", api.wgtRootDir+"/html/comm/head_back.html",data);
}
    
apiready = function(){
	var vm = new Vue({
		el: "#info",
		data:{
	      count:0,
	      familyRequestCount:0
		},
		methods:{
			init:function(){
				var _self = this;
				if(!user.islogin()){
					return false;
				}
				var data = {
					userNo:user.getuserNo()
				}
				postAjax(ApiUrl.queryUnHandleRequestCount,data, function (ret, err) {
					if (ret) {	
						if(ret.retCode=='0'){
							_self.count = ret.data;
							_self.familyRequestCount = ret.familyRequestCount;
						}else{
						 return false;
						}
					} else {
		                return false;
					}
				},{progress:"1"}); 
			}
		}

	});
	vm.init();

	api.addEventListener({
	    name: 'addfriendmessagecount'
	}, function(ret, err) {
		// alert(JSON.stringify(ret))
		
		vm.count = vm.count -1;
	    // if (ret) {
	    //     alert(JSON.stringify(ret));
	    // } else {
	    //     alert(JSON.stringify(err));
	    // }
	});

	//添加家庭成员消息事件坚挺
	api.addEventListener({
	    name: 'addfamilymessagecount'
	}, function(ret, err) {
		// alert(JSON.stringify(ret))
		
		vm.familyRequestCount = vm.familyRequestCount -1;
	    // if (ret) {
	    //     alert(JSON.stringify(ret));
	    // } else {
	    //     alert(JSON.stringify(err));
	    // }
	});
}


    

