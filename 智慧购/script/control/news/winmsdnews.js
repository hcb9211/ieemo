var winmsdnews = new Vue({
	el:"#winmsdnews",
	data:{
		winmsdnews:[]
	},
	methods:{
		//获取数据函数
		init:function(upid){
			var upData = {
				id : upid
			};
			postAjax(ApiUrl.querySysMessageById,upData,function(ret,err){
				if(ret){
					winmsdnews.winmsdnews = ret.data;
				}else{}
			},{progress:"1"});
		}
	}
})
apiready = function(){
	var id = api.pageParam.winid;
	winmsdnews.init(id);
}
