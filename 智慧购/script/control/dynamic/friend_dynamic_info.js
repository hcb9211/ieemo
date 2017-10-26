apiready = function(){
   var friendUserNo = api.pageParam.info.friendUserNo;
   vm.addBean.familyUserNo = friendUserNo;
   vm.friendUserNo = friendUserNo;
   vm.init(friendUserNo);
   vm.initPerson(friendUserNo);
   
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
			vm.list = [];
			vm.pageNo = 1;
           vm.init(friendUserNo);
            setTimeout("api.refreshHeaderLoadDone()",'1000');
          
		}

	});
}


//好友动态加载
var vm = new Vue({
	el: "#body",
	data:{
		list:[],
		pageNo:1,
		bean:{
			createBy:user.getuserNo(),
			dynamicNo:"",
			content:"",
			parentCommentNo:"",
			targetUserNo:"",
			targetName:""
		},
		rspBean:{},
		addBean:{},
		isHide:"1",
		userNo:user.getuserNo(),
		friendUserNo:"",
		report:""
	},
	methods:{
		init: function(friendUserNo){
			var _self = this;
			
			var data = {
				userNo :user.getuserNo(),
				pageNo: _self.pageNo, //第几页 
				pageSize:10, //分页条数
				friendUserNo: friendUserNo
			};
			
			postAjax(ApiUrl.querySingleFriendDynamicList,data, function (ret, err) {
				
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					  	var dynamicList = ret.data.dynamicList;
					  	for (var i=0;i<dynamicList.length;i++) {
					  		_self.list.push(changeBean(dynamicList[i]));
					  	}
					  	
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
		initPerson: function(friendUserNo){
			var _self = this;
			
			var data = {
				userNo :friendUserNo
			};
			
			postAjax(ApiUrl.queryMemberUserInfoDataByUserNo,data, function (ret, err) {
				
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					   _self.rspBean = ret.data;
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
		next:function(){
			this.pageNo = this.pageNo + 1;
			this.init();
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
			if("" == this.bean.content || null == this.bean.content){
				toast("请输入评论内容");
				return false;
			}else if(this.bean.content.length > 20){
				toast("评论内容最多20字");
				return false;
			}else {
				var _self = this;
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
							   
							   // var list = _self.list;
				   			// 	//组装数据
						   	// 	for(var i = 0; i < list.length; i++){
						   	// 		var tempBean = list[i];
						   	// 		if(_self.bean.dynamicNo == tempBean.dynamicNo){
						   	// 			var obj = {
						   	// 				commentNo:ret.data,
								  //           content:_self.bean.content,
								  //           createBy:_self.bean.createBy,
								  //           createDate:"",
								  //           dynamicNo:_self.bean.dynamicNo,
								  //           targetUserNo:_self.bean.targetUserNo,
								  //           createName:user.getnickName(),
								  //           targetName:_self.bean.targetName
						   	// 			};
						   	// 			tempBean.dynamicCommentList.push(obj);
						   	// 		}
						   	// 	}
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
					   				_self.currentbean.dynamicCommentList.push(obj);
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
	   },
	   showAddFamily:function(){
			var _self = this;
			_self.addBean.remarks = "";
			$("#addFamilyDiv").show();
       },
		addFamily:function(){
			var _self = this;
			
			var data = _self.addBean;
			data.userNo = user.getuserNo();
			
			if("" == data.remarks || null == data.remarks){
				toast("请填写家庭成员角色");
				return false;
			}else if(data.remarks.length > 10){
				toast("角色名称最多10字");
				return false;
			}else {
				api.showProgress({
					style: 'default',
					animationType: 'fade',
					title: "添加家庭成员中",
					text: '请稍候',
					modal: true
				});
			
				postAjax(ApiUrl.sendMessageForMemberOfTheFamily, data, function (ret, err) {
					api.hideProgress();	
					if (ret) {
						if(ret.retCode=='0'){
						  
						  //改变数据
						  _self.isHide = "1";
						  
						  //添加成功
						  toast("添加成功");
						  $("#addFamilyDiv").hide();
						}else{
							toast(ret.retMsg);
						 	return false;
						}
					} else {
						toast(err.msg);
		                return false;
					}
				});
			}
       },
       reportPage:function(bean){
			$("#reportDiv").show();
		},
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

$(window).scroll(function () {
    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
    	vm.next();
    }
});

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