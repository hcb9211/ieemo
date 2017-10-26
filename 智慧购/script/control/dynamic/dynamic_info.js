apiready = function(){
   var dynamicNo = api.pageParam.dynamicNo;
   vm.init(dynamicNo);
   
   api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		if(ret){
		//清空原来的数据
			vm.pageNolist = [1,1,1];
			vm.list = [];
			vm.mylist = [];
			vm.nearbylist = [];
           vm.init();
           setTimeout("api.refreshHeaderLoadDone()",'1000');
          
		}

	});
}


//好友动态加载
var vm = new Vue({
	el: ".dynamic_con",
	data:{
		rspBean:{},
		bean:{
			createBy:user.getuserNo(),
			dynamicNo:"",
			content:"",
			parentCommentNo:"",
			targetUserNo:"",
			targetName:""
		}
	},
	methods:{
		init: function(dynamicNo){
			var _self = this;
			
			var data = {
				userNo :user.getuserNo(),
				dynamicNo: dynamicNo
			};
			
			postAjax(ApiUrl.queryDynamicDetail,data, function (ret, err) {
				
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					   _self.rspBean = changeBean(ret.data.dynamicDetail);
					  }
					 
					}else{
						// openDialog('0',ret.retMsg);
					 return false;
					}
				} else {
					
	                return false;
				}
			},{progress:"1"});

		},
		showcomment:function(bean, type, pl){
			//显示评论弹框
			this.bean.content = "";
			$("#comDiv").show();
			if("2" == type){
				this.bean.parentCommentNo = pl.commentNo;
				this.bean.targetUserNo = pl.createBy;
				this.bean.targetName = pl.createName;
			}else{
				this.bean.parentCommentNo = "";
				this.bean.targetUserNo = "";
				this.bean.targetName = "";
			}
			
			this.bean.dynamicNo = bean.dynamicNo;
			this.currentbean = bean; //设置当前点击对象
		}, 
		imgclick:function(bean,index){
			
		
			var imageBrowser = api.require('imageBrowser');
			imageBrowser.openImages({
			    imageUrls:bean.imageArr,
			    tapClose:true,
			    showList:false,
			    activeIndex:index,
			    tapClose:false

			});

		},
		comment:function(){
			var _self = this;
			if("" == _self.bean.content || null == _self.bean.content){
				toast("请输入评论内容");
				return false;
			}else if(_self.bean.content.length > 20){
				toast("评论内容最多20字");
				return false;
			}else {
				api.showProgress({
					style: 'default',
					animationType: 'fade',
					title: "评论中",
					text: '请稍候',
					modal: true
				});
				
				var data = {
					comment:JSON.stringify(this.bean)
				};
				//评论
				postAjax(ApiUrl.commentDynamic,data, function (ret, err) {
						api.hideProgress();	
						
						var dialog = new auiDialog({});
						if (ret) {
							if(ret.retCode=='0'){
							   
				   				var obj = {
				   					commentNo:ret.data,
						            content:_self.bean.content,
						            createBy:_self.bean.createBy,
						            createDate:"",
						            dynamicNo:_self.bean.dynamicNo,
						            targetUserNo:_self.bean.targetUserNo,
						            createName:user.getnickName(),
						            targetName:_self.bean.targetName
				   				};
				   				_self.rspBean.dynamicCommentList.push(obj);
							   	$("#comDiv").hide();
							   	toast("评论成功");
							}else{
								// openDialog('0',ret.retMsg);
							 alert(ret.retMsg)
							 return false;
							}
						} else {
							alert("评论失败")
			                return false;
						}
					});
			}
		},
		likes:function(bean){
			var _self = this;
			var ttype = bean.isPushed;
	   		//标题
	   		var title = "";
	   		if("0" == ttype)
	   		{
	   			//点赞
	   			title = "点赞";
	   		}else
	   		{
	   			title = "取消点赞";
	   		}
	   		
	   		api.showProgress({
				style: 'default',
				animationType: 'fade',
				title: title +"中",
				text: '请稍候',
				modal: true
			});
			
			var data = {
				createBy: user.getuserNo(),
				dynamicNo:bean.dynamicNo
			}
			
			postAjax(ApiUrl.pushedDynamic,data, function (ret, err) {
						api.hideProgress();	
						
						var dialog = new auiDialog({});
						if (ret) {
							if(ret.retCode=='0'){
						   		var nickName = user.getnickName();
						   		if("0" == ttype && !bean.pusher){
						   			bean.pusher = nickName;
								   	bean.isPushed = "1";
						   		}else if("0" == ttype){
						   			bean.pusher += "、" + nickName;
								   	bean.isPushed = "1";
						   		}else{
						   			bean.pusher = bean.pusher.replace("、"+nickName+"、", "、");
						   			bean.pusher = bean.pusher.replace("、"+nickName, "");
						   			bean.pusher = bean.pusher.replace(nickName+"、", "、");
						   			bean.pusher = bean.pusher.replace(nickName, "");
								   	bean.isPushed = "0";
						   		}
						   		if("0" == ttype){
						   			toast("点赞成功");
						   		}else{
							  	 toast("取消成功");
						   		}
							}else{
								// openDialog('0',ret.retMsg);
							 
							 alert(ret.retMsg);
							 return false;
							}
						} else {
							alert("点赞失败");
			                return false;
						}
					});
	   }
	}
})
//处理图片地址
function changeBean(bean){
	var image = bean.image;
	if(null != image && "" != image){
		var arr = image.split(",");
		bean["imageArr"] = arr;
	}
	//处理时间
	// bean.createDate = getDateDiff(getDateTimeStamp(bean.createDate.substring(0,bean.createDate.length -2 )));
	bean.createDate = getDateDiff(getDateTimeStamp(bean.createDate));
	return bean;
}