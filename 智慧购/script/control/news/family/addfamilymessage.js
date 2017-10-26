apiready = function(){
    var vm = new Vue({
    	el: "#info",
    	data:{
           list:[],
           remarks1:"",
           remarkfalg:false,
           bean:{}
    	},
    	methods:{
    		init:function(){
    			var _self = this;
				var data = {
					userNo:user.getuserNo()
				}
				// alert(ApiUrl.queryAllRequest)
				postAjax(ApiUrl.queryAllRequest,data, function (ret, err) {
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
				},{progress:"1",islogin:"1"}); 
    		},
    		agree:function(bean){
    			
    			var _self = this;
    			_self.remarks1 = "";
    			_self.remarkfalg = true;
    			_self.bean = bean;

    		},
    		sure:function(){
    			var _self = this;
    			if( "" == _self.remarks){
    					toast("备注不允许为空")
    					return false;
    			}
				var data = {
					remarks:_self.remarks1,//当前用户设置的称呼	
					remarks1:_self.bean.remarks,//传递过来的称呼	
					userNo:_self.bean.familyUserNo,
					familyUserNo:user.getuserNo(),
					status:"1" //必填,(1-同意 2-拒绝)
				}
				// alert(JSON.stringify(data))
				postAjax(ApiUrl.addMemberOfTheFamily,data, function (ret, err) {
					if (ret) {	
						if(ret.retCode=='0'){
							_self.bean.status = '1';
							_self.remarks1 = "";
    							_self.remarkfalg = false;
							//发送监听
							api.sendEvent({
							    name: 'addfamilymessagecount',
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
				},{progress:"1",islogin:"1"}); 
    		},
    		back:function(){
    			var _self = this;
    			_self.remarks1 = "";
    			_self.remarkfalg = false;
    		}	
    	}
    
    });
    vm.init();
}
    