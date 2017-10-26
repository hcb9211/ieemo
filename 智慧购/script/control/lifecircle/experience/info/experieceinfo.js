apiready = function(){ 
	var vm = new Vue({
		el: "#info",
		data:{
			bean:{

			},
			report:""
		},
		methods:{
			init:function(){
				var _self = this;
				var srcNo = api.pageParam.srcNo;
				var data = {
					exNo:srcNo,
					readUserNo:user.getuserNo()
				}
				postAjax(ApiUrl.queryCoterieExpDetail,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							_self.bean = ret.data;
						}else{
						 return false;
						}
					} else {
		                return false;
					}
				});
			},
			//点赞
			pushed:function(bean,e){
				var _self = this;
				// _self.bean.isPraise ="1";
				var data = {
					pushSrc:"0", //经验
					pushType:"0",//点赞
					srcNo:api.pageParam.srcNo,
					userNo:user.getuserNo()
				}
				postAjax(ApiUrl.saveCoteriePushed,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							_self.bean.isPraise ="1";
							_self.bean.praisenum = _self.bean.praisenum + 1;
						}else{
							toast(ret.retMsg);
							 return false;
						}
					} else {
						toast("点赞失败");
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			//收藏
			saveCoterieCollect:function(){
				var _self = this;
				var data = {
					collectSrc:"0", //0.经验；1，问题；2，答案
					srcNo:api.pageParam.srcNo,
					userNo:user.getuserNo()
				};
				postAjax(ApiUrl.saveCoterieCollect,data, function (ret, err) {

					if (ret) {
						if(ret.retCode == '0'){
							_self.bean.isCollect = '1';
							return false;
						}else{
							toast(ret.retMsg);
						 	return false;
						}
					} else {
						toast("收藏失败");
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			//取消收藏
			updateCoterieCollect:function(){
				var _self = this;
				var data = {
					collectSrc:"0", //0.经验；1，问题；2，答案
					srcNo:api.pageParam.srcNo,
					userNo:user.getuserNo()
				};
				postAjax(ApiUrl.updateCoterieCollect,data, function (ret, err) {
					
					if (ret) {
						if(ret.retCode == '0'){
							_self.bean.isCollect = '0';
							return false;
						}else{
							toast(ret.retMsg);
						 return false;
						}
					} else {
						toast("取消收藏失败");
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			//关注
			saveUserToFans:function(bean){
				var _self = this;
				var data = {
					userNo:bean.userNo,
					fansUserNo:user.getuserNo()
				}
				postAjax(ApiUrl.saveUserToFans,data, function (ret, err) {

					if (ret) {
						if(ret.retCode=='0'){
							//设置为关注
							_self.bean.isFans ="1";
						}else{
							alert(ret.retMsg);
						 return false;
						}
					} else {
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			updateUserToFans:function(bean){
				var _self = this;
				var data = {
					userNo:bean.userNo,
					fansUserNo:user.getuserNo()
				}
				postAjax(ApiUrl.updateUserToFans,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							//设置为关注
							_self.bean.isFans ="0";
						}else{
							toast(ret.retMsg);
						 return false;
						}
					} else {
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			//评论页面
			commentpage:function(bean){
				 var data = {
			        url:{
			            url:filepath.getPath(filepath.lifecircle.experience.comment.frm),
			            name:"experiececomment_frm",
			            title:"评论"
			        },
			        info:{
			        	srcNo:api.pageParam.srcNo
			        }
			    }
			    openWinFrame("experiececomment_win", filepath.getPath(filepath.comm.headback.win),data);
			},
			//举报页面
			reportPage:function(){
				$("#reportDiv").show();
			},
			//保存举报
			reportsave:function(){
				var _self = this;
				if("" == _self.report){
					toast("请输入举报内容")
					return false;
				}
				if(_self.report.length > 50){
					toast("举报内容最多50字");
					return false;
				}
				api.showProgress({
					style: 'default',
					animationType: 'fade',
					title: "举报中",
					text: '请稍候',
					modal: true
				});
				setTimeout(function(){
					api.hideProgress(); 
					toast("举报成功");
					$("#reportDiv").hide();
					_self.report = "";
				},1000);
			}
		}

	})
	 vm.init();

	// 分享
	api.addEventListener({
		name:'shareContent'
	},function (ret,err) {
		if(ret){
            var shq_jy_banimg = $('.shq_jy_banimg img').attr('src');
            var option = {
                title:'我的生活圈',
                description:'亿猫的生活圈原来是这样的精彩，长见识了',
                imgUrl:shq_jy_banimg
            }
            dialog.shares(option);
		}
    })

}


    