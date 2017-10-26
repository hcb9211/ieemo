//用户ID
//var userNo = localStorage.getItem("userNo");
//上传的数据
var uploadData = {
	msgType : "1" ,
	pageNo : 1 ,
	pageSize: 8 , 
}
var winmsd = new Vue({
	el:"#winmsd",
	data:{
		winmsdData:[]
	},
	methods:{
		//获取数据函数
		init:function(){
			postAjax(ApiUrl.querySysMessage,uploadData,function(ret,err){
				if (ret) {
					for (var i=0;i<ret.data.length;i++) {
						winmsd.winmsdData.push(ret.data[i]);
					}
				} else{}
			},{progress:"1"})
		},
		//系统消息详情页面跳转
		registerView:function(id){
			var data = {
				info:{winid:id},
			    url:{
			    	url: api.wgtRootDir+"/html/news/winmsdnews.html",
			    	name:"winmsdnews",
			    	title:"系统消息详情"
			    }
			}
			openWinFrame("winmsdnews_frm", api.wgtRootDir+"/html/comm/head_back.html",data);
		}
	}
});
apiready = function(){
	winmsd.init();
}
