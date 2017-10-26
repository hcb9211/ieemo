apiready = function(){
    var vm = new Vue({
	el: "#info",
	data:{
		index: 0,
		list: [
			{info:[]},
			{info:[]}
		],
		pageNolist:[1,1],
		pageSizelist:[10,10],
		typelist:[0,1]
	},
	methods:{
		query:function(){
			var _self = this;
			var index = _self.index;
			var data = {
				pageNo:_self.pageNolist[index],
				pageSize:_self.pageSizelist[index],
				type:index
			}
			postAjax(ApiUrl.queryCoterieQuestionPage,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							if(ret.data){
								for(ind in ret.data){
									_self.list[index].info.push(ret.data[ind]);
								}
							}
						}else{
							alert(ret.retMsg);
						 return false;
						}
					} else {
						// toast("");
		                return false;
					}
				},{progress:"1"});
		},
		hot:function(){
			var index = 0;
			var _self = this;
			_self.index = index;
			_self.list[index].info = [];
			_self.query();
		},
		neartime:function(){
			var index = 1;
			var _self = this;
			_self.index = index;
			_self.list[index].info = [];
			_self.query();
		},
		//问题详情页
		answerinfopage:function(bean){
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
    $(".sj_gz_list").children("li").click(function(){
            $(this).addClass("sj_gz_list_border").siblings().removeClass("sj_gz_list_border");
        });
    vm.hot();

    //下拉
     $(window).scroll(function () {
	    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
            var index = vm.index;
            vm.pageNolist[index] = vm.pageNolist[index] + 1;
            vm.query();
            
            // setTimeout("api.refreshHeaderLoadDone()",'1000');
	    }
	});

}

    