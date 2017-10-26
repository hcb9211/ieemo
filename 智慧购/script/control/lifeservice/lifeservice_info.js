apiready = function(){
	var serviceNo = api.pageParam.seviceNo;
	vm.init(serviceNo);
}

//加载服务类型
var vm = new Vue({
	el: "#infoBody",
	data:{
		bean:{}
	},
	methods:{
		init:function(serviceNo){
			var _self = this;
			var reqdata = {
				serviceNo:serviceNo
			};
			postAjax(ApiUrl.queryCommunityService,reqdata,function(ret,err){
				if (ret) {
					_self.bean = ret.data;
				} else{}
			})
		},
		showCall:function(){
			//打电话提示框展示
			$(".fixed_tc").show();
		},
		hideCall:function(){
			$(".fixed_tc").hide();
		},
		call:function(telNo){
			api.call({
			    type: 'tel',
			    number: telNo
			});
		}
	}
});