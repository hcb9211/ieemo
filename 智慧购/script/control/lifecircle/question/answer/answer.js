apiready = function(){
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
   var vm = new Vue({
	el: "#info",
	data:{
		bean:{
			delFlag:"1"//0为草稿 1位发布
		}
	},
	methods:{
		save:function(){
			var _self = this;
			var info = api.pageParam.info;

			if($.trim(_self.bean.answContent) == "" ){
				alert("回答内容不能为空")
				return false;
			}
			if(_self.bean.answContent > 200){
				alert("回答内容不允许超过200个字");
				return false;
			}
			_self.bean.userNo = user.getuserNo();
			_self.bean.quesNo = info.quesNo;
			var data = {
				coterieAnswerDto:_self.bean
			}
			postAjax(ApiUrl.saveCoterieAnswer,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							//设置为关注
							api.alert({
							    title: '消息',
							    msg: '保存成功',
							},function(){
								api.sendEvent({
								    name: 'questioninit'
								});
								closeWin();
							})
							
						}else{
							alert(ret.retMsg);
						 return false;
						}
					} else {
						toast("回答失败");
		                return false;
					}
				},{progress:"1",islogin:"1"});
		}
	}
});

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
    
}
