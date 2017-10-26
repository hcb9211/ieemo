var type = "";
apiready = function(){
	//头部
	var height = 0;
    var header =$("div[name=header]")[0];
    if (api.systemType == "ios") {
   		height = 20;
   		
   	} else {
   		 height = 25;
   	}
	$(".top_nof").css({
		height: $(".top_nof").height() + height
	});
    $api.fixStatusBar(header);
	//头部[END]
	
	type = api.pageParam.type;
	
	api.addEventListener({
	    name: 'selectFriendEvent'
	}, function(ret, err) {
	    if(null != ret.value && "" != ret.value){
			var friendJson = ret.value.friendJson;
//			if(null != friendJson && "" != friendJson){
//			
//				var htmlStr = "";
//				var friendList = (new Function("","return" + friendJson))();
//				//展示邀请数据
//				for(var i = 0; i < friendList.length; i++)
//				{
//					var fr = friendList[i];
//					htmlStr += '<li id="li'+fr.key+'" data-name="'+fr.name+'"><img src="'+fr.url+'"></li>';
//				}
//				
//				$(".addfriend_sousuo_xzimg").html(htmlStr);
//			}
		}
	});
	
	//确定
	$("#ok").click(function(){		
		api.sendEvent({
		    name: 'selectFriendEvent',
		    extra: {
		        friendJson: JSON.stringify(vm.selectlist),
		        type:type
		    }
		});
		
		closeWin();
	});
	
	vm.init();
	
	//搜索
	$(".addfriend_sousuo_input").click(function(){
		var UISearchBar = api.require('UISearchBar');
	    UISearchBar.open({
	        placeholder: '搜索',
	        historyCount: 10,
	        showRecordBtn: false,
	        dataBase:"select_friend_index",
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
	            vm.search(condition);
	        }
	       });
	});
};

var vm = new Vue({
	el: ".main_addfriend_txl",
	data:{
		list:[],
		selectlist:[]
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
					  	_self.list = ret.data;
					}
				}else{
				 return false;
				}
			});
			       
		},
		select:function(bean, e){
			var _self = this;
			
			var $this = $(e.currentTarget);
			var ischeck = $this.is(":checked");
			if(ischeck)
			{
				_self.selectlist.push(bean);
				//选中，新增
				var str = '<li id="li'+bean.userNo+'" data-name="'+bean.name+'"><img src="'+bean.headPortrait+'"></li>';
				$(".addfriend_sousuo_xzimg").append(str);
			}else
			{
				var list = _self.selectlist;
				for(var i in list){
					if(bean.userNo == list[i].userNo){
						_self.selectlist.splice(i,1);
					}
				}
				//移除
				$("#li"+bean.userNo).remove();
			}
			
			_self.selectlist.length>0?$("#tempUl").show():$("#tempUl").hide();
		},
		search:function(condition){
			var _self = this;
				
        	//查询我的数据
        	var data = {
				userNo :user.getuserNo()
			};
			
			postAjax(ApiUrl.queryFriends,data, function (ret, err) {
				if (ret) {
					if(ret.retCode=='0'){
						//清空数据
						_self.list = [];
					  	var list = ret.data;
					  	for(var i in list){
					  		if(-1 != list[i].name.indexOf(condition))
					  		{
					  			_self.list.push(list[i]);
					  		}
					  	}
					}
				}else{
				 	return false;
				}
			});
		}
	}
})