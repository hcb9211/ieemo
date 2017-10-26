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
            	var data = {
            		ansNo:api.pageParam.ansNo,
            		userNo:user.getuserNo(),
            	};
            	postAjax(ApiUrl.queryCoterieAnswerDetail,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							_self.bean = ret.data;
						}else{
							// alert(ret.retMsg);
						 return false;
						}
					} else {
		                return false;
					}
				},{progress:"1"});
    		},
    		//关注用户
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
							toast(ret.retMsg);
						 return false;
						}
					} else {
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			//取消用户关注
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
			//点赞
			pushed:function(type){
				var _self = this;
				// _self.bean.isPraise ="1";
				var data = {
					pushSrc:"2", //0，经验；1，问题；2，答案；3，评论
					pushType:type,//点赞
					srcNo:api.pageParam.ansNo,
					userNo:user.getuserNo()
				}
				postAjax(ApiUrl.saveCoteriePushed,data, function (ret, err) {
					$(".shq_jy_agree_or_no").addClass("display");
					if (ret) {
						if(ret.retCode=='0'){
							_self.bean.isPraise ="1";
							_self.bean.praisenum = _self.bean.praisenum + 1;
						}else{
							toast(ret.retMsg);
						 return false;
						}
					} else {
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			praisenumclick:function(){
				  $(".shq_jy_agree_or_no").removeClass("display");
			},
			//收藏
			saveCoterieCollect:function(){
				var _self = this;
				var data = {
					collectSrc:"2", //0.经验；1，问题；2，答案
					srcNo:api.pageParam.ansNo,
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
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			//取消收藏
			updateCoterieCollect:function(){
				var _self = this;
				var data = {
					collectSrc:"2", //0.经验；1，问题；2，答案
					srcNo:api.pageParam.ansNo,
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
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			//评论页面
			commentpage:function(bean){
				 var data = {
			        url:{
			            url:filepath.getPath(filepath.lifecircle.question.answercomment.frm),
			            name:"answercomment_frm",
			            title:"评论"
			        },
			        info:{
			        	ansNo:api.pageParam.ansNo
			        }
			    }
			    openWinFrame("answercomment_win", filepath.getPath(filepath.comm.headback.win),data);
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
    
    });
    vm.init();


  
}
    

