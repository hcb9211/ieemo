//var userData = {
//	
//};
//上传的数据
var uploadData = {
	storeId : "",
	dataType : 0
};
var broadcast = new Vue({
	el:"#broadcastcontent",
	data:{
		broadcastData:[]
	},
	methods:{
		//数据调用函数
		init:function(){
			var _self = this;
			postAjax(ApiUrl.queryShopNotifyMsgDtoByType,uploadData,function(ret,err){
				if (ret) {
					for (var i=0;i<ret.data.length;i++) {
						_self.broadcastData.push(ret.data[i]);
					}
				} else{}
			},{progress:"1"})
		},
		//页面跳转函数
		registerView:function(id){
			var data = {
				info:{parid:id},
			    url:{
			    	url: api.wgtRootDir+"/html/news/particularnews.html",
			    	name:"particularnews",
			    	title:"亿猫大喇叭消息详情"
			    }
			}
			openWinFrame(null, api.wgtRootDir+"/html/comm/head_back.html",data);
		}
	}
});
apiready =function (){
	//获取数据函数调用
	broadcast.init();
	// 多行文本溢出
	$(".ymdlb_list_title").each(function(){
//		console.log("2389429u");
	    var box_height = $(this).height();
	    var $p = $("p", $(this)).eq(0);
	    while ($p.outerHeight() > box_height) {
	        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
	    };
	});
	//
};
