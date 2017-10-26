var mylife_watchingme = new Vue({
	el:"#watchingme",
	data:{
		userNo:user.getuserNo(),
		watchingquestionList:[],
		watchingpeopleList:[],
		watchingquestionpageNo:1,
		watchingpeoplepageNo:1,
		watchingmeque:false,
		watchingmepeo:true
	},
	methods:{
		initquestion:function(){
			var selfque = this;
			 var updataque = {pageNo:selfque.watchingquestionpageNo,pageSize:"10",userNo:selfque.userNo};
			 postAjax(ApiUrl.queryCoterieQuestionFocusPage,updataque,function(ret,err){
			 	if (ret) {
			 		if (ret.data) {
			 			for (var i=0;i<ret.data.length;i++) {
				 			selfque.watchingquestionList.push(ret.data[i])
				 		}
			 		}
			 	}
			 },{progress:'1'})
		},
		initpeople:function(){
			var selfpeo = this;
			 var updatapeo = {pageNo:selfpeo.watchingpeoplepageNo,pageSize:"10",userNo:selfpeo.userNo};
			 postAjax(ApiUrl.queryUserToFansFocusPage,updatapeo,function(ret,err){
			 	if (ret) {
			 		if (ret.data) {
			 			for (var i=0;i<ret.data.length;i++) {
				 			selfpeo.watchingpeopleList.push(ret.data[i])
				 		}
			 		}
			 	}
			 },{progress:'1'})
		},
		followed:function(attention,index){
			var self = this;
			//attention 要取消关注的用户Id
			var updata = {userNo:attention,fansUserNo:user.getuserNo()}
			dialog.alert({text:"是否取消关注？"},function(){
				postAjax(ApiUrl.updateUserToFans,updata,function(ret,err){
					if (ret) {
						toast(ret.data);
						if (ret.retCode == "0") {
							self.watchingpeopleList.splice(index,1)
						}
					}
				})
			})
		},
		particularsque:function(bean){
			var data = {
		        url:{
		            url: api.wgtRootDir+"/html/lifecircle/question/info/questioninfo_frm.html",
		            name:"questioninfo_frm",
		            title:"问题详情"
		        },
		        info:{
		        	srcNo:bean.quesNo
		        }
		    }
		    openWinFrame("questioninfo_win", api.wgtRootDir+"/html/lifecircle/question/info/questioninfo_win.html",data);
		}
	}
})
apiready=function(){
	mylife_watchingme.initquestion();
	mylife_watchingme.initpeople();
	api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		if (mylife_watchingme.watchingmeque == false) {
        	mylife_watchingme.watchingquestionpageNo =1;
        	mylife_watchingme.watchingquestionList = [];
        	mylife_watchingme.initquestion();
        } else{
        	mylife_watchingme.watchingpeoplepageNo =1;
        	mylife_watchingme.watchingpeopleList = [];
        	mylife_watchingme.initpeople();
        }
        setTimeout("api.refreshHeaderLoadDone()",'1000');
	});
	$(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            if (mylife_watchingme.watchingmeque == false) {
            	mylife_watchingme.watchingquestionpageNo +=1;
            	mylife_watchingme.initquestion();
            } else{
            	mylife_watchingme.watchingpeoplepageNo +=1;
            	mylife_watchingme.initpeople();
            }
        }
    });
}
function question(){
	mylife_watchingme.watchingmepeo = true;
	mylife_watchingme.watchingmeque = false;
};
function people(){
	mylife_watchingme.watchingmepeo = false;
	mylife_watchingme.watchingmeque = true;
};