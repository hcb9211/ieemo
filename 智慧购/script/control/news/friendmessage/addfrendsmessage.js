apiready = function(){
    var vm = new Vue({
    	el: "#info",
    	data:{
           list:[],
    	},
    	methods:{
    		init:function(){
    			var _self = this;
				var data = {
					userNo:user.getuserNo()
				}
				postAjax(ApiUrl.queryFriendsRequest,data, function (ret, err) {
				
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
				},{progress:"1"}); 
    		},
    		agree:function(bean){
    			
    			var _self = this;
				var data = {
					friendUserNo:bean.friendUserNo,
					userNo:user.getuserNo(),
					status:"2" //必填,(2-同意或1-拒绝)
				}
				postAjax(ApiUrl.addFriends,data, function (ret, err) {
					if (ret) {	
						if(ret.retCode=='0'){
							bean.status = '2';
							//发送监听
							api.sendEvent({
							    name: 'addfriendmessagecount',
							    extra: {
							        count: 1,
							    }
							});
							
						}else{
							toast(ret.retMsg);
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
}
    