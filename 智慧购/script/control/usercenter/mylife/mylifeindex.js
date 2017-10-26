var simplification = new Vue({
	el:"#simplification",
	data:{
		userNo:user.getuserNo(),
		simplificationList:[]
	},
	methods:{
		init:function(){
			var self=this;
			var Updata={userNo:self.userNo};
			postAjax(ApiUrl.queryMyCoterie,Updata,function(ret,err){
				if (ret) {
					self.simplificationList = ret.data;
				}
			},{progress:'1'})
		},
		pagejumps:function(skip,head){
			var data = {
		        url:{
		            url: api.wgtRootDir+"/html/usercenter/mylife/mylifecontent/"+skip+".html",
		            name:"order",
		            title:head
		        },
		        //判断是否登录·需要就写1 
		        islogin : '1',
		        info:{},
		   }
		    openWinFrame(skip, api.wgtRootDir+"/html/comm/head_back.html",data);
		}
	}
});
apiready = function(){
	simplification.init();
}
