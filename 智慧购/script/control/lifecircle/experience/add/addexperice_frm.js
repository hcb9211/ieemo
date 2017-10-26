var formvalidate = {
         rules: {
             exCover: {
                required: true
            },
            exTitle: {
                required: true,
                maxlength: 50
            },
            coterieNo:{
            	required: true
            }
        },
        messages: {
            exCover: {
                required: "请上传封面图片"
            },
            exTitle: {
                required: "请输入标题",
                maxlength: "标题名称不能超过50位"
            },
            coterieNo:{
            	required: "请选择分类"
            }
        }
   };

apiready = function(){
	var vm = new Vue({
   	el: "#experiece",
   	data:{
   		bean:{
   			exCover:"",//封面图片
   			coterieNo:"",//类别id
   			exTitle:"",//标题
   			coterieExpConList:[],
   			imgbase64:api.wgtRootDir+"/image/friend_index_bj.png",
   			delFlag:"1", //0,保存;1,发布;
   			userNo : user.getuserNo()

   		},
   		options:{
   			imgbase64:api.wgtRootDir+"/image/friend_index_bj.png"
   		},
   		typelist:[]
   	},
   	methods:{
   		//封面
   		faceimage:function(){
   			var _self = this;
   			var data = {
	            type : 10,
	            userNo : user.getuserNo()
	        };
			carmersystem({
				data:data,
				url:_FileUploadServerUrl,
				callback:function(data){
					// alert(data.relativeUrl)
					_self.options.imgbase64 = data.locationsrc;//图片base64
					_self.bean.exCover = data.relativeUrl;//不带服务器地址的路径,用于接口字段保存
				}
			})
   		},
   		//选择类型
   		typeclick:function(){
			var _self = this;
			var data = {
				userNo: user.getuserNo()
			};
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
			},{progress:"1"});
			
		},
		selected:function(data){
			var _self = this;
			select(data,function(data){
   				// alert(JSON.stringify(data));
   				$(".shq_xjy_xzfl li").html(data[0].coterieName);
   				_self.bean.coterieNo = data[0].coterieNo;
   			})
		},
    	save:function(){
    		var _self = this;
    		if(validate.validateJSON(formvalidate,_self.bean) == false){
				return false;
			}

			var bean = $.extend({}, _self.bean);
			delete bean.imgbase64;
	    	for(ind in bean.coterieExpConList){
	    		delete bean.coterieExpConList[ind].imgbase64;
	    	}
	    	//判断是否加入社区
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
	    	bean.communityNo = user.getcommunityNo();

			var data  = {
				coterieExpDto:bean
			}

			postAjax(ApiUrl.saveCoterieExp,data, function (ret, err) {
				if (ret) {
					if(ret.retCode=='0'){
						api.alert({
						    title: '消息',
						    msg: '保存成功',
						}, function(ret, err) {
						    closeWin();
						});
					}else{
						alert(ret.retMsg)
					 return false;
					}
				} else {
					alert("发布经验失败")
	                return false;
				}
			},{progress:"1",islogin:"1"});
    	},
    	//添加内容
    	addcontent:function(){
    		var _self = this;
    		api.confirm({
    		    buttons: ['文字','图片','商品','取消']
    		}, function(ret, err) {
    		     if(4 == ret.buttonIndex){  //  用户取消
		            return;
		         }
		         if(2 == ret.buttonIndex){
		         	_self.addimg();
		         }
    		});
    	},
    	//添加图片
    	addimg:function(){
    		var _self = this;
   			var data = {
	            type : 10,
	            userNo : user.getuserNo()
	        };
			carmersystem({
				data:data,
				url:_FileUploadServerUrl,
				callback:function(data){
					// alert(data.relativeUrl)
					var bean = {};
					bean.edit = "0";
					bean.imgbase64 = data.locationsrc;//图片base64
					bean.content = data.relativeUrl;
					bean.contentType = "1";//0,文字;1,图片;2,商品;3,视频
					_self.bean.coterieExpConList.push(bean);
					//_self.default.imgbase64 = data.locationsrc;//图片base64
					//_self.bean.exCover = data.relativeUrl;//不带服务器地址的路径,用于接口字段保存
				}
			})
    	},
    	addtext:function(){
    		var _self = this;

    		var addtextpagefrm = filepath.getPath(filepath.lifecircle.experience.addtext.frm);
    		var addtextpagewin = filepath.getPath(filepath.lifecircle.experience.addtext.win);

    		var data = {
				url:{
		            url: addtextpagefrm,
		            name:"addtextpagefrm",
		            title:"编辑内容"
		        },
		        info:{
		        	
		        }
		    }
		    openWinFrame("addtextpagewin", addtextpagewin,data);
    	// 	dialog.input({
    	// 		title:"内容",
    	// 		callback:function(ret){
    	// 			var bean = {};
    	// 			bean.edit = "0";//编辑状态
					// bean.content = ret;
					// bean.contentType = "0";//0,文字;1,图片;2,商品;3,视频
					// _self.bean.coterieExpConList.push(bean);
    	// 		}
    	// 	})
    	},
    	updatetextpage:function(bean,index){
    		var _self = this;

    		var addtextpagefrm = filepath.getPath(filepath.lifecircle.experience.addtext.frm);
    		var addtextpagewin = filepath.getPath(filepath.lifecircle.experience.addtext.win);

    		var data = {
    			url:{
		            url: addtextpagefrm,
		            name:"addtextpagefrm",
		            title:"编辑内容"
		        },
		        info:{
		        	index : index,
					content:bean.content	
		        }
				
		    }
		    openWinFrame("addtextpagewin", addtextpagewin,data);
		   
    	},
    	//添加文字内容
    	addtextval:function(content){
    		var _self = this;
    		var bean = {};
			bean.edit = "0";//编辑状态
			bean.content = content;
			bean.contentType = "0";//0,文字;1,图片;2,商品;3,视频
			_self.bean.coterieExpConList.push(bean);
    	},
    	updatetextval:function(content,index){
    		var _self = this;
    		_self.bean.coterieExpConList[index].content = content;
    	},
    	imgeditpage:function(bean){
    		bean.edit = '1';//设变编辑状态
    	},
    	closeeditpage:function(bean){
    		bean.edit = '0';//设变编辑状态
    	},
    	//删除图片
    	deleteimage:function(index,e){
    		e.stopPropagation()
    		var _self = this;
    		_self.bean.coterieExpConList.splice(index,1)
    	},
    	//重新选择图片
    	chooseimage:function(bean,index,e){
    		e.stopPropagation()
    		var _self = this;
   			var data = {
	            type : 10,
	            userNo : user.getuserNo()
	        };
			carmersystem({
				data:data,
				url:_FileUploadServerUrl,
				callback:function(data){
					// alert(data.relativeUrl)
					bean.edit = "0";
					bean.imgbase64 = data.locationsrc;//图片base64
					bean.content = data.relativeUrl;
					bean.contentType = "1";//0,文字;1,图片;2,商品;3,视频
					// _self.bean.coterieExpConList[index] = bean;
                    // _self.$forceUpdate();
					//_self.default.imgbase64 = data.locationsrc;//图片base64
					//_self.bean.exCover = data.relativeUrl;//不带服务器地址的路径,用于接口字段保存
				}
			})

    	}

   	}
   
   })
	


	api.addEventListener({
	    name: 'addsaveexperice'
	}, function(ret, err) {
	    if (ret) {
	    	
	    	vm.save();
	    } 
	});

	api.addEventListener({
	    name: 'addexpericetext'
	}, function(ret, err) {
	    if (ret) {
	        var content = ret.value.content;
	        var index = ret.value.index;
	        if(index != undefined){
	        	vm.updatetextval(content,index);
	        }else{
	        	vm.addtextval(content);
	        }
	    } else {
	        // alert(JSON.stringify(err));
	    }
	});
}



