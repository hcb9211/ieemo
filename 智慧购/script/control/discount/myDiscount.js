var vm = new Vue({
	el:"#myDiscount",
	data:{
		list:[],
		pageNo:1,
	},
	methods:{
		init:function(){
			var self = this;
			var updata = {pageNo:self.pageNo,pageSize:10,userNo:user.getuserNo()}
			postAjax(ApiUrl.queryMyhopCouponPage,updata,function(ret,err){
				if (ret) {
                    if (ret.data) {
						for (var i=0;i<ret.data.length;i++) {
							self.list.push(ret.data[i]);
						}
					}
				}
			})
		},
		coupondetail : function (bean) {
            var data = {
                url:{
                    url: api.wgtRootDir+"/html/discount/coupondetail.html",
                    name:"coupondetail",
                    title:"优惠券详情"
                },
                //判断是否登录·需要就写1
                islogin : '1',
                info:{
					prices : bean.value,
					beginDate : bean.beginDate,
					endDate : bean.endDate,
					beginPrice : bean.beginPrice
				},
            }
            openWinFrame("ord", api.wgtRootDir+"/html/comm/head_back.html",data);
        }
	}
})
apiready=function(){
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
		vm.pageNo = 1;
		vm.list = [];
        vm.init();
        setTimeout("api.refreshHeaderLoadDone()",'1000');
	});
	//  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
        	vm.pageNo +=1;
        	vm.init();
        }
    });
}
