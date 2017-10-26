var vue = new Vue({
	el:"#watchingme",
	data:{
		userNo:user.getuserNo(),
		pageNo:1,
		list:[]
	},
	methods:{
		init:function(){
			var self = this;
			var updata = {pageNo:self.pageNo,pageSize:"10",userNo:self.userNo}
			postAjax(ApiUrl.queryFansToUserFocusPage,updata,function(ret,err){
				if (ret) {
					if (ret.data) {
						for (var i=0;i<ret.data.length;i++) {
							self.list.push(ret.data[i]);
						}
					}
				}
			},{progress:'1'})
		},
		attention:function(bean){
			var self = this;
			var updata = {fansUserNo:self.userNo,userNo:bean.userNo}
			postAjax(ApiUrl.saveUserToFans,updata,function(ret,err){
				if (ret) {
					if (ret.data == "关注成功" ) {
						toast("关注成功！");
						bean.isFans = 1;
					}
				}
			},{islogin:"1"})
		},
		cancel:function(bean){
			var self =this;
			var updata = {fansUserNo:self.userNo,userNo:bean.userNo}
			dialog.alert({text:"是否取消关注！"},function(){
				postAjax(ApiUrl.updateUserToFans,updata,function(ret,err){
					if (ret) {
						if (ret.data == "取消关注成功") {
							toast({text:ret.data});
							bean.isFans = 0;
						}
					}
				},{islogin:"1"})	
			})
				
		}
	}
})
apiready = function(){
	vue.init();
	api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		vue.pageNo = 1;
		vue.list = [];
        vue.init();
        setTimeout("api.refreshHeaderLoadDone()",'1000');
	});
	$(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            vue.pageNo += 1;
			vue.init();
        }
    });
}
