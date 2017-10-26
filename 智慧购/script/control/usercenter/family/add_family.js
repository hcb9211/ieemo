apiready = function(){
	vm.init();
	
	//搜索
	$(".addfriend_sousuo_input").click(function(){
		var UISearchBar = api.require('UISearchBar');
	    UISearchBar.open({
	        placeholder: '姓名/昵称',
	        historyCount: 10,
	        showRecordBtn: false,
	        dataBase:"family_search_index",
	        texts: {
	            cancelText: '取消',
	            clearText: '清除搜索记录'
	        },
	        styles: {
	            navBar: {
	                bgColor: '#d0302f',
	                borderColor: '#000'
	            },
	            searchBox: {
	                bgImg: '',
	                color: '#000',
	                height: 44
	            },
	            cancel: {
	                bg: 'rgba(0,0,0,0)',
	                color: '#fff',
	                size: 16
	            },
	            list: {
	                color: '#696969',
	                bgColor: '#FFFFFF',
	                borderColor: '#eee',
	                size: 16
	            },
	            clear: {
	                color: '#000000',
	                borderColor: '#ccc',
	                size: 16
	            }
	        }
	    }, function(ret, err) {
	        if (ret) {
	            var condition = ret.text;
	            vm.condition = condition;
	        }
	       });
	});
}

var vm = new Vue({
	el: "#body",
	data:{
		list:[],
		condition:"",
		bean:{}
	},
	methods:{
		init:function(){
			var _self = this;
        	//查询我的数据
        	var data = {
				userNo :user.getuserNo()
			};
			
			postAjax(ApiUrl.queryFriends,data, function (ret, err) {
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
			});
		},
		showAddFamily:function(friendUserNo){
			var _self = this;
			_self.bean.remarks = "";
			_self.bean.familyUserNo = friendUserNo;
			_self.$forceUpdate();

			$(".fixed_tc").show();
       },
		addFamily:function(){
			var _self = this;
			
			var data = _self.bean;
			data.userNo = user.getuserNo();
			
			if("" == data.remarks || null == data.remarks){
				toast("请填写家庭成员角色");
				return false;
			}else if(data.remarks.length > 10){
				toast("角色名称最多10字");
				return false;
			}else {
				api.showProgress({
					style: 'default',
					animationType: 'fade',
					title: "添加家庭成员中",
					text: '请稍候',
					modal: true
				});
			
				postAjax(ApiUrl.sendMessageForMemberOfTheFamily, data, function (ret, err) {
					api.hideProgress();	
					if (ret) {
						if(ret.retCode=='0'){
						  
						  //改变数据
						  for(var i = 0; i < _self.list.length; i++){
						  	var tempBean = _self.list[i];
						  	if(data.familyUserNo == tempBean.userNo){
						  	//按钮置灰
						  		tempBean.isFamily = "2";
						  	}
						  }
						  
						  //添加成功
						  toast("已发送添加请求");
						  _self.bean.remarks = "";
						  _self.$forceUpdate();
						  $(".fixed_tc").hide();
						}else{
							toast(ret.retMsg);
						 	return false;
						}
					} else {
						toast(err.msg);
		                return false;
					}
				});
			}
       },
       search:function(bean){
       	if( "" != this.condition){
	       	if( (bean.name && bean.name != '' && -1 != bean.name.indexOf(this.condition)) ||
	       		(bean.signature && bean.signature != '' && -1 != bean.signature.indexOf(this.condition))
	       	 ){
//	       	 alert(JSON.stringify(bean));
	       		return true;
	       	}else {
	       		return false;
	       	}
       	}else{
       		//bean.nickname = bean.nickname;
       		return true;
       	}
       }
	}
})