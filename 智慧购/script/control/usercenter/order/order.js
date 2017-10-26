//(Zhiping)
var order = new Vue({
	el:"#order",
	data:{
		pagNo:1,
		userNo:user.getuserNo(),
		orderList:[],
	},
	methods:{
		orderInit:function(){
			var self = this;
			var Updata = {
				pageNo:self.pagNo,
				pageSize:4,
				status:"",
				userNo:self.userNo
			};
			postAjax(ApiUrl.queryUserOrder,Updata,function(ret,err){
				if (ret) {
					for (var i=0;i<ret.data.length;i++) {
						self.orderList.push(ret.data[i]);
					}
				}
			},{progress:"1",islogin:"1"})
		},
		orderDet:function(OrderNo){
			var data = {
		        url:{
		            url: api.wgtRootDir+"/html/usercenter/order/orderDetail.html",
		            name:"orderDetail_frm",
		            title:"订单详情"
		        },
		        islogin : '1',
		        info:{orderNo:OrderNo},
		    }
		    openWinFrame("orderDetail_win", api.wgtRootDir+"/html/comm/head_back.html",data);
		},
	}
});
apiready = function(){
	order.orderInit();
	//  上拉加载
    $(window).scroll(function () {
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            order.pagNo +=1;
            order.orderInit();
        }
    });
	//   下拉刷新
    api.setRefreshHeaderInfo({
        visible:true,
        bgColor:'#ccc',
        textColor:'#fff',
        textDown:'下拉刷新...',
        textup:'松开刷新...',
        showTime:true
    },function (ret,err) {
        order.orderList=[];
        order.pagNo = 1;
        order.orderInit();
        setTimeout(function(){api.refreshHeaderLoadDone();},500)
    });

};