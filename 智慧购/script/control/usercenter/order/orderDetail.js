var orderDet = new Vue({
	el:"#orderDet",
	data:{
		orderDetList:{},
		evaluatejudge:1,
	},
	methods:{
		orderDetInit:function(DetNo){
			var Updata = {orderNo:DetNo};
			postAjax(ApiUrl.queryUserOrderDetail,Updata,function(ret,err){
				if (ret) {
					orderDet.orderDetList = ret.data;
					if(ret.data.status==0){
						Vue.nextTick(function () {
							JsBarcode("#barcode2", ret.data.orderNo, {
								width:1.5,//设置条之间的宽度
								height:70,//高度
								displayValue:true,
								fontSize:16,
							});
						})
					}
				}
			},{progress:'1',islogin:"1"})
		},
		orderEvaluate:function(){
			var data = {
		        url:{
		            url: api.wgtRootDir+"/html/usercenter/order/orderEvaluate.html",
		            name:"orderEvaluate_frm",
		            title:"订单评价"
		        },
		        islogin : '1',
		        info:{orderEva:api.pageParam.orderNo},
		    }
		    openWinFrame("orderEvaluate_win", api.wgtRootDir+"/html/comm/head_back.html",data);
		}
	}
});
apiready = function(){
	//获取订单号
	var orderDetNo = api.pageParam.orderNo;
	orderDet.orderDetInit(orderDetNo);	
	api.addEventListener({
		name : 'orderEvaluate'
	},function(ret,err){
		if(ret){
			if(ret.value.orderEvaluate == 1){
				orderDet.orderDetInit(orderDetNo);
			}
		}
	});
};