var formvalidate = {
         rules: {
             quesTitle: {
                required: true,
                maxlength: 50
            },
            coterieNo: {
                required: true
                
            },
            quesContent:{
            	required: true,
            	 maxlength: 200
            }
        },
        messages: {
            quesTitle: {
                required: "请输入标题",
                maxlength: "标题名称不能超过50位"
            },
            coterieNo: {
                required: "请选择分类",
                
            },
            quesContent:{
            	required: "请输入详细描述",
            	maxlength:"详细描述不能超过200个字"
            }
        }
   };
apiready = function(){
    var vm = new Vue({
    	el: "#info",
    	data:{
    		bean:{
    			quesTitle:"",
    			delFlag:"1"
    		},
    		typelist:[],
    		default:{

    		}
    	},
    	methods:{
    		save:function(){
    			var _self = this;
    			if(validate.validateJSON(formvalidate,_self.bean) == false){
					return false;
				}
				if(!user.isaddcommunity()){
		    		dialog.alert({text:"您还没有加入社区，是否加入社区？"},function(){
		        		var data = {
				        url:{
				            url: api.wgtRootDir+"/html/community/community.html",
				            name:"community",
				            title:"社区定位"
				        }
				    }
				 openWinFrame("rank_win", api.wgtRootDir+"/html/comm/head_back.html",data);
		        	});
		    	}
		    	if(!user.isaddcommunity()){
		    		return false;
		    	}
	    	_self.bean.communityNo = user.getcommunityNo();
    			_self.bean.userNo = user.getuserNo();
    			var data = {
    				coterieQuestionDto:_self.bean
    			}
    			
    			postAjax(ApiUrl.saveCoterieQuestion,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
							api.alert({
							    msg: '发布问题成功',
							}, function(ret, err) {
							    closeWin();
							});
						}else{
							alert("发布问题失败")
						 return false;
						}
					} else {
						alert("发布问题失败")
		                return false;
					}
				});
    		},
    		type:function(){
    			var _self = this;

				var data = {
					userNo:user.getuserNo()
				}
				if(_self.typelist.length != 0){
					_self.selected(_self.typelist);
					return false;
				}
				postAjax(ApiUrl.queryCoterieType,data, function (ret, err) {
					if (ret) {
						if(ret.retCode=='0'){
						  if(ret.data){  
						   	for( ind in ret.data){
						  		ret.data[ind].name = ret.data[ind].coterieName;
						  	}
						  	_self.typelist = ret.data;
				   			_self.selected(_self.typelist);

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
    		selected:function(data){
    			var _self = this;
    			select(data,function(data){
	   				// alert(JSON.stringify(data));
	   				$(".shq_tw_list li").html(data[0].coterieName);
	   				_self.bean.coterieNo = data[0].coterieNo;
	   			})
    		}
    	}
    
    })



	//设置保存按钮的监听事件
	api.addEventListener({
	    name: 'addquestion'
	}, function(ret, err) {
	   if (ret) {
	       vm.save();
	    } else {
	        // alert(JSON.stringify(err));
	    }
	});

}

//设置监听事件
    