var question = new Vue({
	el:"#mylife_question",
	data:{
		userNo:user.getuserNo(),
		questionList:[],
		questionpageNo:1
	},
	methods:{
		init:function(){
			var self = this;
			var updata = {pageNo:self.questionpageNo,pageSize:"8",userNo:self.userNo};
			postAjax(ApiUrl.queryMyCoterieQuestionPage,updata,function(ret,err){
				if (ret) {
					if (ret.data) {
						for (var i=0;i<ret.data.length;i++) {
							self.questionList.push(ret.data[i]);
						}
					}
				} else{}
			},{progress:'1',islogin:"1"})
		},
		particulars:function(bean){
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
	question.init();
	api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		question.questionpageNo = 1;
		question.questionList = [];
        question.init();
        setTimeout("api.refreshHeaderLoadDone()",'1000');
	});
	//  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            question.questionpageNo += 1;
            question.init()
            // alert(index.pageNo)
        }
    });
}
$(".sj_gz_list").children("li").click(function(){
	$(this).addClass("sj_gz_list_border").siblings().removeClass("sj_gz_list_border");
})