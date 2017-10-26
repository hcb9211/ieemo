apiready = function (){
	//头部
	var height = 0;
    var header =$("div[name=header]")[0];
    if (api.systemType == "ios") {
   		height = 20;
   		
   	} else {
   		 height = 25;
   	}
	$(".top_nof").css({
		height: $(".top_nof").height() + height
	});
    $api.fixStatusBar(header);
	//头部[END]
	
	api.addEventListener({
	    name: 'selectFriendEvent'
	}, function(ret, err) {
		if(null != ret.value && "" != ret.value){
			var friendJson = ret.value.friendJson;
			if(null != friendJson && "" != friendJson && "1" == ret.value.type){
			
				var htmlStr = "";
				var friendList = (new Function("","return" + friendJson))();
				var invite = "";
				//展示邀请数据
				for(var i = 0; i < friendList.length; i++)
				{
					var fr = friendList[i];
					htmlStr += '<li><img src="'+fr.headPortrait+'" alt=""></li>';
					invite += ";" + fr.userNo;
				}
				if(invite.length > 0){
					invite = invite.substring(1);
				}
				vm.bean.invite = invite;
				$(".dynamic_fbdt_yqr").html(htmlStr);
			}
		}
	});
	
	api.addEventListener({
	    name: 'canseeEvent'
	}, function(ret, err) {
	    if(null != ret.value && "" != ret.value){
	    	var keyStr = ret.value.keyStr;
	    	if(null != keyStr && "" != keyStr){
	    		//替换、为;
	    		keyStr = keyStr.replace(/、/g, ";");
	    	}
	    	var value = ret.value;
			var type = value.type;
			var showHtml = "";
			if("0" == type)
			{
				showHtml="公开";
			}else if("1" == type)
			{
				showHtml="好友圈";
			}else if("2" == type)
			{
				showHtml="私密";
			}else if("3" == type)
			{
				showHtml=value.nameStr;
				vm.bean.visible = keyStr;
			}else if("4" == type)
			{
				showHtml="<b>除去</b>"+value.nameStr;
				vm.bean.invisible = keyStr;
			}
			
			vm.bean.type = type;
			$(".dynamic_fbdt_choose_name").html(showHtml).attr("data-type", type).attr("data-key", value.keyStr);
		}
	});
	
	
	//定位
	$(".dynamic_gps").click(function(){
		//展示的字符串
		var showHtml = "";
		var bMap = api.require('bMap');
		bMap.getLocation({
		    accuracy: '100m',
		    filter: 1,
		    autoStop: true
		}, function(rret, err){
			if(rret.status)
			{
				//定位成功
				// bMap.getLocation(
	   //              function(rret,rerr) {
	                	bMap.getNameFromCoords({
						    lon:  rret.lon.toFixed(2),
						    lat: rret.lat.toFixed(2)
						}, function(ret, err) {
						    if (ret.status) {
						        showHtml = ret.address;
						    } else {
						        showHtml = err.msg; 
						    }
						    $("#locationLabel").html(showHtml).attr("data-lon", rret.lon).attr("data-lat", rret.lat);
						});
	                	
                // });
			}else
			{
				showHtml = err.msg;
				$("#locationLabel").html(showHtml);
			}
		});
	});
	
	//谁可以看
	$("#canseeLi").click(function(){
		var type = $(".dynamic_fbdt_choose_name").attr("data-type");
		var nameStr = "";
		if("3" == type)
		{
			nameStr = $(".dynamic_fbdt_choose_name").html();
		}else if("4" == type)
		{
			nameStr = $(".dynamic_fbdt_choose_name").html().substring(9);
		}
		openWinFrame('谁可以看','can_see.html',{
			type:type,
			nameStr:nameStr,
			keyStr:$(".dynamic_fbdt_choose_name").attr("data-key")
		});
	});
	
	//邀请谁看
	$("#inviteLi").click(function(){
		openWinFrame('邀请谁看','select_friend.html',{
 				type:1
 			}
		);
	});
	
	//发布动态
	$("#ok").click(function(){
		//获取发布数据
		var addData = queryData();
		if("" == addData.content || null == addData.content){
			toast("请输入发布内容");
			return false;
		}else if(addData.content.length > 500){
			toast("发布内容最多500字");
			return false;
		}else {
			var _adddata = $.extend({}, addData);
			// alert(_adddata.content.toString())
			// _adddata.content = decToHex(_adddata.content);
			api.showProgress({
				style: 'default',
				animationType: 'fade',
				title: '发布中',
				text: '请稍候',
				modal: true
			});
			
			var data = {
				dynamicInfo:  JSON.stringify(_adddata)
			}
//	alert(data.dynamicInfo);
			postAjax(ApiUrl.releaseDynamic,data, function (ret, err) {
					api.hideProgress();	
					
					if (ret) {
						if(ret.retCode=='0'){
							api.sendEvent({
							    name: 'owninit'
							});
						   closeWin();
						}else{
							// openDialog('0',ret.retMsg);
						alert(ret.retMsg)
						 return false;
						}
					} else {
						alert("发布失败")
		                return false;
					}
				});
		}
	});
};

var vm = new Vue({
	el: "#info",
	data:{
		imglist:[],
		imgbase64:[],
		bean:{
			
		}
	},
	methods:{
		caramer:function(){
			var _self = this;
			
			var userNo =user.getuserNo();
			
   			var data = {
	            type : 10,
	            userNo : userNo
	        };
		
			carmersystem({
				data:data,
				url:_FileUploadServerUrl,
				callback:function(data){

					// showPic(data.locationsrc);
					_self.imgbase64.push(data.base64);//图片base64
					// _self.bean.imgsrc = data.relativeUrl;//不带服务器地址的路径,用于接口字段保存
					_self.imglist.push(data.relativeUrl);
				}
			})

		},
		deleteimg:function(index){
			this.imglist.splice(index,1);
			this.imgbase64.splice(index,1);
		}
	}

})

//获取数据
function queryData(){
	vm.bean.image = vm.imglist.toString();
	vm.bean.createBy = user.getuserNo();
	vm.bean.authority = $(".dynamic_fbdt_choose_name").attr("data-type");
	vm.bean.longitude = $("#locationLabel").attr("data-lon");
	vm.bean.latitude = $("#locationLabel").attr("data-lat");
	
	if(null == vm.bean.type || "" == vm.bean.type){
		//设置默认值
		vm.bean.type = "1";
	}
	
	vm.bean.createBy = user.getuserNo();
	vm.bean.authority = $(".dynamic_fbdt_choose_name").attr("data-type");
	if(null != vm.bean.longitude && "" != vm.bean.longitude){
		vm.bean.address = $("#locationLabel").html();
	}
	return vm.bean;
}


function galert(msg){
	api.alert({
	    title: 'testtitle',
	    msg: msg,
	}, function(ret, err) {
	
	});
}


