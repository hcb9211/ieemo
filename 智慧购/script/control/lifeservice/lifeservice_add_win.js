apiready = function(){
	$(".register_list").children("li").find("input").focus(function(){
		$(this).parent("li").addClass("register_list_li_focus");
	})
	$(".register_list").children("li").find("input").blur(function(){
		$(this).parent("li").removeClass("register_list_li_focus");
	})
};

var vm = new Vue({
	el: "#info",
	data:{
		imglist:[],
		imgbase64:[],
		bean:{
			serviceTypeNo:"",
			serviceTypeName:"",
			realName:"",
			telNo:"",
			title:"",
			content:"",
			remarks:"",
			userNo:user.getuserNo(),
			highQuality:"0",
			imgUrl:""
		},
		typelist:[]
	},
	methods:{
		caramer:function(){
			var _self = this;
			
			var userNo =user.getuserNo();
			
   			var data = {
	            type : 10,
	            userNo : userNo
	        };
		
			carmersystem({
				data:data,
				url:_FileUploadServerUrl,
				callback:function(data){

					// showPic(data.locationsrc);
					_self.imgbase64.push(data.locationsrc);//图片base64
					// _self.bean.imgsrc = data.relativeUrl;//不带服务器地址的路径,用于接口字段保存
					_self.imglist.push(data.relativeUrl);
				}
			})

		},
		deleteimg:function(index){
			this.bean.imglist.splice(index,1);
		},
		save:function(){
			this.bean.imgUrl = this.imglist.toString();
			
			var isMobile=/^(?:13\d|14\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/;
			if("" == this.bean.serviceTypeName || null == this.bean.serviceTypeName){
				toast("请选择分类");
				return false;
			}else if("" == this.bean.realName || null == this.bean.realName){
				toast("请输入您的姓名");
				return false;
			}else if("" == this.bean.telNo || null == this.bean.telNo){
				toast("请输入联系方式");
				return false;
			}else if(!isMobile.test(this.bean.telNo)){
				toast("请输入正确的联系方式");
				return false;
			}else if("" == this.bean.title || null == this.bean.title){
				toast("请输入发布标题");
				return false;
			}else if("" == this.bean.imgUrl || null == this.bean.imgUrl){
				toast("请上传发布照片");
				return false;
			}else if("" == this.bean.content || null == this.bean.content){
				toast("请输入发布内容");
				return false;
			}else if(this.bean.content.length > 100){
				toast("发布内容最多100字");
				return false;
			}else {
				//发布
				api.showProgress({
					style: 'default',
					animationType: 'fade',
					title: '发布中',
					text: '请稍候',
					modal: true
				});
				//获取发布数据
				var data = {
					communityServiceInfo: JSON.stringify(this.bean)
				}
				
				postAjax(ApiUrl.publishCommunityService,data, function (ret, err) {
					api.hideProgress();	
					
					var dialog = new auiDialog({});
					if (ret) {
						if(ret.retCode=='0'){
						   api.alert({
						       title: '消息',
						       msg: '发布成功',
						   }, function(ret, err) {
						       api.closeWin();
						   });
						}else{
						 	alert(ret.retMsg);
						 return false;
						}
					} else {
						 alert(ret.retMsg);
		                return false;
					}
				});
			}
		},
		selectCate:function(){
			var _self = this;
			var reqdata = {
				pageNo:1,
				pageSize:999
			};
			postAjax(ApiUrl.queryAllCommunityServiceType,reqdata,function(ret,err){
				if (ret) {
					for(var ind in ret.data){
				  		ret.data[ind].name = ret.data[ind].serviceName;
				  	}
				  	_self.typelist = ret.data;
		   			_self.selected(_self.typelist);
				} else{}
			})
		},
		selected:function(data){
			var _self = this;
			select(data,function(data){
   				_self.bean.serviceTypeNo = data[0].serviceNo;
   				_self.bean.serviceTypeName = data[0].serviceName;
   			})
		}
	}

});