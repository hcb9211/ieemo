apiready = function(){
	var serviceTypeNo = api.pageParam.serviceTypeNo;
	vm.init(serviceTypeNo);
};

$(window).scroll(function () {
    if($(window).scrollTop()!= 0 && $(window).scrollTop() >= $(document).height() - $(window).height()){
    	vm.next();
    }
});
//加载精选服务
var vm = new Vue({
	el: "#listDiv",
	data:{
		list:[],
		pageNo:1,
		pageSize:999
	},
	methods:{
		init:function(serviceTypeNo){
			var _self = this;
			var reqdata = {
				pageNo:_self.pageNo,
				pageSize:_self.pageSize,
				serviceTypeNo:serviceTypeNo
			};
			postAjax(ApiUrl.queryAllCommunityServiceByType,reqdata,function(ret,err){
				if (ret) {
					if("0" == ret.retCode){
						for (var i=0;i<ret.data.length;i++) {
							_self.list.push(ret.data[i]);
						}
					}else{
						toast(ret.retMsg);
					}
				} else{
					toast(err.msg);
				}
			})
		},
		next:function(){
			this.pageNo = this.pageNo + 1;
			this.init();
		},
		call:function(bean){
			//展示内容
			$(".sjindex_lxtc_con").eq(1).html(bean.realName + " " + bean.telNo);
			$(".sjindex_lxtc_btn_yes").attr("data-no", bean.telNo);
			$(".fixed_tc").show();
      	},
      	detail:function(seviceNo){
      		var data = {
	                url:{
	                    url: api.wgtRootDir+"/html/lifeservice/lifeservice_info.html",//frm地址
	                    name:"lifeservice_info",//frm的名字
	                    title:"服务详情"//窗口的titlem 
	                },
	                info:{seviceNo:seviceNo}
	            };
	            openWinFrame("lifeservice_info_frm", api.wgtRootDir+"/html/comm/head_back.html",data);
      	}
	}
});
//打电话
function callPhone(){
	var number = $(".sjindex_lxtc_btn_yes").attr("data-no");
	api.call({
	    type: 'tel',
	    number: number
	});
}