var answer = new Vue({
	el:"#answer",
	data:{
		userNo:user.getuserNo(),
		answerList:[],
		answerpageNo:1,
		answerpageSize:8
	},
	methods:{
		init:function(){
			var self = this;
			var Updata = {pageNo:self.answerpageNo,pageSize:self.answerpageSize,userNo:self.userNo};
			postAjax(ApiUrl.queryMyCoterieAnswerPage,Updata,function(ret,err){
				if (ret) {
					if (ret.data) {
						for (var i=0;i<ret.data.length;i++) {
							self.answerList.push(ret.data[i]);
						}
					}
				} else{}
			},{progress:'1',islogin:"1"})
		},
		particulars:function(bean){
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
});
apiready = function(){
	answer.init();
	api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		answer.answerpageNo = 1;
		answer.answerList = [];
        answer.init();
        setTimeout("api.refreshHeaderLoadDone()",'1000');
	});
	//  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            answer.answerpageNo += 1;
            answer.init();
        }
    });
}
////答案详情
//    answerinfo:function(bean){
//      	var data = {
//            url:{
//                url:filepath.getPath(filepath.lifecircle.question.answerinfo.frm),
//                name:"answerinfo_frm",
//                title:"答案详情"
//            },
//            info:{
//              ansNo:bean.ansNo
//            }
//         }
//          openWinFrame("answerinfopage_win", filepath.getPath(filepath.comm.headback.win),data);
//
//    }