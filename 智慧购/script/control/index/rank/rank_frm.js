apiready = function(){
    var vm = new Vue({
    	el: "#info",
    	data:{
    		list :[]
    	},
    	methods:{
    		init:function(){
    			var _self = this;
    			var data = {
    				pageNo:1,
    				pageSize:3
    			}
    			postAjax(ApiUrl.queryCoterieRankPage,data, function (ret, err) {
				
					if (ret) {	
						if(ret.retCode=='0'){
							if(ret.data){
								_self.list = ret.data;
							}
						}else{
						 return false;
						}
					} else {
		                return false;
					}
				},{progress:"1"}); 
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
			},

			circlemorepage:function(){
				var data = {
			        url:{
			            url: api.wgtRootDir+"/html/index/rank/rankmore_frm.html",
			            name:"rankmore_frm",
			            title:"话题排行榜"
			        }
			    }
	   		 openWinFrame("rankmore_win", api.wgtRootDir+"/html/comm/head_back.html",data);
			}
	    }
	    
    });
    vm.init();
}
    