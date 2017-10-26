$(document).ready(function(){

	$(".dynamic_top_list").children("li").click(function(){
			var $this = $(this);
            $this.addClass("dynamic_top_list_li_click").siblings().removeClass("dynamic_top_list_li_click");
            
            //判断类型
            var type = $this.attr("data-type");
            if("1" == type)
            {
				vm.list = [];
            	vm.init();
            }else if("2" == type)
            {
            	vm.mylist = [];
            	vm.owninit();
            }else if("3" == type)
            {
            	vm.nearbylist = [];
            	vm.nearbyinit();
            }
        });
	//点击加号
	$(".dynamic_fb_btn").click(function(e){
            //stopPropagation(e);

            if($(".fixed_tc_dynamic").is(":hidden")){
	            $(".fixed_tc_dynamic").removeClass("display");
	            var wap_tc_bottom_tt=setTimeout(function(){
	               $(".fixed_tc_dynamic").addClass("fixed_tc_dynamic_tc");
	               $(".dynamic_tc_list").addClass("dynamic_tc_list_tc");
	            },100);
	            $(".dynamic_tc_psadd").addClass('dynamic_tc_psadd_click');
            }else{
            	$(".fixed_tc_dynamic").addClass("display");
            	 var wap_tc_bottom_tt=setTimeout(function(){
	            	$(".fixed_tc_dynamic").removeClass("fixed_tc_dynamic_tc");
		            $(".dynamic_tc_list").removeClass("dynamic_tc_list_tc");
	            },100);
	            
	            $(".dynamic_tc_psadd").removeClass('dynamic_tc_psadd_click');
            }
            
        });
        
        //添加动态
        $("#addDynamic").click(function(){
        	openWinFrame('发布动态','dynamic_add.html',{});
			$(".fixed_tc_dynamic").removeClass("fixed_tc_dynamic_tc");
            $(".dynamic_tc_list").removeClass("dynamic_tc_list_tc");
            $(".dynamic_tc_psadd").removeClass('dynamic_tc_psadd_click');
        });
        
        //添加好友
        $("#addFriend").click(function(){
        	var data = {
                url:{
                    url: api.wgtRootDir+"/html/dynamic/friend_add.html",//frm地址
                    name:"friend_add",//frm的名字
                    title:"添加好友"//窗口的title
                }
            }

            openWinFrame("head_back", api.wgtRootDir+"/html/comm/head_back.html",data);
            
			$(".fixed_tc_dynamic").removeClass("fixed_tc_dynamic_tc");
            $(".dynamic_tc_list").removeClass("dynamic_tc_list_tc");
            $(".dynamic_tc_psadd").removeClass('dynamic_tc_psadd_click');
        });
        
        //点击未读
        $("#unreadDiv").click(function(){
        	var data = {
                url:{
                    url: api.wgtRootDir+"/html/dynamic/unread_dynamic_info.html",//frm地址
                    name:"unread_dynamic_info",//frm的名字
                    title:"新消息"//窗口的title
                }
            }
            vm.unreadInfo.unreadcount = 0;
            vm.myunreadInfo.unreadcount = 0;
            vm.nearbyunreadInfo.unreadcount = 0;
            openWinFrame("unread_dynamic_info_frm", api.wgtRootDir+"/html/comm/head_back.html",data);
        });
        
    //点击页面其他地方，动态页面-弹窗效果隐藏
    $(".fixed_tc_dynamic").click(function(){
	    var e = e || window.event; //浏览器兼容性 
		var elem = e.target || e.srcElement; 
		
		if("addDynamic" != elem.id && "addFriend" != elem.id && "dynamic_tc_fzt_font" != elem.className && "dynamic_tc_fzt_img" != elem.className 
		&& "dynamic_tc_fzt_font" != elem.parentNode.className && "dynamic_tc_fzt_img" != elem.parentNode.className){
	        $(".dynamic_tc_list").removeClass("dynamic_tc_list_tc");
	        var wap_tc_bottom_tt=setTimeout(fixed_tc_dynamic_tc_time,600);
	        function fixed_tc_dynamic_tc_time(){
	            $(".fixed_tc_dynamic").removeClass("fixed_tc_dynamic_tc");
	            $(".fixed_tc_dynamic").addClass("display");
	        }
        }
    });
});

apiready = function(){
   vm.init();
   vmUser.init();
   
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
		
		var type= $(".dynamic_top_list .dynamic_top_list_li_click").attr("data-type");
		var index= $(".dynamic_top_list .dynamic_top_list_li_click").index();
	    vm.pageNolist[index] =1;	
    	if("1" == type){
    		vm.list = [];
    		vm.init();
    	}else if("2" == type){
    		vm.mylist = []
    		vm.owninit();
    	}else if("3" == type){
    		vm.nearbylist = [];
    		vm.nearbyinit();
    	}
           // $(".dynamic_top_list li[data-type='"+vm.type+"']").addClass("dynamic_top_list_li_click").siblings().removeClass("dynamic_top_list_li_click");
            setTimeout("api.refreshHeaderLoadDone()",'1000');
		}

	});

   api.addEventListener({
       name: 'owninit'
   }, function(ret, err) {
   	   $(".dynamic_top_list li").eq(0).addClass("dynamic_top_list_li_click").siblings().removeClass("dynamic_top_list_li_click");
   	   vm.type = "1";
       vm.pageNolist[0] = 1;
       vm.list = [];
       vm.init();
       
   });
}



//好友动态加载
var vm = new Vue({
	el: ".dynamic_con",
	data:{
		list:[],
		mylist:[],
		nearbylist:[],
		unreadInfo:{},
		myunreadInfo:{},
		nearbyunreadInfo:{},
		typelist:"",
		pageNolist:[1,1,1],
		bean:{
			createBy:user.getuserNo(),
			dynamicNo:"",
			content:"",
			parentCommentNo:"",
			targetUserNo:"",
			targetName:""
		},
		type:"1",
		report:"",
		userNo:user.getuserNo(),
        signAture:user.getuserinfo().signAture,
		nickName:user.getuserinfo().nickName,
		title:'',
		imgUrl : '',
		description:''
	},
	methods:{
		init: function(){
			var _self = this;
			_self.type = "1";
            //  动态分享
            api.addEventListener({
                name:'shares'
            },function (ret,err) {
                if(ret){
                    var title= ret.value.title;
                    var description = ret.value.description;
                    var imgUrl= ret.value.imgUrl;
                    _self.title = title;
                    _self.imgUrl = imgUrl;
                    _self.description = description;
                }
            })
			
			var data = {
				userNo :user.getuserNo(),
				pageNo: _self.pageNolist[0], //第几页 
				pageSize:10 //分页条数

			};
			
			postAjax(ApiUrl.queryFriendDynamicList,data, function (ret, err) {
				// alert(JSON.stringify(ret))
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					   _self.unreadInfo = ret.data.unreadInfo;
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
		owninit: function(){
			var _self = this;
			_self.type = "2";
			
			var data = {
				userNo :user.getuserNo(),
				pageNo: _self.pageNolist[1], //第几页 
				pageSize:10 //分页条数
			};
			
			postAjax(ApiUrl.queryOwnDynamicList,data, function (ret, err) {
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					  _self.myunreadInfo = ret.data.unreadInfo;
					  	var dynamicList = ret.data.dynamicList;
					  	for (var i=0;i<dynamicList.length;i++) {
					  		_self.mylist.push(changeBean(dynamicList[i]));
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
		nearbyinit: function(){
			var _self = this;
			_self.type = "3";
			
			var bMap = api.require('bMap');
			bMap.getLocation({
			    accuracy: '100m',
			    filter: 1,
			    autoStop: true
			}, function(rret, err){
				if(rret.status)
				{
					//定位成功
					var data = {
						userNo :user.getuserNo(),
						lat1:rret.lat.toFixed(2),
						lng1:rret.lon.toFixed(2),
						startDistance:"0",
						endDistance:"50",
						pageNo: _self.pageNolist[2], //第几页 
						pageSize:10 //分页条数
					};
					postAjax(ApiUrl.queryNearbyDynamicList,data, function (ret, err) {

						if (ret) {
							if(ret.retCode=='0'){
							  if(ret.data){
							  	 _self.nearbyunreadInfo = ret.data.unreadInfo;
							  	var dynamicList = ret.data.dynamicList;
							  	for (var i=0;i<dynamicList.length;i++) {
							  		_self.nearbylist.push(changeBean(dynamicList[i]));
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
				}else
				{
					toast('请在设置里授权定位哦~','bottom');
				}
			});
		},
		friendnext:function(){
			this.pageNolist[0] = this.pageNolist[0] + 1;
			this.init();
		},
		mynext:function(){
			this.pageNolist[1] = this.pageNolist[1] + 1;
			this.owninit();
		},
		nearbynext:function(){
			this.pageNolist[2] = this.pageNolist[2] + 1;
			this.nearbyinit();
		},
		showcomment:function(bean, type, pl){
			//显示评论弹框
			this.bean.content = "";
			$("#comDiv").show();
			if("2" == type){
				//疑点 暂注释
				this.bean.parentCommentNo = pl.commentNo;
				this.bean.targetUserNo = pl.createBy;
				this.bean.targetName = pl.createName;
			}else{
				this.bean.parentCommentNo ="";
				this.bean.targetUserNo ="";
				this.bean.targetName ="";
			}
			
			this.bean.dynamicNo = bean.dynamicNo;
			this.currentbean = bean;
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
							   // var list = [];
				                	// if("1" == _self.type){
				                	// 	list = _self.list;
				                	// }else if("2" == _self.type){
				                	// 	list = _self.mylist;
				                	// }else if("3" == _self.type){
				                	// 	list = _self.nearbylist;
				                	// }
				                	
				                	//组装数据
							   		// for(var i = 0; i < list.length; i++){
							   		// 	var tempBean = list[i];
							   		// 	if(_self.bean.dynamicNo == tempBean.dynamicNo){
							   				// var obj = {
							   				// 	commentNo:ret.data,
									     //        content:_self.bean.content,
									     //        createBy:_self.bean.createBy,
									     //        createDate:"",
									     //        dynamicNo:_self.bean.dynamicNo,
									     //        targetUserNo:_self.bean.targetUserNo,
									     //        createName:user.getnickName(),
									     //        targetName:_self.bean.targetName
							   				// };

							   		// 		tempBean.dynamicCommentList.push(obj);
							   		// 	}
							   		// }
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
							    // var list = [];
			        //         	if("1" == _self.type){
			        //         		list = _self.list;
			        //         	}else if("2" == _self.type){
			        //         		list = _self.mylist;
			        //         	}else if("3" == _self.type){
			        //         		list = _self.nearbylist;
			        //         	}
			                	
			                	//组装数据
						   		// for(var i = 0; i < list.length; i++){
						   		// 	var tempBean = list[i];
						   		// 	if(_self.bean.dynamicNo == tempBean.dynamicNo){
						   		// 		if("0" == ttype)
								   // 		{
								   			
								   // 			//点赞
								   // 			tempBean.pusher += "、" + "KKK";
								   // 			tempBean.isPushed = "1";
								   // 		}else
								   // 		{
								   // 			tempBean.pusher = tempBean.pusher.replace("KKK、", "");
								   // 			tempBean.isPushed = "0";
								   // 		}
						   				
						   		// 	}
						   		// }
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
		showFriendInfo:function(friendUserNo){
			var data = {
                info:{friendUserNo:friendUserNo},
                islogin:"1"
            }

            openWinFrame("friend_dynamic_info_frm", api.wgtRootDir+"/html/dynamic/friend_dynamic_info.html",data);
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

function mydynamicinfo(){
	var data = {
      
        info:{friendUserNo:user.getuserNo()}
    }
    openWinFrame("friend_dynamic_info_frm", api.wgtRootDir+"/html/dynamic/friend_dynamic_info.html",data);
}
//好友动态加载
var vmUser = new Vue({
	el: ".dynamic_bj",
	data:{
		userbean:{}
	},
	methods:{
		init: function(){
			var _self = this;
			
			var data = {
				userNo :user.getuserNo()
			};
			
			postAjax(ApiUrl.queryMemberUserInfoDataByUserNo,data, function (ret, err) {
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					   _self.userbean = ret.data;
					  }
					 
					}else{
						// openDialog('0',ret.retMsg);
					 return false;
					}
				} else {
					
	                return false;
				}
			});

		}
	}
})

$(window).scroll(function () {
	    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
	    	//获取当前选中的
	    	var type= $(".dynamic_top_list .dynamic_top_list_li_click").attr("data-type");
	    	if("1" == type){

	    		vm.friendnext();
	    	}else if("2" == type){

	    		vm.mynext();
	    	}else if("3" == type){

	    		vm.nearbynext();
	    	}
	    }
	});

//处理图片地址
function changeBean(bean){
	var image = bean.image;
	if(null != image && "" != image){
		var arr = image.split(",");
		bean["imageArr"] = arr;
		// cacheimage.cache({url:bean["imageArr"],vueobj:vm,type:"array"});
	}
	//处理时间
	// bean.createDate = getDateDiff(getDateTimeStamp(bean.createDate.substring(0,bean.createDate.length -2 )));
	bean.createDate = getDateDiff(getDateTimeStamp(bean.createDate));
	return bean;
}
/*阻止事件冒泡*/
function stopPropagation(e) { 
	if (e.stopPropagation) 
	 	e.stopPropagation(); 
	else 
		e.cancelBubble = true; 
} 