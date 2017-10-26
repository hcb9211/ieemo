//用户ID
//var userNo = localStorage.getItem("userNo");
var particularnews = new Vue({
	el:"#particularnews",
	data : {
		particularnewsData:[],
	},
	methods:{
		//获取数据函数
		init:function(upid){
			var uploadData = {
				id: upid,
			};
			postAjax(ApiUrl.queryShopNotifyMsgDtoByIdType,uploadData,function(ret,err){
				if (ret) {
					particularnews.particularnewsData = ret.data;
				} else{}
			},{progress:"1"})
		}
	}
})
apiready =function(){
	var id = api.pageParam.parid;
	particularnews.init(id);
}
