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
	
	//初始化展示
	var type = api.pageParam.type;
	$("input[name='dynamic_skyc_choose_first_radio'][value='"+type+"']").prop("checked", true);
	if("3" == type)
	{
		$("#phone"+type).show();
		$(".dynamic_skyc_choose_two_name1").html(api.pageParam.nameStr).attr("data-key", api.pageParam.keyStr).show();
	}else if("4" == type){
		$("#phone"+type).show();
		$(".dynamic_skyc_choose_two_name2").html(api.pageParam.nameStr).attr("data-key", api.pageParam.keyStr).show();
	}
	

	api.addEventListener({
	    name: 'selectFriendEvent'
	}, function(ret, err) {
	    if(null != ret.value && "" != ret.value){
			var friendJson = ret.value.friendJson;
			if(null != friendJson && "" != friendJson && "0" == ret.value.type){
				var htmlStr = "";
				var keyStr = "";
				var friendList = (new Function("","return" + friendJson))();
				//展示邀请数据
				for(var i = 0; i < friendList.length; i++)
				{
					var fr = friendList[i];
					keyStr += "、"+fr.userNo;
					htmlStr += "、" + fr.name;
				}
				
				//截取第一个逗号
				if(htmlStr.length > 0){
					htmlStr = htmlStr.substring(1);
					keyStr = keyStr.substring(1);
				}
				
				var tempVal = $("input[name='dynamic_skyc_choose_first_radio']:checked").val();
				if("3" == tempVal)
				{
					$(".dynamic_skyc_choose_two_name1").html(htmlStr).attr("data-key", keyStr).show();
				}else if("4" == tempVal)
				{
					$(".dynamic_skyc_choose_two_name2").html(htmlStr).attr("data-key", keyStr).show();	
				}
			}
		}
	});
	
//	api.addEventListener({
//	    name: 'canseeEvent'
//	}, function(ret, err) {
//	    if(null != ret.value && "" != ret.value){
//			var type = ret.value.type;
//			
//		}
//	});


	//单选按钮事件
	$("input[type='radio']").click(function(){
		//当前值
		var tempVal = $("input[name='dynamic_skyc_choose_first_radio']:checked").val();
		if("3" == tempVal || "4" == tempVal)
		{
			//展示下面的从通讯录中获取信息
			$("#phone"+tempVal).show();
			tempVal == 3?$("#phone4").hide():$("#phone3").hide();
		}else{
			$("#phone4").hide();
			$("#phone3").hide();
		}
	});
	
	//选择用户
	$(".dynamic_skyc_choose_two_sz").click(function(){
		var val = $(this).attr("data-val");
		openWinFrame('选择联系人','select_friend.html',{
	 				type:0
	 			}
			);
	});
	
	//完成
	$("#canok").click(function(){
		//选中的类型
		var tempVal = $("input[name='dynamic_skyc_choose_first_radio']:checked").val();
		var nameStr = "";
		var keyStr = "";
		if("3" == tempVal)
		{
			//获取选择的人
			nameStr = $(".dynamic_skyc_choose_two_name1").html();
			keyStr = $(".dynamic_skyc_choose_two_name1").attr("data-key");
		}else if("4" == tempVal)
		{
			nameStr = $(".dynamic_skyc_choose_two_name2").html();
			keyStr = $(".dynamic_skyc_choose_two_name2").attr("data-key");
		}
		
		api.sendEvent({
		    name: 'canseeEvent',
		    extra: {
		    	type:tempVal,
		        nameStr: nameStr,
		        keyStr:keyStr
		    }
		});
		
		closeWin();
	});
};