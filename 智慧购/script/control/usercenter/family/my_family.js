apiready = function(){
	vm.init();
	
	//添加好友
	$(".addfamily_bottom_btn").click(function(){
		var data = {
                url:{
                    url: api.wgtRootDir+"/html/usercenter/family/add_family.html",//frm地址
                    name:"add_family",//frm的名字
                    title:"添加家庭成员"//窗口的title
                }
            }

            openWinFrame("add_family_frm", api.wgtRootDir+"/html/comm/head_back.html",data);
	});
}

var vm = new Vue({
	el: ".main_dynamic",
	data:{
		list:[]
	},
	methods:{
		init:function(){
			var _self = this;
			//查询数据
        	var data = {
				userNo :user.getuserNo()
			};
			
			postAjax(ApiUrl.queryMemberOfTheFamily,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
						  if(ret.data){
						  	var list = [];
						  	// alert(JSON.stringify(ret.data[0]))
						  	for(var i = 0; i < ret.data.length; i++){
						  		var tempBean = ret.data[i];
						  		var obj = {
							        uid: tempBean.familyUserNo,
							        imgPath: queryHeadPort(tempBean.headPortrait),
							        title: tempBean.nickname,
							        subTitle: tempBean.signature,
							        remark: tempBean.remarks,
							        icon: ''
							    };
							    
							    list.push(obj);
						  	}
						  	
						  	var UIListView = api.require('UIListView');
							UIListView.open({
							    rect: {
							        x: 0,
							        y: 0,
							        w: api.winWidth,
							        h: api.frameHeight-$(".addfamily_bottom_btn").height()
							    },
							    data: list,
							    rightBtns: [{
							        bgColor: '#ddd',
							        activeBgColor: '',
							        width: 70,
							        title: '',
							        titleSize: 12,
							        titleColor: '#fff',
							        icon: '../../../image/delete.png',
							        iconWidth: 20
							    }],
							    styles: {
							        borderColor: '#dddddd',
							        item: {
							            bgColor: '#fff',
							            activeBgColor: '#F5F5F5',
							            height: 55.0,
							            imgWidth: 40,
							            imgHeight: 40,
							            imgCorner: 20,
							            placeholderImg: '',
							            titleSize: 15.0,
							            titleColor: '#222222',
							            subTitleSize: 15.0,
							            subTitleColor: '#666666',
							            remarkColor: '#d02e2e',
							            remarkSize: 13,
							            remarkIconWidth: 30
							        }
							    },
							    fixedOn: api.frameName
							}, function(ret, err) {
							    if (ret) {
							    	if("clickRightBtn" == ret.eventType){
							    		var delindex = ret.index
							    		//删除家庭成员
							    		    var delobj = list[delindex];
							    		    var deldata = {
							    		    	familyUserNo:delobj.uid,
							    		    	userNo:user.getuserNo()
							    		    }
							    		
							    			postAjax(ApiUrl.deleteMemberOfTheFamily, deldata, function (ret, err) {
												if (ret) {
													if(ret.retCode=='0'){
													  
													  //删除操作
										    		UIListView.deleteItem({
													    index: delindex
													});

													 toast("删除成功");
													}else{
														toast(ret.retMsg);
													 	return false;
													}
												} else {
													toast(err.msg);
									                return false;
												}
											},{islogin:"1",progress:"1"});
							    		
							    	}else if("clickContent" == ret.eventType){
							    		
							    	}
							    } else {
							        toast(err.msg);
							    }
							});
						  }
					}else{
						 // toast(ret.retMsg);
						toast(ret.retMsg);
						 
					 	return false;
					}
				} else {
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
		}
	}
})

//获取头像
function queryHeadPort(img){
	if(null != img && "" != img){
		return img;
	}else
	{
		return "../../image/nick.png";
	}
}