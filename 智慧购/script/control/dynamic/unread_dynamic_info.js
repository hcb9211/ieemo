apiready = function(){
   vm.init();
   
   api.setRefreshHeaderInfo({
	    visible : true,
	    loadingImg : 'widget://image/refresh.png',
	    bgColor : '#ccc',
	    textColor : '#fff',
	    textDown : '下拉刷新...',
	    textUp : '松开刷新...',
	    showTime : true
	}, function(ret, err) {
		if(ret){
		   vm.list = [];
           vm.init();
           setTimeout("api.refreshHeaderLoadDone()",'1000');
		}

	});
}

var vm = new Vue({
	el: ".main_dynamic",
	data:{
		list:[]
	},
	methods:{
		init: function(){
			var _self = this;
			
			var data = {
				userNo :user.getuserNo()
			};
			
			postAjax(ApiUrl.queryNoneReadList,data, function (ret, err) {
				//alert(JSON.stringify(ret));
				if (ret) {
					if(ret.retCode=='0'){
					  if(ret.data){
					  	var dynamicList = ret.data;
					  	for (var i=0;i<dynamicList.length;i++) {
					  		_self.list.push(changeBean(dynamicList[i]));
					  	}
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
		info:function(dynamicNo){
			var data = {
                url:{
                    url: api.wgtRootDir+"/html/dynamic/dynamic_info.html",//frm地址
                    name:"dynamic_info",//frm的名字
                    title:"动态详情"//窗口的title
                },
                info:{dynamicNo:dynamicNo}
            }

            openWinFrame("dynamic_info_frm", api.wgtRootDir+"/html/comm/head_back.html",data);
		}
	}
})
	
//处理图片地址
function changeBean(bean){
	bean.createDate = getDateDiff(getDateTimeStamp(bean.createDate));
	return bean;
}