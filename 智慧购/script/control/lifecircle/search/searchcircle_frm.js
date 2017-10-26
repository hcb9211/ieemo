apiready = function(){
	//上拉加载
	$(window).scroll(function () {
	    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
            contentVue.pageNo = contentVue.pageNo + 1;
            contentVue.init();
            setInterval("api.refreshHeaderLoadDone()",'1000');
	    }
	});

	contentVue.init();
}


//回答問題頁面
function answerpage(){
	 var data = {
        url:{
            url:filepath.getPath(filepath.lifecircle.question.answerlist.frm),
            name:"answerlist_frm",
            title:"写问题"
        }
    }
    openWinFrame("answerlist_win", filepath.getPath(filepath.comm.headback.win),data);
}


var contentVue = new Vue({
	el: "#content",
	data:{
		list:[],
		srcTitle:"",
		pageNo:1,
		pageSize:10
	},
	methods:{
		//初始化查询
		init: function(index){
			var _self = this;
			var data = {
				pageNo: _self.pageNo, //第几页 
				pageSize:_self.pageSize, //分页条数
				srcTitle: api.pageParam.srcTitle
			};
			
			postAjax(ApiUrl.queryCoterieByCoterieNoPage,data, function (ret, err) {
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					  	for(ind in ret.data){
					  		if("0" == ret.data[ind].srcId){
					  			// ret.data[ind].coverPic = cacheimage.cache({
					  			// 	url:ret.data[ind].coverPic
					  			// });
					  		}
					  		_self.list.push(ret.data[ind]);
					  	}
					  	
					  	
					  }
					 
					}else{
						// openDialog('0',ret.retMsg);
					 return false;
					}
				} else {
					
	                return false;
				}
			});

		},
		experiecepage:function(bean){
			 var data = {
		        url:{
		            url: api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_frm.html",
		            name:"experieceinfo_frm",
		            title:"经验"
		        },
		        info:{
		        	srcNo:bean.srcNo
		        }
		       
		    }
		    openWinFrame("experieceinfo_win", api.wgtRootDir+"/html/lifecircle/experience/info/experieceinfo_win.html",data);
		},
		//问题详情页面
		questionpage:function(bean){
			var data = {
		        url:{
		            url: api.wgtRootDir+"/html/lifecircle/question/info/questioninfo_frm.html",
		            name:"questioninfo_frm",
		            title:"问题详情"
		        },
		        info:{
		        	srcNo:bean.srcNo
		        }
		    }
		    openWinFrame("questioninfo_win", api.wgtRootDir+"/html/lifecircle/question/info/questioninfo_win.html",data);
		}

	}
})
	


