apiready = function(){ 
	var vm = new Vue({
		el: "#info",
		data:{
			bean:{

			},
			querydata:{
				pageNo:1,
				pageSize:10
			},
			list:[]
		},
		methods:{
			init:function(){
				var _self = this;
				var srcNo = api.pageParam.srcNo;
				var data = {
					quesNo:srcNo,
					userNo:user.getuserNo()
				}
				postAjax(ApiUrl.queryCoterieQuestionDetail,data, function (ret, err) {
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
			queryCoterieQuesAnswerPage:function(){
				var _self = this;
				var srcNo = api.pageParam.srcNo;
				var data = {
					quesNo:srcNo,
					pageNo:_self.querydata.pageNo,
					pageSize:_self.querydata.pageSize
				}
				postAjax(ApiUrl.queryCoterieQuesAnswerPage,data, function (ret, err) {
				
					if (ret) {	
						if(ret.retCode=='0'){
							if(ret.data){
								for(ind in ret.data){
									ret.data[ind].margindata = getDateDiff(getDateTimeStamp(ret.data[ind].createDate))
									_self.list.push(ret.data[ind]);
								}
							}
						}else{
						 return false;
						}
					} else {
		                return false;
					}
				},{progress:"1"}); 
			},
			pushed:function(bean,e){
				var _self = this;
				// _self.bean.isPraise ="1";
				var data = {
					pushSrc:"1", //经验
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

						 return false;
						}
					} else {
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			//关注问题
			saveCoterieQuestionFans:function(bean){
				var _self = this;
				var data = {
					userNo:user.getuserNo(),
					quesNo:api.pageParam.srcNo
				}
				postAjax(ApiUrl.saveCoterieQuestionFans,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							//设置为关注
							_self.bean.isFocus ="1";
						}else{
							alert(ret.retMsg);
						 return false;
						}
					} else {
						alert("关注问题失败")
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			updateCoterieQuestionFans:function(bean){
				var _self = this;
				var data = {
					userNo:user.getuserNo(),
					quesNo:api.pageParam.srcNo
				}
				postAjax(ApiUrl.updateCoterieQuestionFans,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							//设置为关注
							_self.bean.isFocus ="0";
						}else{
							alert(ret.retMsg);
						 return false;
						}
					} else {
						alert("取消关注问题失败");
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
			answerpage:function(bean){
				var data = {
				    islogin:"1",//是否需要验证 0否 1是 默认是否
				  	callback:[],
				  	info:bean
			    }
		  	  	openWinFrame("answer", filepath.getPath(filepath.lifecircle.question.answer.frm),data);
			},
			//答案详情
			answerinfo:function(bean){
				var data = {
			        url:{
			            url:filepath.getPath(filepath.lifecircle.question.answerinfo.frm),
			            name:"answerinfo_frm",
			            title:"答案详情"
			        },
			        info:{
			        	ansNo:bean.ansNo
			        }
			   	}
		   		 openWinFrame("answerinfopage_win", filepath.getPath(filepath.comm.headback.win),data);

			}
			
		}

	})
	 vm.init();   
	 vm.queryCoterieQuesAnswerPage();


	 $(window).scroll(function () {
	    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
            vm.querydata.pageNo = vm.querydata.pageNo + 1;
            vm.queryCoterieQuesAnswerPage();
            
            // setTimeout("api.refreshHeaderLoadDone()",'1000');
	    }
	});

	 api.addEventListener({
	     name: 'questioninit'
	 }, function(ret, err) {
	 	vm.list = [];
	    vm.queryCoterieQuesAnswerPage(); 
	 });

    // 分享
    api.addEventListener({
        name:'shareContent'
    },function (ret,err) {
        if(ret){
            var userInfo = user.getuserinfo();
            var headPortrait = userInfo.headPortrait;
            var option = {
                title:'生活圈问题',
                description:'亿猫的生活圈原来是这样的精彩，长见识了',
                imgUrl:headPortrait,
            }
            dialog.shares(option);
        }
    })
}


