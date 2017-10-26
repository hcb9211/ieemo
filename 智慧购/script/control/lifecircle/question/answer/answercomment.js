apiready = function(){
    var vm = new Vue({
    	el: "#info",
    	data:{
         querydata:{
         	pageNo:1,
         	pageSize:10,
         	commentSrc:"2"//0，经验；1，问题；2，答案
         },
         addcolor:false,
         list:[],
         content:"",
         bean:{},
         placeholder:"添加评论",
         commenttype:"0",//0为回复主题 1位回复个人
         default:{
         	placeholder:"添加评论"
         }
    	},
        methods:{
        	init:function(){
        		var _self = this;
				var srcNo = api.pageParam.ansNo;
				var data = {
					srcNo:srcNo,
					pageNo:_self.querydata.pageNo,
					pageSize:_self.querydata.pageSize,
					commentSrc:_self.querydata.commentSrc,
					userNo:user.getuserNo()
				}
				postAjax(ApiUrl.queryCoterieCommentPage,data, function (ret, err) {

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
        	addColor:function(){
				vm.addcolor = true;
			},
			delColor:function(){
				vm.addcolor = false;
			},
        	saveCoterieCollect:function(bean){
        		var _self = this;
        		if($.trim(_self.content) == ""){
        			toast("评论内容不能为空");
        			return false;
        		}
        		if($.trim(_self.content).length > 50){
        			toast("评论内容不能超过50个字");
        			return false;
        		}
        		var data ={
        			commentSrc:"2",//，0，经验；2，答案
        			srcNo:api.pageParam.ansNo,
        			toCommentId:"",//回复的评论id	
        			toUserNo:"",//回复的用户id	
        			userNo:user.getuserNo(),
        			content:_self.content
        		}
        		//判断是否是回复别人的评论
        		postAjax(ApiUrl.saveCoterieComment,data, function (ret, err) {

					if (ret) {
						if(ret.retCode == '0'){
							_self.content = "";
							// _self.bean.isCollect = '1';
                            _self.list = [];
                            _self.querydata.pageNo = 1;
							_self.init();
							toast("评论成功");
							return false;
						}else{
							toast(ret.retMsg);
						 return false;
						}
					} else {
		                return false;
					}
				},{islogin:"1",progress:"1"});

        	},
        	saveOtherCoterieCollect:function(bean){
        		var _self = this;
        		if($.trim(_self.content) == ""){
        			toast("评论内容不能为空");
        			return false;
        		}
        		if($.trim(_self.content).length > 50){
        			toast("评论内容不能超过50个字");
        			return false;
        		}
        		var data ={
        			commentSrc:"2",//，0，经验；2，答案
        			srcNo:api.pageParam.ansNo,
        			toCommentId:_self.bean.commentNo,//回复的评论id	
        			toUserNo:_self.bean.userNo,//回复的用户id	
        			userNo:user.getuserNo(),
        			content:_self.content
        		}
        		//判断是否是回复别人的评论
        		postAjax(ApiUrl.saveCoterieComment,data, function (ret, err) {
					if (ret) {
						if(ret.retCode == '0'){
							_self.content = "";
							_self.commenttype = "0"; //恢复默认评论方式
							_self.placeholder = _self.default.placeholder
							// _self.bean.isCollect = '1';
							toast("评论成功");
                            _self.list = [];
                           _self.querydata.pageNo = 1;
                            _self.init();
							return false;
						}else{
							toast(ret.retMsg);
						 return false;
						}
					} else {
		                return false;
					}
				},{islogin:"1",progress:"1"});

        	},
        	//点击
        	collectclick:function(bean){
        		this.bean = $.extend({}, bean);
        		$(".fixed_tc").removeClass('display');
        	},
        	//取消
        	back:function(){
        		this.bean = {};
        		$(".fixed_tc").addClass('display');
        	},
        	//回复评论按钮操作
        	collectuser:function(e){
                e.stopPropagation();
        		this.commenttype = "1";//设置为给评论回复
        		this.placeholder = "回复 " + this.bean.userName +" :";
        		$(".fixed_tc").addClass('display');
        	},
        	//点赞
			pushed:function(bean,e){
				e.stopPropagation();
				var _self = this;
				// _self.bean.isPraise ="1";
				var data = {
					pushSrc:"3", //0，经验；1，问题；2，答案；3，评论
					pushType:"0",//0,点赞;1,拍砖
					srcNo:bean.commentNo,
					userNo:user.getuserNo()
				}
				postAjax(ApiUrl.saveCoteriePushed,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							bean.isPraise ="1";
							bean.praisenum = bean.praisenum + 1;
						}else{
							toast(ret.retMsg);
						 return false;
						}
					} else {
		                return false;
					}
				},{islogin:"1",progress:"1"});
			},
        }
    })
    vm.init();

    //上拉加载
	$(window).scroll(function () {
	    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
	    	 var index = $("#typeli .sj_list_li_click").index();
            vm.querydata.pageNo = vm.querydata.pageNo + 1;
            vm.init();
            
            // setTimeout("api.refreshHeaderLoadDone()",'1000');
	    }
	});


    $('input').on('focus',function(event){      
       //自动反弹 输入法高度自适应
        var target = this;
        setTimeout(function(){
            target.scrollIntoViewIfNeeded();
        },100);
    });

}
